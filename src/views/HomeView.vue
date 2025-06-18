<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title display-large">inove.<span ref="typewriter" class="typewriter"></span></h1>
          <div class="hero-actions">
            <BaseButton 
              variant="filled" 
              size="large" 
              color="primary"
              class="hero-button"
              @click="scrollToServices"
            >
              <span class="button-content">
                <span class="button-text">Get Started</span>
                <span class="button-icon">→</span>
              </span>
            </BaseButton>
            <BaseButton 
              variant="outlined" 
              size="large" 
              color="primary"
              class="hero-button secondary"
              to="/portfolio"
            >
              <span class="button-content">
                <span class="button-text">Products</span>
                <span class="button-icon">
                  <span class="icon-arrow">→</span>
                  <span class="icon-dots">•••</span>
                </span>
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2 class="features-title">
            <span class="title-text">What We Do</span>
            <span class="title-badge">Our Services</span>
          </h2>
          <p class="section-subtitle">We craft experiences that work for <span class="gradient-text">YOU</span></p>
        </div>
        
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.id"
            class="feature-card"
            :class="`card-${index + 1}`"
            @click="handleFeatureClick(feature)"
          >
            <div class="card-content">
              <div class="card-icon">
                <svg v-if="feature.iconClass === 'icon-web'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <svg v-else-if="feature.iconClass === 'icon-brand'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <svg v-else-if="feature.iconClass === 'icon-strategy'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <div class="icon-bg"></div>
              </div>
              <h3 class="card-title">{{ feature.title }}</h3>
              <p class="card-description">{{ feature.description }}</p>
              <span class="card-link">
                Learn more
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
            <div class="card-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'

const features = ref([
  {
    id: 1,
    title: 'Web Design',
    description: 'Modern, clean, and responsive websites that turns visitors into customers with great experiences.',
    iconClass: 'icon-web',
    color: '--color-primary'
  },
  {
    id: 2,
    title: 'Brand Identity',
    description: 'Crafting distinctive visuals that tell your story and connect with your audience.',
    iconClass: 'icon-brand',
    color: '--color-secondary'
  },
  {
    id: 3,
    title: 'AI Development',
    description: 'Building intelligent systems that automate tasks, provide insights, and drive business growth.',
    iconClass: 'icon-strategy',
    color: '--color-tertiary'
  }
])

const scrollToServices = () => {
  // Smooth scroll to services section
  const servicesSection = document.querySelector('.features')
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleFeatureClick = (feature) => {
  console.log('Feature clicked:', feature.title)
  // Navigate to services page or show more details
}

// Typewriter effect
const typewriter = ref(null)
const words = ['studio', 'ai', 'create', 'bolao', 'dev', 'profile']
let currentWordIndex = 0
let charIndex = 0
let isDeleting = false
let typeSpeed = 200  // Increased from 100 (slower typing)
let waitTime = 3000  // Increased from 2000 (longer pause between words)
let timeoutId = null

const typeEffect = () => {
  const currentWord = words[currentWordIndex]
  
  if (isDeleting) {
    charIndex--
    typeSpeed = 100  // Increased from 50 (slower deleting)
  } else {
    charIndex++
    typeSpeed = 200  // Increased from 100 (slower typing)
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
  // Start the typewriter effect after a small delay
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

.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-3xl) 0;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.hero-title {
  color: white;
  font-family: var(--font-family);
  font-size: 7rem;
  margin-bottom: var(--spacing-2xl);
  font-weight: 700;
}

.hero-title .typewriter {
  font-weight: 300;
  position: relative;
  display: inline-block;
  min-width: 1px; /* Prevents collapse when empty */
  vertical-align: top; /* Ensures consistent vertical alignment */
  line-height: 1.2; /* Match the line-height of the parent */
}

.hero-title .typewriter::after {
  content: '|';
  position: absolute;
  right: -7%;
  color: white;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}


.hero-subtitle {
  margin-bottom: var(--spacing-2xl);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-description {
  margin-bottom: var(--spacing-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.6s both;
  margin-top: 2rem;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.hero-button {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 50px;
  padding: 0.9rem 2.2rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-size: 0.9rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  will-change: transform, box-shadow;
  animation: pulse 4s infinite ease-in-out;
}

.hero-button:not(.secondary) {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border: none;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.hero-button:not(.secondary)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.6s ease;
  border-radius: 50px;
}

.hero-button:not(.secondary):hover::before {
  opacity: 1;
}

.hero-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(var(--color-primary-rgb), 0.3);
  color: var(--color-primary);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: visible;
}

.hero-button.secondary::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-primary));
  background-size: 200% 200%;
  z-index: -1;
  border-radius: 50px;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.hero-button.secondary:hover::before {
  opacity: 1;
  animation: gradientBG 3s ease infinite;
}

.hero-button .button-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  z-index: 2;
  transition: transform 0.3s ease;
}

.hero-button .button-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.hero-button .icon-arrow,
.hero-button .icon-dots {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-button .icon-dots {
  transform: translateX(-20px);
  opacity: 0;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.hero-button.secondary .icon-arrow {
  transform: translateX(0) rotate(0);
}

.hero-button.secondary:hover .icon-arrow {
  transform: translateX(20px) rotate(45deg);
  opacity: 0;
}

.hero-button.secondary:hover .icon-dots {
  transform: translateX(0);
  opacity: 1;
  animation: dotsPulse 1.5s infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes dotsPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.hero-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  animation: none;
}

.hero-button:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Gradient animation on primary button is now handled by the ::before pseudo-element */

.hero-button.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: transparent;
  color: white;
}

.hero-button:not(.secondary):hover .button-icon {
  animation: bounceRight 1s infinite;
}

@keyframes bounceRight {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}

/* Features Section */
.features {
  padding: 8rem 0;
  background: linear-gradient(135deg, rgba(var(--color-background-rgb), 0.95), rgba(var(--color-background-alt-rgb, var(--color-background-rgb)), 0.98));
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.1), transparent);
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
  position: relative;
}

.features-title {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  font-weight: 700;
  color: var(--color-primary);
}

.title-badge {
  position: absolute;
  top: -12px;
  right: -80px;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 1rem;
  border-radius: 50px;
  transform: rotate(5deg);
  backdrop-filter: blur(5px);
}

.section-subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  backdrop-filter: blur(10px);
  cursor: pointer;
  animation: floatCard 8s ease-in-out infinite;
}

.feature-card:nth-child(2) { animation-delay: 0.5s; }
.feature-card:nth-child(3) { animation-delay: 1s; }

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.feature-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.03);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-icon {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
  color: var(--color-primary);
  font-size: 1.8rem;
  z-index: 1;
}

.card-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 1.5;
  transition: all 0.3s ease;
}

.feature-card:hover .card-icon svg {
  color: white;
  transform: scale(1.1);
}

.card-icon .icon-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  opacity: 0.15;
  z-index: -1;
  transition: all 0.4s ease;
}

.feature-card:hover .icon-bg {
  opacity: 0.25;
  transform: scale(1.05);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
  transition: all 0.3s ease;
}

.card-description {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  opacity: 0.9;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.card-link svg {
  transition: transform 0.3s ease;
}

.feature-card:hover .card-link {
  color: var(--color-secondary);
}

.feature-card:hover .card-link svg {
  transform: translateX(4px);
}

.card-decoration {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--color-primary-rgb), 0.1) 0%, transparent 70%);
  filter: blur(20px);
  z-index: 1;
  opacity: 0;
  transition: all 0.6s ease;
}

.feature-card:hover .card-decoration {
  opacity: 1;
  transform: scale(1.2);
}

/* Individual card styling */
.feature-card:nth-child(1) .icon-bg,
.feature-card:nth-child(1) .card-decoration {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}

.feature-card:nth-child(2) .icon-bg,
.feature-card:nth-child(2) .card-decoration {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-tertiary));
}

.feature-card:nth-child(3) .icon-bg,
.feature-card:nth-child(3) .card-decoration {
  background: linear-gradient(135deg, var(--color-tertiary), var(--color-primary));
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-tertiary));
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, var(--color-tertiary), var(--color-primary));
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

.features {
  padding: var(--spacing-3xl) 0;
  background-color: var(--color-surface);
}

.features-title {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1000px;
  margin: 0 auto;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  position: relative;
}

.feature-icon div {
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: var(--radius-md);
}

.icon-web {
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

.icon-brand {
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

.icon-strategy {
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M9 11H7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h5v-2z'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-display-medium);
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .gradient-orb {
    filter: blur(40px);
  }
}
</style>

