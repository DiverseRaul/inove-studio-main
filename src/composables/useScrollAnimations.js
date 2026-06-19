/**
 * useScrollAnimations - Continuous scroll-driven animations
 * 
 * Replaces AOS "reveal once" with smooth, reversible animations
 * driven by actual scroll position. Elements animate in as they
 * enter the viewport and reverse when scrolled back.
 */
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Clamp a value between min and max
 */
function clamp(val, min = 0, max = 1) {
  return Math.min(max, Math.max(min, val))
}

/**
 * Easing function — ease-out cubic for natural deceleration
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Main composable
 * 
 * Usage in template:
 *   <div v-scroll-animate="{ type: 'fade-up', delay: 100 }">
 * 
 * Supported types:
 *   'fade-up'       — translateY + opacity + scale
 *   'fade-right'    — translateX + opacity
 *   'fade-left'     — translateX + opacity (from left)
 *   'scale-in'      — scale from small + opacity
 *   'blur-in'       — blur + opacity + slight scale
 *   'color-reveal'  — opacity + color shift from muted to bright
 *   'stagger'       — like fade-up with stagger delay based on index
 */
export function useScrollAnimations() {
  const elements = ref([])
  let ticking = false
  let observer = null

  /**
   * Parse the animation config from the directive binding
   */
  function parseConfig(binding) {
    const defaults = {
      type: 'fade-up',
      delay: 0,
      duration: 0.8,         // CSS transition duration (seconds)
      threshold: 0.15,       // how much of element must be visible to start
      distance: 60,          // translateY/X distance in px
      scaleFrom: 0.92,       // starting scale
      blurAmount: 12,        // blur px for blur-in
      staggerIndex: 0,       // for stagger type
      staggerDelay: 80,      // ms between each staggered item
      colorFrom: 'rgba(161, 161, 170, 0.4)',  // muted color
      colorTo: 'var(--color-text)',             // final color
    }

    if (typeof binding.value === 'string') {
      return { ...defaults, type: binding.value }
    }
    return { ...defaults, ...(binding.value || {}) }
  }

  /**
   * Calculate animation progress based on element position in viewport
   * Returns 0 (fully off-screen below) → 1 (fully in view / animated)
   */
  function getScrollProgress(el, config) {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Element's vertical center position relative to viewport
    // We want progress to go from 0 → 1 as element scrolls from
    // bottom of viewport to ~40% from top
    const triggerStart = windowHeight * 1.0   // bottom of viewport
    const triggerEnd = windowHeight * 0.25     // 25% from top

    const elementCenter = rect.top + rect.height * 0.5
    const rawProgress = (triggerStart - elementCenter) / (triggerStart - triggerEnd)

    return clamp(rawProgress)
  }

  /**
   * Apply the visual transforms based on scroll progress
   */
  function applyAnimation(el, progress, config) {
    const easedProgress = easeOutCubic(progress)
    const t = easedProgress // shorthand

    // Compute delay offset — if delay is set, shift progress
    // so animation starts slightly later
    let adjustedT = t
    if (config.delay > 0) {
      const delayFactor = config.delay / 1000 // convert ms to 0-1 range factor
      adjustedT = clamp((t - delayFactor * 0.3) / (1 - delayFactor * 0.3))
    }

    const p = adjustedT
    let transform = ''
    let opacity = 1
    let filter = 'none'
    let color = ''

    switch (config.type) {
      case 'fade-up': {
        const y = config.distance * (1 - p)
        const scale = config.scaleFrom + (1 - config.scaleFrom) * p
        transform = `translateY(${y}px) scale(${scale})`
        opacity = p
        break
      }

      case 'fade-right': {
        const x = config.distance * (1 - p)
        const scale = 0.97 + 0.03 * p
        transform = `translateX(${x}px) scale(${scale})`
        opacity = p
        break
      }

      case 'fade-left': {
        const x = -config.distance * (1 - p)
        const scale = 0.97 + 0.03 * p
        transform = `translateX(${x}px) scale(${scale})`
        opacity = p
        break
      }

      case 'scale-in': {
        const scale = config.scaleFrom + (1 - config.scaleFrom) * p
        transform = `scale(${scale})`
        opacity = p
        break
      }

      case 'blur-in': {
        const blur = config.blurAmount * (1 - p)
        const scale = 0.96 + 0.04 * p
        transform = `scale(${scale})`
        opacity = p
        filter = `blur(${blur}px)`
        break
      }

      case 'color-reveal': {
        opacity = 0.3 + 0.7 * p
        const y = 30 * (1 - p)
        transform = `translateY(${y}px)`
        // We can't interpolate CSS custom properties, so we interpolate opacity on a pseudo
        // Instead, set a data attribute for CSS to pick up
        el.style.setProperty('--reveal-progress', p)
        break
      }

      case 'stagger': {
        // Like fade-up but with stagger delay based on index
        const staggerOffset = (config.staggerIndex * config.staggerDelay) / 1000
        const staggerP = clamp((p - staggerOffset * 0.5) / (1 - staggerOffset * 0.5))
        const ep = easeOutCubic(staggerP)
        const y = config.distance * (1 - ep)
        const scale = config.scaleFrom + (1 - config.scaleFrom) * ep
        transform = `translateY(${y}px) scale(${scale})`
        opacity = ep
        break
      }

      default: {
        // Fallback to fade-up
        const y = config.distance * (1 - p)
        transform = `translateY(${y}px)`
        opacity = p
        break
      }
    }

    // Apply styles directly — no CSS transitions needed since we update every frame
    el.style.transform = transform
    el.style.opacity = opacity
    el.style.filter = filter
    if (color) el.style.color = color

    // Mark as visible for any CSS hooks
    if (p > 0.01) {
      el.classList.add('scroll-visible')
    } else {
      el.classList.remove('scroll-visible')
    }
  }

  /**
   * Update all tracked elements on scroll
   */
  function onScroll() {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        elements.value.forEach(({ el, config }) => {
          const progress = getScrollProgress(el, config)
          applyAnimation(el, progress, config)
        })
        ticking = false
      })
    }
  }

  /**
   * Register an element for scroll animation
   */
  function register(el, config) {
    // Set initial state (hidden)
    el.style.willChange = 'transform, opacity, filter'
    el.style.transform = 'translateY(60px)'
    el.style.opacity = '0'

    elements.value.push({ el, config })

    // Immediately compute position
    const progress = getScrollProgress(el, config)
    applyAnimation(el, progress, config)
  }

  /**
   * Unregister an element
   */
  function unregister(el) {
    elements.value = elements.value.filter(item => item.el !== el)
  }

  /**
   * Setup the scroll listener
   */
  function init() {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    // Initial pass
    onScroll()
  }

  /**
   * Cleanup
   */
  function destroy() {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    elements.value = []
  }

  return {
    register,
    unregister,
    init,
    destroy,
    parseConfig,
  }
}

/**
 * Vue directive plugin — use as v-scroll-animate
 */
let sharedInstance = null

export function createScrollAnimateDirective() {
  return {
    install(app) {
      const instance = useScrollAnimations()
      sharedInstance = instance

      app.directive('scroll-animate', {
        mounted(el, binding) {
          const config = instance.parseConfig(binding)
          instance.register(el, config)
        },
        updated(el, binding) {
          // Re-register if binding value changes
          instance.unregister(el)
          const config = instance.parseConfig(binding)
          instance.register(el, config)
        },
        unmounted(el) {
          instance.unregister(el)
        },
      })

      // Init on next tick to ensure DOM is ready
      setTimeout(() => instance.init(), 50)

      // Store cleanup for app unmount
      app.config.globalProperties.$scrollAnimateDestroy = () => instance.destroy()
    },
  }
}
