<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="display-large" data-aos="fade-up">
            Where Innovation Meets <span class="gradient-text">Creativity</span>
          </h1>
          <p class="hero-description" data-aos="fade-up" data-aos-delay="100">
            We are a forward-thinking creative studio that bridges the gap between imagination and reality.
          </p>
          <div class="hero-cta" data-aos="fade-up" data-aos-delay="200">
            <BaseButton 
              variant="outlined" 
              size="large"
              class="explore-btn"
            >
              Explore Our Work
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24">
                arrow_forward
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Gradient Transition -->
    <div class="gradient-transition"></div>

    <!-- Mission Section -->
    <section class="mission">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2>Empowering through <span class="gradient-text">Design & Technology</span></h2>
            <p class="mission-statement">
              I believe websites are more than just sites, they are tools and resources
              that should be accessible to everyone and meet the needs of the user.
            </p>
            <div class="mission-stats">
              <div class="stat">
                <div class="stat-number" data-count="50">0</div>
                <div class="stat-label">Projects</div>
              </div>
              <div class="stat">
                <div class="stat-number" data-count="100">0</div>
                <div class="stat-label">Client Satisfaction</div>
              </div>
              <div class="stat">
                <div class="stat-number" data-count="10">0</div>
                <div class="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          <!-- Visual elements removed for cleaner layout -->
        </div>
      </div>
    </section>



    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2>Transform Your <span class="gradient-text">Digital Vision</span> Into Reality</h2>
            <p class="cta-description">
              Ready to elevate your online presence? Let's collaborate to create something extraordinary. 
              From concept to launch, I'm here to bring your ideas to life with clean, efficient code 
              and thoughtful design.
            </p>
          </div>
          <div class="cta-actions">
            <BaseButton 
              variant="filled" 
              size="large" 
              color="primary"
              to="/contact"
              class="cta-button primary"
            >
              <span class="btn-content">
                <span class="btn-text">Start Your Project</span>
                <span class="material-symbols-outlined btn-icon">arrow_forward</span>
              </span>
              <span class="btn-bg"></span>
            </BaseButton>
            <BaseButton 
              variant="outlined" 
              size="large" 
              color="primary"
              to="/portfolio"
              class="cta-button secondary"
            >
              <span class="btn-content">
                <span class="btn-text">View My Work</span>
                <span class="material-symbols-outlined btn-icon">open_in_new</span>
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

// Counter animation
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target + (counter.getAttribute('data-count') === '100' ? '%' : '+');
    }
  });
}

// Intersection Observer for counter animation
let observer;

const setupObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class
        entry.target.classList.add('animate');
        // Start counter animation
        animateCounters();
        // Stop observing after animation starts
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all stat numbers
  document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
  });
}

// Initialize AOS animations
onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic'
  });
  
  // Setup intersection observer for counter animation
  if (typeof window !== 'undefined') {
    setupObserver();
  }
});

// Cleanup observer
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});

// No need for parallax effect with grid layout

// Single founder section is used instead of a team
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.about {
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: var(--color-on-surface);
  line-height: 1.6;
  background: var(--color-surface);
}

/* Typography */
.eyebrow {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-primary);
  margin-bottom: 1.25rem;
  display: inline-block;
  position: relative;
  padding-bottom: 0.5rem;
  opacity: 0.9;
}

.eyebrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0.5);
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.eyebrow[data-aos^="fade"][data-aos^="fade"].aos-animate::after {
  transform: translateX(-50%) scaleX(1);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1.5rem;
  color: var(--color-on-surface);
}

h1 {
  font-size: clamp(2.8rem, 6vw, 5rem);
  letter-spacing: -0.02em;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.5rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  margin: 0.5rem 0 1.5rem;
  color: white;
  line-height: 1.2;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  margin: 0 0 1.5rem;
  color: var(--color-on-surface-variant);
  font-size: 1.125rem;
  line-height: 1.7;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-text {
  background: linear-gradient(-45deg, #00d4ff, #6a11cb, #00d4ff, #6a11cb);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
  animation: gradientAnimation 8s ease infinite;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Section */
.about-hero {
  position: relative;
  padding: 15rem 0 10rem;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a1a, #1a1a3a);
  color: white;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow-x: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
  transform: translateZ(0);
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(100, 108, 255, 0.08) 0%, transparent 20%),
    radial-gradient(circle at 80% 70%, rgba(0, 221, 255, 0.08) 0%, transparent 20%),
    radial-gradient(circle at 40% 60%, rgba(255, 92, 0, 0.08) 0%, transparent 20%);
  background-size: 200% 200%;
  animation: gradientMove 20s ease infinite;
  z-index: 1;
  pointer-events: none;
}

.hero-description {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 2rem auto 3rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-weight: 300;
  opacity: 0.9;
}

/* Gradient Transition */
.gradient-transition {
  height: 150px;
  width: 100%;
  background: linear-gradient(to bottom, 
    rgba(30, 30, 30, 0) 0%, 
    rgba(30, 30, 30, 0.8) 30%, 
    var(--color-surface-container-low) 100%);
  margin-top: -100px;
  position: relative;
  z-index: 2;
}

/* Mission Section */
.mission {
  padding: 8rem 0 6rem;
  background: var(--color-surface-container-low);
  position: relative;
  z-index: 1;
}

.mission::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent);
}

.mission-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  position: relative;
}

.mission-text {
  max-width: 600px;
  position: relative;
  z-index: 2;
}

.mission-statement {
  margin: 2rem 0 3rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-on-surface-variant);
  position: relative;
  padding: 1rem 0 1rem 1.5rem;
  border-left: 2px solid var(--color-primary);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mission-statement:hover {
  transform: translateX(8px);
  color: var(--color-text);
  border-left-color: var(--color-secondary);
  background: rgba(255, 255, 255, 0.02);
  padding-left: 2rem;
  border-radius: 0 8px 8px 0;
}

.mission-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}

.stat {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(145deg, var(--color-surface), var(--color-surface-container));
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transform: perspective(1000px) translateZ(0);
  will-change: transform, box-shadow;
}

.stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(103, 80, 164, 0.1) 0%, 
    rgba(0, 212, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.stat::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scaleX(0);
  transform-origin: left;
}

.stat:hover {
  transform: perspective(1000px) translateY(-8px) translateZ(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat:hover::before {
  opacity: 1;
}

.stat:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  font-family: var(--font-family-display);
  transition: all 0.3s ease;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-on-surface-variant);
  font-weight: 500;
  letter-spacing: 0.5px;
}



/* CTA Section */
.cta {
  padding: 8rem 0;
  position: relative;
  background: var(--color-surface-container-low);
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-outline-variant), transparent);
}

.cta-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: 0 1.5rem;
}

.cta .eyebrow {
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cta h2 {
  font-size: 3rem;
  line-height: 1.15;
  margin: 0 0 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, var(--color-text) 0%, var(--color-text) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta .gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-description {
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--color-on-surface-variant);
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.5rem;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, box-shadow;
  min-width: 200px;
  height: 56px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
}

.cta-button .btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 2rem;
  width: 100%;
  height: 100%;
}

.cta-button.primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.2);
}

.cta-button.primary .btn-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(var(--color-primary-rgb), 0.3);
}

.cta-button.primary:hover .btn-bg {
  opacity: 1;
}

.cta-button.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-outline-variant);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-button.secondary:hover {
  background: var(--color-surface-container-high);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.cta-button .btn-icon {
  font-size: 1.25rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-button:hover .btn-icon {
  transform: translateX(4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cta {
    padding: 6rem 0;
  }
  
  .cta h2 {
    font-size: 2.25rem;
  }
  
  .cta-description {
    font-size: 1.125rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
  }
}

.explore-btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
}

.explore-btn .material-symbols-outlined {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.explore-btn:hover .material-symbols-outlined {
  transform: translateX(3px);
}

/* Responsive Styles */
@media (max-width: 992px) {
  .mission-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .mission-visual {
    min-height: 300px;
  }
  
  .floating-card {
    width: 140px;
    padding: 1.25rem;
  }
  
  .card-2 {
    right: 5%;
  }
  
  .card-3 {
    left: 10%;
  }
}

@media (max-width: 768px) {
  .about-hero {
    padding: 10rem 0 6rem;
    min-height: auto;
  }
  
  .hero-content h1 {
    font-size: 2.25rem;
    line-height: 1.2;
  }
  
  .hero-description {
    font-size: 1.0625rem;
    margin: 1.25rem auto 2rem;
  }
  
  .hero-scroll-indicator {
    bottom: 1.5rem;
  }
  
  .mission-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat {
    max-width: 200px;
    margin: 0 auto;
  }
  
  .floating-card {
    width: 120px;
    padding: 1rem;
  }
  
  .floating-card .card-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .floating-card {
    width: 100px;
    font-size: 0.875rem;
  }
  
  .floating-card .card-icon {
    font-size: 1.75rem;
  }
  
  .value-card, .team-card {
    padding: 1.5rem;
  }
}

.hero-content h1 {
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-content p:nth-child(2) {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.hero-description {
  max-width: 700px;
  margin: 0 auto;
}

.mission {
  padding: var(--spacing-3xl) 0;
  background-color: var(--color-surface);
}

.mission-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.mission-text h2 {
  margin-bottom: var(--spacing-xl);
  color: var(--color-text);
}

.mission-text p {
  margin-bottom: var(--spacing-lg);
}

.mission-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-element {
  position: relative;
  width: 300px;
  height: 300px;
}

.floating-card {
  position: absolute;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 0;
  left: 0;
  animation-delay: 0s;
}

.card-2 {
  top: 50px;
  right: 0;
  animation-delay: 2s;
}

.card-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 4s;
}

.card-icon {
  font-size: 2rem;
}

.floating-card span {
  font-weight: 500;
  color: var(--color-text);
}

.values {
  padding: var(--spacing-3xl) 0;
}

.section-title {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}

.value-icon .icon {
  font-size: 3rem;
}

.team {
  padding: var(--spacing-3xl) 0;
  background-color: var(--color-surface);
}

.team-subtitle {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1000px;
  margin: 0 auto;
}

.team-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-title-large);
  font-weight: 600;
  color: white;
}

.cta {
  padding: var(--spacing-3xl) 0;
  background: linear-gradient(135deg, rgba(103, 80, 164, 0.1), rgba(3, 218, 198, 0.1));
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
}

.cta-content p {
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .mission-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .visual-element {
    width: 250px;
    height: 250px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>

