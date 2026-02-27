<template>
  <div class="portfolio-page">
    <!-- Hero -->
    <section class="portfolio-hero">
      <div class="container">
        <div class="hero-content">
          <span class="hero-eyebrow">Portfolio</span>
          <h1 class="hero-heading">Our <span class="gradient-text">Work</span></h1>
          <p class="hero-description">A selection of projects we've built for clients and ourselves. Each one crafted with care and attention to detail.</p>
        </div>
      </div>
      <div class="hero-bg">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
      </div>
    </section>

    <!-- Portfolio Content -->
    <section class="portfolio-content">
      <div class="container">
        <!-- Filter -->
        <div class="filter-bar">
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
            v-for="item in displayedItems" 
            :key="item.id" 
            :href="item.projectUrl" 
            target="_blank" 
            class="portfolio-card"
          >
            <div class="card-image-wrapper">
              <img :src="item.imageUrl" :alt="item.title" class="card-image" />
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
  { label: 'All', value: 'all' },
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
  color: var(--color-text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ========== HERO ========== */
.portfolio-hero {
  position: relative;
  padding: 12rem 0 6rem;
  overflow: hidden;
  text-align: center;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}

.hero-eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-primary);
  margin-bottom: 1.25rem;
  padding: 0.3rem 1rem;
  background: rgba(var(--color-primary-rgb), 0.08);
  border-radius: 50px;
}

.hero-heading {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: white;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  max-width: 550px;
  margin: 0 auto;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
}

.hero-orb-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: 10%;
  left: 10%;
}

.hero-orb-2 {
  width: 300px;
  height: 300px;
  background: var(--color-secondary);
  bottom: 10%;
  right: 10%;
}

/* ========== PORTFOLIO CONTENT ========== */
.portfolio-content {
  padding: 4rem 0 6rem;
  background: var(--color-surface);
}

/* Filter bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  border-color: rgba(var(--color-primary-rgb), 0.3);
  color: var(--color-text);
}

.filter-active {
  background: rgba(var(--color-primary-rgb), 0.12);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

/* Card */
.portfolio-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s ease;
}

.portfolio-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--color-primary-rgb), 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

/* Image */
.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: var(--color-background);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.portfolio-card:hover .card-image {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.portfolio-card:hover .card-overlay {
  opacity: 1;
}

.overlay-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  background: rgba(var(--color-primary-rgb), 0.6);
  backdrop-filter: blur(4px);
}

/* Body */
.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.status-badge {
  padding: 0.2rem 0.75rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-in-development {
  background: rgba(var(--color-primary-rgb), 0.12);
  color: var(--color-primary);
}

.status-upcoming {
  background: rgba(var(--color-secondary-rgb), 0.12);
  color: var(--color-secondary);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(var(--color-secondary-rgb), 0.08);
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .portfolio-hero {
    padding: 9rem 0 3rem;
    min-height: auto;
  }
  .hero-heading {
    font-size: 2.25rem;
  }
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .card-image-wrapper {
    height: 200px;
  }
}
</style>
