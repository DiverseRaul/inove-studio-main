<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Creative Studio
          </div>
          <h1 class="hero-title">inove.<span ref="typewriter" class="typewriter"></span></h1>
          <p class="hero-subtitle">We design & build digital products that help businesses grow. From stunning websites to intelligent AI solutions — we bring your vision to life.</p>
          <div class="hero-actions">
            <BaseButton 
              variant="filled" 
              size="large" 
              color="primary"
              class="hero-btn-primary"
              to="/contact"
            >
              Start a Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </BaseButton>
            <BaseButton 
              variant="outlined" 
              size="large" 
              color="primary"
              class="hero-btn-secondary"
              to="/portfolio"
            >
              View Our Work
            </BaseButton>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="stat-num">5+</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat-divider"></div>
            <div class="hero-stat">
              <span class="stat-num">100%</span>
              <span class="stat-label">Satisfaction</span>
            </div>
            <div class="stat-divider"></div>
            <div class="hero-stat">
              <span class="stat-num">2+</span>
              <span class="stat-label">Years</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="home-cta">
      <div class="container">
        <div class="cta-card">
          <h2 class="cta-title">Ready to bring your <span class="gradient-text">vision</span> to life?</h2>
          <p class="cta-desc">Let's create something extraordinary together. Get in touch and let's start building your next project.</p>
          <div class="cta-actions">
            <BaseButton variant="filled" size="large" color="primary" to="/contact" class="cta-btn">
              Start Your Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

// Typewriter effect
const typewriter = ref(null)
const words = ['studio', 'ai', 'create', 'bolao', 'dev', 'profile']
let currentWordIndex = 0
let charIndex = 0
let isDeleting = false
let typeSpeed = 200
let waitTime = 3000
let timeoutId = null

const typeEffect = () => {
  const currentWord = words[currentWordIndex]
  
  if (isDeleting) {
    charIndex--
    typeSpeed = 100
  } else {
    charIndex++
    typeSpeed = 200
  }

  if (typewriter.value) {
    typewriter.value.textContent = currentWord.substring(0, charIndex)
  }

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = waitTime
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    currentWordIndex = (currentWordIndex + 1) % words.length
  }

  timeoutId = setTimeout(typeEffect, typeSpeed)
}

onMounted(() => {
  setTimeout(typeEffect, 1000)
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* ========== HERO ========== */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 8rem 0 4rem;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(var(--color-primary-rgb), 0.1);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  color: var(--color-primary);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease-out;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  animation: pulse 2s infinite;
}

.hero-title {
  color: white;
  font-family: var(--font-family-primary);
  font-size: clamp(3.5rem, 8vw, 7rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
  animation: fadeInUp 0.8s ease-out 0.1s both;
}

.hero-title .typewriter {
  font-weight: 300;
  position: relative;
  display: inline-block;
  min-width: 1px;
  vertical-align: top;
  line-height: 1.2;
}

.hero-title .typewriter::after {
  content: '|';
  position: absolute;
  right: -7%;
  color: var(--color-primary);
  animation: blink 0.7s infinite;
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

.hero-btn-primary {
  border-radius: 50px !important;
  padding: 0.85rem 2rem !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf) !important;
  border: none !important;
  box-shadow: 0 8px 30px rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.hero-btn-primary:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 40px rgba(var(--color-primary-rgb), 0.4) !important;
}

.hero-btn-secondary {
  border-radius: 50px !important;
  padding: 0.85rem 2rem !important;
  font-weight: 600 !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-2px) !important;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  animation: fadeInUp 0.8s ease-out 0.5s both;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-num {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

/* Hero Background */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: 10%;
  left: 5%;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: var(--color-secondary);
  top: 50%;
  right: 10%;
  animation-delay: 3s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  background: #7c5cbf;
  bottom: 10%;
  left: 50%;
  animation-delay: 5s;
}

/* ========== SERVICES ========== */
.services-section {
  padding: 6rem 0;
  background: var(--color-surface);
  position: relative;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

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

.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.section-subtitle strong {
  color: var(--color-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.service-card {
  position: relative;
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--color-primary-rgb), 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.service-card:hover::before {
  opacity: 1;
}

.service-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(var(--color-primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  transform: scale(1.05);
}

.service-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.service-desc {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.service-link:hover {
  gap: 0.7rem;
  color: var(--color-secondary);
}

/* ========== PROCESS ========== */
.process-section {
  padding: 6rem 0;
  background: var(--color-background);
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

.process-step {
  position: relative;
  text-align: center;
  padding: 2rem 1.5rem;
}

.step-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2), rgba(var(--color-secondary-rgb), 0.1));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1;
}

.step-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.step-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.step-line {
  display: none;
}

/* ========== TESTIMONIALS ========== */
.testimonials-section {
  padding: 6rem 0;
  background: var(--color-surface);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.testimonial-card {
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--color-primary-rgb), 0.15);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.testimonial-stars {
  display: flex;
  gap: 0.15rem;
  color: #f5c518;
  margin-bottom: 1.25rem;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: white;
  flex-shrink: 0;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
}

.author-role {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
}

/* ========== CTA ========== */
.home-cta {
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

.cta-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  justify-content: center;
}

.cta-btn {
  border-radius: 50px !important;
  padding: 0.85rem 2rem !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf) !important;
  border: none !important;
  box-shadow: 0 8px 30px rgba(var(--color-primary-rgb), 0.3);
}

.cta-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 40px rgba(var(--color-primary-rgb), 0.4) !important;
}

/* ========== ANIMATIONS ========== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 7rem 0 3rem;
    min-height: auto;
  }
  .hero-title {
    font-size: 3rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  .hero-stats {
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .stat-num {
    font-size: 1.25rem;
  }
  .services-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  .process-steps {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .process-step {
    padding: 1.5rem 1rem;
  }
  .cta-card {
    padding: 3rem 1.5rem;
  }
  .gradient-orb {
    filter: blur(60px);
    opacity: 0.15;
  }
}
</style>

