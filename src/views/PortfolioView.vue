<template>
  <div class="portfolio-view">
    <section class="portfolio-grid-section">
      <div class="container">
        <div class="portfolio-grid">
          <div v-for="item in portfolioItems" :key="item.id" class="portfolio-card">
            <div class="card-image-container">
              <img :src="item.imageUrl" :alt="item.title" class="card-image" />
            </div>
            <div class="card-content">
                            <div class="title-wrapper">
                <h2 class="title-large card-title"><b>{{ item.title }}</b></h2>
                <span v-if="item.status !== 'Complete'" class="status-badge" :class="`status-${item.status.toLowerCase().replace(' ', '-')}`">{{ item.status }}</span>
              </div>
              <p class="body-medium card-description">{{ item.description }}</p>
              <div class="card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag-chip">{{ tag }}</span>
              </div>
              <BaseButton
                :href="item.projectUrl"
                target="_blank"
                variant="tonal"
                size="small"
                color="primary"
                class="card-action-button"
              >
                View Project
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </template>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';

const portfolioItems = ref([
  {
    id: 1,
    title: 'Bolao Mania',
    description: 'Innovative mobile platform designed for seamless cross-device interaction and a rich user experience.',
    imageUrl: '/bolaomaniawebpage.png',
    tags: ['Mobile', 'Web App', 'Vue.js', 'Sports'],
    projectUrl: 'https://bolaomania.com',
    status: 'Complete'
  },
  {
    id: 2,
    title: 'inove.profile',
    description: 'Manage your profile for inove.studio. Create your profile and start up your journey for the future.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Web App', 'Profile', 'Vue.js', 'Data'],
    projectUrl: 'https://profile.inove.studio',
    status: 'In Development'
  },
  {
    id: 3,
    title: 'AI Platform',
    description: 'Work faster and more intelligently with AI.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-2858200e74a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['AI', 'Automation'],
    projectUrl: '#ai-platform-link',
    status: 'Upcoming'
  }
]);
</script>

<style scoped>
.portfolio-view {
  background-color: var(--color-background);
  color: var(--color-text);
  min-height: 100vh;
  padding-bottom: var(--spacing-3xl);
}

/* Header styles (restored) */
.page-header {
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  text-align: center;
  background-color: var(--color-surface-container-low);
  border-bottom: 1px solid var(--color-outline-variant);
}

.page-title {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.card-content .card-title {
  margin-bottom: 0;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-complete {
  background-color: var(--color-success-container);
  color: var(--color-on-success-container);
}

.status-in-development {
  background-color: var(--color-tertiary-container);
  color: var(--color-on-tertiary-container);
}

.status-upcoming {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.page-subtitle {
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
}

.portfolio-grid-section {
  padding: var(--spacing-2xl) 0;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}

.portfolio-card {
  background-color: var(--color-surface-container);
  border-radius: var(--radius-lg, 16px);
  box-shadow: var(--shadow-3);
  border: 2px solid transparent; /* Initial transparent border */
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              border-color 0.3s ease-out,
              background-color 0.3s ease-out; /* Added background-color transition */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures content like scaled image respects border radius */
}

.portfolio-card:hover {
  transform: translateY(-12px) scale(1.04) rotate(-1.5deg);
  box-shadow: var(--shadow-6, 0 16px 32px -8px rgba(0,0,0,0.3)); /* More pronounced shadow */
  border-color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-container)); /* Subtle primary color tint on hover */
}

.card-image-container {
  width: 100%;
  height: 220px;
  background-color: var(--color-surface-variant);
  overflow: hidden; /* Crucial for image zoom effect */
  /* Adjust border-radius if the card's border makes the top corners of image container look off */
  /* border-radius: calc(var(--radius-lg, 16px) - 2px) calc(var(--radius-lg, 16px) - 2px) 0 0; */ 
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.portfolio-card:hover .card-image {
  transform: scale(1.15); /* Increased image zoom */
}

.card-content {
  padding: var(--spacing-lg);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  color: var(--color-on-surface);
  margin-bottom: var(--spacing-sm);
}

.card-description {
  color: var(--color-on-surface-variant);
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
  line-height: 1.6;
}

.card-tags {
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag-chip {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm, 8px);
  font-size: var(--font-size-label-small);
  font-weight: 500;
}

.card-action-button {
  align-self: flex-start;
  margin-top: auto; /* Pushes button to the bottom */
}

/* Animate button icon on hover */
:deep(.card-action-button .button-icon svg) {
  transition: transform 0.3s ease-out; /* Smooth transition back */
}
:deep(.card-action-button:hover .button-icon svg) {
  transform: translateX(3px) scale(1.1);
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  .page-header { /* Restored responsive style */
    padding: var(--spacing-2xl) 0 var(--spacing-xl);
  }
  .card-image-container {
    height: 200px;
  }
  .portfolio-card:hover {
    /* Tone down hover effect slightly on mobile if needed */
    transform: translateY(-8px) scale(1.02) rotate(-1deg);
  }
  .portfolio-card:hover .card-image {
    transform: scale(1.1);
  }
}
</style>
