<template>
  <Transition name="splash-exit">
    <div v-if="visible" class="splash-screen">
      <div class="splash-content" :class="{ 'splash-animate': animate }">
        <!-- Logo mark -->
        <div class="splash-logo-mark">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="currentColor" />
            <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" 
              font-family="Inter, sans-serif" font-weight="800" font-size="22" 
              fill="var(--splash-bg)">i.</text>
          </svg>
        </div>

        <!-- Brand text -->
        <div class="splash-brand">
          <span class="splash-brand-bold">inove.</span><span class="splash-brand-light">studio</span>
        </div>

        <!-- Loading bar -->
        <div class="splash-loader">
          <div class="splash-loader-bar" :class="{ 'loader-fill': animate }"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['complete'])

const visible = ref(true)
const animate = ref(false)

onMounted(() => {
  // Start animation after a tiny delay so the initial render is painted
  requestAnimationFrame(() => {
    animate.value = true
  })

  // Dismiss splash after animation completes
  setTimeout(() => {
    visible.value = false
    emit('complete')
  }, 2200)
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  --splash-bg: var(--color-background);
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

/* Logo mark */
.splash-logo-mark {
  color: var(--color-text);
  opacity: 0;
  transform: scale(0.6) translateY(10px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.splash-animate .splash-logo-mark {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Brand text */
.splash-brand {
  font-size: 2rem;
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  letter-spacing: -0.01em;
}

.splash-animate .splash-brand {
  opacity: 1;
  transform: translateY(0);
}

.splash-brand-bold {
  font-weight: 700;
  color: var(--color-text);
}

.splash-brand-light {
  font-weight: 200;
  color: var(--color-text);
}

/* Loader bar */
.splash-loader {
  width: 120px;
  height: 3px;
  background: var(--color-outline-variant);
  border-radius: 3px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.4s ease 0.5s;
}

.splash-animate .splash-loader {
  opacity: 1;
}

.splash-loader-bar {
  width: 0%;
  height: 100%;
  background: var(--color-text);
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.7s;
}

.loader-fill {
  width: 100%;
}

/* Exit transition */
.splash-exit-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 1, 1);
}

.splash-exit-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
