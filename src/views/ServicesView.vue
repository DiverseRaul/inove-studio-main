<template>
  <div class="services-page">
    <!-- Hero -->
    <section class="services-hero">
      <div class="container">
        <span class="hero-eyebrow">Services</span>
        <h1 class="hero-heading">What We <span class="gradient-text">Offer</span></h1>
        <p class="hero-desc">End-to-end digital solutions to help your business stand out, grow, and succeed in the modern world.</p>
      </div>
      <div class="hero-bg">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
      </div>
    </section>

    <!-- Services Detail -->
    <section class="services-detail">
      <div class="container">
        <div 
          v-for="(service, index) in services" 
          :key="service.id" 
          class="service-block"
          :class="{ 'service-reversed': index % 2 !== 0 }"
        >
          <div class="service-text">
            <span class="service-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <h2 class="service-heading">{{ service.title }}</h2>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ feature }}
              </li>
            </ul>
            <router-link to="/contact" class="service-cta">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </router-link>
          </div>
          <div class="service-visual">
            <div class="visual-card" v-html="service.icon"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section">
      <div class="container">
        <div class="section-header-center">
          <span class="section-eyebrow">Pricing</span>
          <h2 class="section-heading">Simple, Transparent Pricing</h2>
          <p class="section-sub">Choose a plan that fits your needs. All plans include our full attention and dedication.</p>
        </div>

        <div class="pricing-grid">
          <div v-for="plan in plans" :key="plan.name" class="pricing-card" :class="{ 'pricing-featured': plan.featured }">
            <div v-if="plan.featured" class="pricing-badge">Most Popular</div>
            <h3 class="pricing-name">{{ plan.name }}</h3>
            <div class="pricing-price">
              <span class="price-amount">{{ plan.price }}</span>
              <span class="price-period" v-if="plan.period">{{ plan.period }}</span>
            </div>
            <p class="pricing-desc">{{ plan.description }}</p>
            <ul class="pricing-features">
              <li v-for="f in plan.features" :key="f">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
            <router-link to="/contact" class="pricing-btn" :class="{ 'pricing-btn-primary': plan.featured }">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="services-cta">
      <div class="container">
        <div class="cta-card">
          <h2 class="cta-heading">Not sure which service you need?</h2>
          <p class="cta-desc">Let's chat! We'll help you figure out the best approach for your project.</p>
          <router-link to="/contact" class="cta-btn">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    title: 'Web Design & Development',
    description: 'We create stunning, high-performance websites that are tailored to your brand. From landing pages to full-scale web applications, we handle the entire process.',
    features: [
      'Responsive design for all devices',
      'SEO-optimized structure',
      'Fast loading & performance-focused',
      'Custom CMS integration',
      'Analytics & tracking setup'
    ],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
  },
  {
    id: 2,
    title: 'Brand Identity',
    description: 'Your brand is more than a logo — it\'s the feeling people get when they interact with your business. We craft cohesive visual identities that resonate.',
    features: [
      'Logo design & variations',
      'Color palette & typography',
      'Brand guidelines document',
      'Social media assets',
      'Business card & stationery design'
    ],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    id: 3,
    title: 'AI Solutions',
    description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create smarter products. We build custom AI integrations tailored to your needs.',
    features: [
      'Custom chatbots & assistants',
      'Data analysis & automation',
      'AI-powered content generation',
      'Machine learning integration',
      'API development & integration'
    ],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'
  }
])

const plans = ref([
  {
    name: 'Starter',
    price: '$999',
    period: '/ project',
    description: 'Perfect for small businesses and personal projects.',
    features: ['Single page website', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '1 revision round'],
    featured: false
  },
  {
    name: 'Professional',
    price: '$2,999',
    period: '/ project',
    description: 'For growing businesses that need a strong digital presence.',
    features: ['Multi-page website (up to 5)', 'Custom design', 'Advanced SEO', 'CMS integration', '3 revision rounds', '30-day support'],
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-scale solutions for complex requirements.',
    features: ['Unlimited pages', 'Custom web application', 'AI integration', 'Priority support', 'Unlimited revisions', 'Ongoing maintenance'],
    featured: false
  }
])
</script>

<style scoped>
.services-page {
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
.services-hero {
  position: relative;
  padding: 12rem 0 5rem;
  text-align: center;
  overflow: hidden;
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

.hero-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  max-width: 550px;
  margin: 0 auto;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
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
  right: 10%;
}

.hero-orb-2 {
  width: 300px;
  height: 300px;
  background: var(--color-secondary);
  bottom: 10%;
  left: 15%;
}

/* ========== SERVICE BLOCKS ========== */
.services-detail {
  padding: 4rem 0;
  background: var(--color-surface);
}

.service-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.service-block:last-child {
  border-bottom: none;
}

.service-block.service-reversed {
  direction: rtl;
}

.service-block.service-reversed > * {
  direction: ltr;
}

.service-num {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  display: block;
}

.service-heading {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.service-description {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.service-features li svg {
  color: var(--color-secondary);
  flex-shrink: 0;
}

.service-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.service-cta:hover {
  gap: 0.75rem;
  color: var(--color-secondary);
}

.service-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-card {
  width: 200px;
  height: 200px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-secondary-rgb), 0.05));
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all 0.4s ease;
}

.visual-card:hover {
  transform: scale(1.05);
  border-color: rgba(var(--color-primary-rgb), 0.25);
  box-shadow: 0 20px 60px rgba(var(--color-primary-rgb), 0.1);
}

/* ========== PRICING ========== */
.pricing-section {
  padding: 6rem 0;
  background: var(--color-background);
}

.section-header-center {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3.5rem;
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

.section-heading {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-sub {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.pricing-card {
  position: relative;
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.pricing-featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary), 0 10px 40px rgba(var(--color-primary-rgb), 0.15);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.pricing-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
}

.price-period {
  font-size: 0.9rem;
  color: var(--color-text-tertiary);
}

.pricing-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.pricing-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.pricing-features li svg {
  color: var(--color-secondary);
  flex-shrink: 0;
}

.pricing-btn {
  display: block;
  text-align: center;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: var(--color-primary);
  border: 1px solid rgba(var(--color-primary-rgb), 0.15);
}

.pricing-btn:hover {
  background: rgba(var(--color-primary-rgb), 0.15);
  transform: translateY(-2px);
}

.pricing-btn-primary {
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 6px 20px rgba(var(--color-primary-rgb), 0.3);
}

.pricing-btn-primary:hover {
  box-shadow: 0 10px 30px rgba(var(--color-primary-rgb), 0.4);
}

/* ========== CTA ========== */
.services-cta {
  padding: 6rem 0;
  background: var(--color-surface);
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
  max-width: 500px;
  margin: 0 auto 2rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf);
  color: white;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(var(--color-primary-rgb), 0.3);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(var(--color-primary-rgb), 0.4);
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .service-block {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .service-block.service-reversed {
    direction: ltr;
  }
  .service-visual {
    order: -1;
  }
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .services-hero {
    padding: 9rem 0 3rem;
  }
  .hero-heading {
    font-size: 2.25rem;
  }
  .visual-card {
    width: 150px;
    height: 150px;
  }
  .cta-card {
    padding: 3rem 1.5rem;
  }
}
</style>

