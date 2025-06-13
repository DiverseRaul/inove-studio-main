<template>
  <component 
    :is="tag"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled"
    class="base-button"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="button-icon">
      <slot name="icon" />
    </span>
    <span class="button-text">
      <slot />
    </span>
    <span v-if="loading" class="button-loading">
      <div class="loading-spinner"></div>
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outlined', 'text', 'elevated', 'tonal'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'tertiary', 'error'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const tag = computed(() => {
  if (props.to) return 'RouterLink'
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => [
  `button-${props.variant}`,
  `button-${props.size}`,
  `button-${props.color}`,
  {
    'button-disabled': props.disabled,
    'button-loading': props.loading,
    'button-full-width': props.fullWidth
  }
])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-primary);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  overflow: hidden;
  user-select: none;
  white-space: nowrap;
}

.base-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Sizes */
.button-small {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-label-medium);
  min-height: 32px;
}

.button-medium {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-label-large);
  min-height: 40px;
}

.button-large {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-body-large);
  min-height: 48px;
}

/* Variants - Primary Color */
.button-filled.button-primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: var(--shadow-1);
}

.button-filled.button-primary:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-2);
  transform: translateY(-1px);
}

.button-outlined.button-primary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.button-outlined.button-primary:hover {
  background-color: rgba(103, 80, 164, 0.1);
  transform: translateY(-1px);
}

.button-text.button-primary {
  background-color: transparent;
  color: var(--color-primary);
}

.button-text.button-primary:hover {
  background-color: rgba(103, 80, 164, 0.1);
}

.button-elevated.button-primary {
  background-color: var(--color-surface-container);
  color: var(--color-primary);
  box-shadow: var(--shadow-2);
}

.button-elevated.button-primary:hover {
  background-color: var(--color-surface-container-high);
  box-shadow: var(--shadow-3);
  transform: translateY(-2px);
}

.button-tonal.button-primary {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.button-tonal.button-primary:hover {
  background-color: rgba(234, 221, 255, 0.8);
  transform: translateY(-1px);
}

/* Variants - Secondary Color */
.button-filled.button-secondary {
  background-color: var(--color-secondary);
  color: var(--color-on-secondary);
  box-shadow: var(--shadow-1);
}

.button-filled.button-secondary:hover {
  background-color: var(--color-secondary-hover);
  box-shadow: var(--shadow-2);
  transform: translateY(-1px);
}

.button-outlined.button-secondary {
  background-color: transparent;
  color: var(--color-secondary);
  border: 2px solid var(--color-secondary);
}

.button-outlined.button-secondary:hover {
  background-color: rgba(3, 218, 198, 0.1);
  transform: translateY(-1px);
}

/* States */
.button-disabled {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}

.button-loading {
  cursor: not-allowed;
}

.button-loading .button-text {
  opacity: 0;
}

.button-full-width {
  width: 100%;
}

/* Loading Spinner */
.button-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Icon */
.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ripple Effect */
.base-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.base-button:active::before {
  width: 300px;
  height: 300px;
}
</style>

