/**
 * useTheme - Dark/Light theme management with localStorage persistence
 */
import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'inove-theme'

// Shared reactive state (singleton across components)
const theme = ref('dark')
const isInitialized = ref(false)

function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value)
}

export function useTheme() {
  // Initialize once
  if (!isInitialized.value) {
    // Check localStorage, then system preference
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      theme.value = stored
    } else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      theme.value = 'light'
    }
    applyTheme(theme.value)
    isInitialized.value = true
  }

  // Watch for changes
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const isDark = ref(theme.value === 'dark')
  watch(theme, (v) => { isDark.value = v === 'dark' })

  return {
    theme,
    isDark,
    toggleTheme,
  }
}
