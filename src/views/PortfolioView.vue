<template>
  <div class="portfolio-page">
    <!-- Hero -->
    <section class="portfolio-hero">
      <div class="container hero-container">
        <div class="hero-content" data-aos="fade-up">
          <span class="hero-eyebrow">Selected Works</span>
          <h1 class="hero-heading">Our <span class="text-accent">Portfolio</span>.</h1>
          <p class="hero-description">A curated selection of digital products, websites, and platforms we've built with care and attention to detail.</p>
        </div>
      </div>
      <div class="hero-background">
        <div class="grid-overlay"></div>
      </div>
    </section>

    <!-- Portfolio Content -->
    <section class="portfolio-content">
      <div class="container">
        <!-- Filter -->
        <div class="filter-bar" data-aos="fade-up">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            class="filter-btn"
            :class="{ 'filter-active': selectedStatus === filter.value }"
            @click="selectedStatus = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Grid -->
        <div class="portfolio-grid">
          <a 
            v-for="(item, index) in displayedItems" 
            :key="item.id" 
            :href="item.projectUrl" 
            target="_blank" 
            class="portfolio-card"
            :data-aos="'fade-up'"
            :data-aos-delay="(index % 2) * 100"
          >
            <div class="card-image-wrapper">
              <img v-if="item.imageUrl && item.imageUrl !== '/'" :src="item.imageUrl" :alt="item.title" class="card-image" />
              <div v-else class="card-image placeholder-img"></div>
              <div class="card-overlay">
                <span class="overlay-text">
                  View Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </div>
            </div>
            <div class="card-body">
              <div class="card-header">
                <h3 class="card-title">{{ item.title }}</h3>
                <span 
                  v-if="item.status !== 'Complete'" 
                  class="status-badge" 
                  :class="`status-${item.status.toLowerCase().replace(' ', '-')}`"
                >
                  {{ item.status }}
                </span>
              </div>
              <p class="card-desc">{{ item.description }}</p>
              <div class="card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const selectedStatus = ref('all');

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Complete', value: 'Complete' },
  { label: 'In Development', value: 'In Development' },
  { label: 'Upcoming', value: 'Upcoming' }
];

const STATUS_ORDER = ['Complete', 'In Development', 'Upcoming'];
const getStatusRank = (status) => {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? Number.POSITIVE_INFINITY : idx;
};

const portfolioItems = ref([
  {
    id: 1,
    title: 'Bolao Mania',
    description: 'Innovative mobile platform designed for seamless cross-device interaction and a rich user experience.',
    imageUrl: '/bolaomaniawebpage.png',
    tags: ['Mobile', 'Web App', 'Sports'],
    projectUrl: 'https://bolaomania.com',
    status: 'Complete'
  },
  {
    id: 2,
    title: 'inove.profile',
    description: 'Manage your profile for inove.studio. Create your profile and start up your journey for the future.',
    imageUrl: '/inoveprofilewebimage.png',
    tags: ['Web App', 'Profile', 'Data'],
    projectUrl: 'https://profile.inove.studio',
    status: 'In Development'
  },
  {
    id: 3,
    title: 'my soccer lab',
    description: 'The ultimate platform for soccer analytics and team management.',
    imageUrl: '/mysoccerlab.png',
    tags: ['Soccer', 'Analytics', 'Mobile'],
    projectUrl: 'https://mysoccerlab.inove.studio',
    status: 'Complete'
  },
  {
    id: 4,
    title: 'inove.games',
    description: 'Find and play/access our games.',
    imageUrl: '/',
    tags: ['Games', 'Mobile'],
    projectUrl: 'https://games.inove.studio',
    status: 'In Development'
  }
]);

const displayedItems = computed(() => {
  const filtered = selectedStatus.value === 'all'
    ? portfolioItems.value
    : portfolioItems.value.filter((item) => item.status === selectedStatus.value);

  return [...filtered].sort((a, b) => {
    const rankDiff = getStatusRank(a.status) - getStatusRank(b.status);
    if (rankDiff !== 0) return rankDiff;
    return String(a.title).localeCompare(String(b.title));
  });
});
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  background: var(--color-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ========== HERO ========== */
.portfolio-hero {
  position: relative;
  padding: 10rem 0 6rem;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 700px;
}

.hero-eyebrow {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  padding: 0.4rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
}

.hero-heading {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.text-accent {
  color: var(--color-text-secondary);
  font-style: italic;
  font-weight: 300;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 550px;
}

/* Hero Background - Clean Grid */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 4rem 4rem;
  mask-image: radial-gradient(ellipse 80% 80% at 20% 20%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 20% 20%, black 20%, transparent 80%);
}

/* ========== PORTFOLIO CONTENT ========== */
.portfolio-content {
  padding: 2rem 0 8rem;
  background: var(--color-background);
}

/* Filter bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  border: 1px solid var(--color-outline);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.filter-btn:hover {
  border-color: var(--color-text-secondary);
  color: var(--color-text);
  background: var(--color-surface-variant);
}

.filter-active {
  background: var(--color-text) !important;
  border-color: var(--color-text) !important;
  color: var(--color-background) !important;
  font-weight: 600;
}

/* Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

/* Card */
.portfolio-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  group: true;
}

/* Image */
.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
  border-radius: 16px;
  background: var(--color-surface-variant);
  margin-bottom: 1.5rem;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
  filter: brightness(0.9);
}

.placeholder-img {
  background: linear-gradient(135deg, var(--color-surface-variant), var(--color-surface-container-high));
}

.portfolio-card:hover .card-image {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.portfolio-card:hover .card-overlay {
  opacity: 1;
}

.overlay-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  background: #fff;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  opacity: 0;
}

.portfolio-card:hover .overlay-text {
  transform: translateY(0);
  opacity: 1;
}

/* Body */
.card-body {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.status-badge {
  padding: 0.2rem 0.75rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid var(--color-outline);
}

.status-in-development {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-secondary);
}

.status-upcoming {
  background: transparent;
  border-style: dashed;
  color: var(--color-text-tertiary);
}

.card-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--color-outline);
  color: var(--color-text-secondary);
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .portfolio-hero {
    padding: 8rem 0 4rem;
    min-height: auto;
  }
  .hero-heading {
    font-size: 2.75rem;
  }
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style>
