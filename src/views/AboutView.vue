<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <span class="hero-eyebrow">About Us</span>
          <h1 class="hero-heading">
            Where Innovation Meets <span class="gradient-text">Creativity</span>
          </h1>
          <p class="hero-description">
            We are a forward-thinking creative studio that bridges the gap between imagination and reality. Building digital experiences that matter.
          </p>
        </div>
      </div>
      <div class="hero-bg">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-text">
            <span class="section-eyebrow">Our Mission</span>
            <h2 class="section-heading">Empowering through <span class="gradient-text">Design & Technology</span></h2>
            <p class="mission-statement">
              "Websites are more than just sites, they are tools and resources
              that should be accessible to everyone and meet the needs of the user."
            </p>
          </div>
          <div class="mission-stats">
            <div class="stat-card" v-for="stat in stats" :key="stat.label">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-section">
      <div class="container">
        <div class="section-header-center">
          <span class="section-eyebrow">Technologies</span>
          <h2 class="section-heading">Tools We Use</h2>
          <p class="section-sub">Modern technologies to build fast, scalable, and beautiful products.</p>
        </div>
        <div class="tech-grid">
          <div v-for="tech in techStack" :key="tech.name" class="tech-item">
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="about-cta">
      <div class="container">
        <div class="cta-card">
          <h2 class="cta-heading">Transform Your <span class="gradient-text">Digital Vision</span> Into Reality</h2>
          <p class="cta-desc">
            Ready to elevate your online presence? Let's collaborate to create something extraordinary.
          </p>
          <div class="cta-actions">
            <BaseButton variant="filled" size="large" color="primary" to="/contact" class="cta-btn-primary">
              Start Your Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </BaseButton>
            <BaseButton variant="outlined" size="large" color="primary" to="/portfolio" class="cta-btn-secondary">
              View Our Work
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const stats = ref([
  { value: '5+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '2+', label: 'Years Experience' }
])

const techStack = ref([
  { name: 'Vue.js' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Python' },
  { name: 'Figma' },
  { name: 'TailwindCSS' },
  { name: 'Firebase' },
  { name: 'OpenAI' }
])
</script>

<style scoped>
.about {
  min-height: 100vh;
  color: var(--color-text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ========== GRADIENT TEXT ========== */
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ========== HERO ========== */
.about-hero {
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

/* ========== SHARED SECTION STYLES ========== */
.section-eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
  padding: 0.3rem 1rem;
  background: rgba(var(--color-primary-rgb), 0.08);
  border-radius: 50px;
}

.section-heading {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-header-center {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3.5rem;
}

.section-sub {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-top: 0.5rem;
}

/* ========== MISSION ========== */
.mission {
  padding: 6rem 0;
  background: var(--color-surface);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.mission-text {
  max-width: 550px;
}

.mission-statement {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-top: 1.5rem;
  padding-left: 1.5rem;
  border-left: 3px solid var(--color-primary);
  font-style: italic;
}

.mission-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.75rem 2rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateX(6px);
  border-color: rgba(var(--color-primary-rgb), 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  min-width: 80px;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* ========== VALUES ========== */
.values {
  padding: 6rem 0;
  background: var(--color-background);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.value-card {
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--color-primary-rgb), 0.15);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.value-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(var(--color-primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.value-card:hover .value-icon {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
}

.value-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.value-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ========== TECH STACK ========== */
.tech-section {
  padding: 6rem 0;
  background: var(--color-surface);
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.tech-item {
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 0.75rem 1.75rem;
  transition: all 0.3s ease;
}

.tech-item:hover {
  border-color: rgba(var(--color-primary-rgb), 0.3);
  background: rgba(var(--color-primary-rgb), 0.06);
  transform: translateY(-2px);
}

.tech-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
}

/* ========== CTA ========== */
.about-cta {
  padding: 6rem 0;
  background: var(--color-background);
}

.cta-card {
  text-align: center;
  padding: 5rem 3rem;
  background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.08), rgba(var(--color-secondary-rgb), 0.05));
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.cta-heading {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.cta-desc {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 550px;
  margin: 0 auto 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn-primary {
  border-radius: 50px !important;
  padding: 0.85rem 2rem !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf) !important;
  border: none !important;
  box-shadow: 0 8px 30px rgba(var(--color-primary-rgb), 0.3);
}

.cta-btn-primary:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 40px rgba(var(--color-primary-rgb), 0.4) !important;
}

.cta-btn-secondary {
  border-radius: 50px !important;
  padding: 0.85rem 2rem !important;
  font-weight: 600 !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: white !important;
}

.cta-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-2px) !important;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .mission-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-hero {
    padding: 9rem 0 4rem;
    min-height: auto;
  }
  .hero-heading {
    font-size: 2.25rem;
  }
  .values-grid {
    grid-template-columns: 1fr;
  }
  .cta-card {
    padding: 3rem 1.5rem;
  }
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  .stat-card {
    padding: 1.25rem 1.5rem;
  }
}
</style>

