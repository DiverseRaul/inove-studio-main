<template>
  <div 
    class="base-card"
    :class="cardClasses"
    @click="handleClick"
  >
    <div v-if="$slots.media" class="card-media">
      <slot name="media" />
    </div>
    
    <div class="card-content">
      <div v-if="$slots.header" class="card-header">
        <slot name="header" />
      </div>
      
      <div v-if="title || subtitle || $slots.default" class="card-body">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
        <div v-if="$slots.default" class="card-text">
          <slot />
        </div>
      </div>
      
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'elevated',
    validator: (value) => ['elevated', 'filled', 'outlined'].includes(value)
  },
  clickable: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: 'normal',
    validator: (value) => ['none', 'small', 'normal', 'large'].includes(value)
  }
})

const emit = defineEmits(['click'])

const cardClasses = computed(() => [
  `card-${props.variant}`,
  `card-padding-${props.padding}`,
  {
    'card-clickable': props.clickable
  }
])

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;
}

/* Variants */
.card-elevated {
  box-shadow: var(--shadow-1);
}

.card-elevated:hover {
  box-shadow: var(--shadow-2);
  transform: translateY(-2px);
}

.card-filled {
  background-color: var(--color-surface-variant);
}

.card-outlined {
  border: 1px solid var(--color-outline-variant);
  background-color: var(--color-surface);
}

/* Clickable */
.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  background-color: var(--color-surface-container);
}

.card-clickable:active {
  transform: scale(0.98);
}

/* Padding */
.card-padding-none .card-content {
  padding: 0;
}

.card-padding-small .card-content {
  padding: var(--spacing-md);
}

.card-padding-normal .card-content {
  padding: var(--spacing-lg);
}

.card-padding-large .card-content {
  padding: var(--spacing-xl);
}

/* Media */
.card-media {
  width: 100%;
  overflow: hidden;
}

.card-media img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform var(--transition-normal);
}

.card-clickable:hover .card-media img {
  transform: scale(1.05);
}

/* Content */
.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.card-title {
  font-size: var(--font-size-title-large);
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  line-height: var(--line-height-tight);
}

.card-subtitle {
  font-size: var(--font-size-body-medium);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-normal);
}

.card-text {
  font-size: var(--font-size-body-large);
  color: var(--color-text);
  line-height: var(--line-height-relaxed);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

/* Focus */
.card-clickable:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .card-padding-normal .card-content {
    padding: var(--spacing-md);
  }
  
  .card-padding-large .card-content {
    padding: var(--spacing-lg);
  }
}
</style>

