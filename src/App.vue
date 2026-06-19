<template>
  <div id="app" class="app">
    <!-- Splash Screen -->
    <SplashScreen v-if="showSplash" @complete="onSplashComplete" />

    <!-- Main app content -->
    <template v-if="appReady">
      <main class="main-content">
        <RouterView v-slot="{ Component }">
          <Transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
      <AppFooter />
      <AppNavbar />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import { useTheme } from '@/composables/useTheme'

// Initialize theme on app load
useTheme()

const showSplash = ref(true)
const appReady = ref(false)

// Show main content slightly before splash fully exits
// so the transition feels seamless
const onSplashComplete = () => {
  appReady.value = true
  // Let the splash exit animation finish
  setTimeout(() => {
    showSplash.value = false
  }, 500)
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.main-content {
  padding-top: 0;
  padding-bottom: 90px; /* Account for fixed bottom navbar */
  flex: 1;
}

/* Page route transitions */
.page-fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
