<template>
  <nav class="bottom-nav">
    <a 
      v-for="item in navItems" 
      :key="item.name"
      :href="item.path" 
      class="nav-item"
      :class="{ 'nav-item-active': activeSection === item.id }"
      @click="onNavClick($event, item)"
    >
      <div class="nav-icon" v-html="item.icon"></div>
      <span class="nav-label">{{ item.name }}</span>
    </a>

    <!-- Theme toggle -->
    <button class="nav-item theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
      <div class="nav-icon theme-icon">
        <!-- Sun icon (shown in dark mode) -->
        <svg v-if="isDark" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <!-- Moon icon (shown in light mode) -->
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </div>
      <span class="nav-label">{{ isDark ? 'Light' : 'Dark' }}</span>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const activeSection = ref('home')

const navItems = [
  { 
    name: 'Home', 
    path: '#home', 
    id: 'home',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
  },
  { 
    name: 'Portfolio', 
    path: '#portfolio', 
    id: 'portfolio',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
  },
  { 
    name: 'About', 
    path: '#about', 
    id: 'about',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  },
  { 
    name: 'Contact', 
    path: '#contact', 
    id: 'contact',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  }
]

const onNavClick = (event, item) => {
  event.preventDefault()
  const el = document.getElementById(item.id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Track which section is currently in view via scroll position
const sectionIds = navItems.map(i => i.id)
let ticking = false

const updateActiveSection = () => {
  const scrollY = window.scrollY
  const viewportMid = scrollY + window.innerHeight * 0.4

  let currentId = sectionIds[0]

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el && el.offsetTop <= viewportMid) {
      currentId = id
    }
  }

  activeSection.value = currentId
}

const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(() => {
      updateActiveSection()
      ticking = false
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(updateActiveSection, 200)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 72px;
  background: rgba(var(--color-background-rgb), 0.82);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-top: 1px solid var(--color-outline-variant);
  padding: 0 0.5rem;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  color: var(--color-text-tertiary);
  padding: 8px 12px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  min-width: 52px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 28px;
  height: 3px;
  border-radius: 3px;
  background: var(--color-text);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-item:hover {
  color: var(--color-text-secondary);
}

.nav-item-active {
  color: var(--color-text);
}

.nav-item-active::before {
  transform: translateX(-50%) scaleX(1);
}

.nav-item-active .nav-icon {
  transform: translateY(-1px);
}

/* Theme toggle doesn't get the ::before indicator */
.theme-toggle::before {
  display: none;
}

.theme-toggle {
  color: var(--color-text-tertiary);
}

.theme-toggle:hover {
  color: var(--color-text);
}

.theme-icon {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.theme-toggle:active .theme-icon {
  transform: rotate(30deg) scale(0.9);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

/* Desktop: floating pill */
@media (min-width: 769px) {
  .bottom-nav {
    max-width: 480px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 16px;
    border-radius: 24px;
    border: 1px solid var(--color-outline-variant);
    box-shadow: var(--shadow-3);
    height: 64px;
  }

  .nav-item {
    padding: 8px 14px;
  }
}
</style>
