<template>
  <div class="home">
    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="container hero-container">
        <div class="hero-content" data-aos="fade-up">
          <h1 class="hero-title">
            Crafting digital <br />
            <span class="text-accent">experiences.</span>
          </h1>
          <p class="hero-subtitle">
            We are a creative studio specializing in sleek, modern web design and interactive digital products. Explore our selected works below.
          </p>
          <div class="hero-actions">
            <a href="#portfolio" class="hero-btn-primary">
              View Our Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
      <!-- Subtle background grid -->
      <div class="hero-background">
        <div class="grid-overlay"></div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="portfolio-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Portfolio</h2>
          <p class="section-subtitle">A curated selection of digital products, websites, and platforms.</p>
        </div>

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

    <!-- About Section -->
    <section id="about" class="about-section">
      <div class="container">
        <div class="mission-grid" data-aos="fade-up">
          <div class="mission-text">
            <h2 class="section-title">About Us</h2>
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

        <div class="tech-stack-container" data-aos="fade-up">
          <h3 class="sub-heading">Tools & Technologies</h3>
          <div class="tech-grid">
            <div v-for="tech in techStack" :key="tech.name" class="tech-item">
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Contact</h2>
          <p class="section-subtitle">Have a question or want to discuss a project? Reach out below.</p>
        </div>

        <div class="contact-grid">
          <div class="contact-form-wrapper" data-aos="fade-right">
            <form @submit.prevent="HandleSubmit" class="contact-form" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">Full Name</label>
                  <input 
                    id="name"
                    v-model="Form.Name" 
                    type="text" 
                    class="form-input" 
                    :class="{ 'input-error': Errors.Name }"
                    placeholder="Your name"
                    @blur="ValidateField('Name')"
                  />
                  <span v-if="Errors.Name" class="error-msg">{{ Errors.Name }}</span>
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    id="email"
                    v-model="Form.Email" 
                    type="email" 
                    class="form-input"
                    :class="{ 'input-error': Errors.Email }"
                    placeholder="you@example.com"
                    @blur="ValidateField('Email')"
                  />
                  <span v-if="Errors.Email" class="error-msg">{{ Errors.Email }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">Subject</label>
                <select 
                  id="subject"
                  v-model="Form.Subject" 
                  class="form-input form-select"
                  :class="{ 'input-error': Errors.Subject }"
                  @blur="ValidateField('Subject')"
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Project Proposal">Project Proposal</option>
                  <option value="Other">Other</option>
               </select>
                <span v-if="Errors.Subject" class="error-msg">{{ Errors.Subject }}</span>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea 
                  id="message"
                  v-model="Form.Message" 
                  class="form-input form-textarea"
                  :class="{ 'input-error': Errors.Message }"
                  placeholder="Tell us about your project..."
                  rows="5"
                  @blur="ValidateField('Message')"
                ></textarea>
                <span v-if="Errors.Message" class="error-msg">{{ Errors.Message }}</span>
              </div>

              <button type="submit" class="submit-btn" :disabled="IsSubmitting">
                <span v-if="!IsSubmitting" class="btn-content">
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </span>
                <span v-else class="btn-content">
                  <span class="spinner"></span>
                  Sending...
                </span>
              </button>

              <div v-if="Submitted" class="success-msg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Message sent successfully! We'll get back to you soon.
              </div>
            </form>
          </div>

          <div class="contact-info" data-aos="fade-left">
            <div class="info-card">
              <h3 class="info-title">Contact Information</h3>
              <p class="info-desc">Feel free to reach out directly through email.</p>
              
              <div class="info-items">
                <a href="mailto:contact@inove.studio" class="info-item">
                  <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <span class="info-label">Email</span>
                    <span class="info-value">contact@inove.studio</span>
                  </div>
                </a>

                <div class="info-item">
                  <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                  <div>
                    <span class="info-label">Website</span>
                    <span class="info-value">inove.studio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';

/* PORTFOLIO LOGIC */
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

/* ABOUT LOGIC */
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
  { name: 'Firebase' }
])

/* CONTACT LOGIC */
const Form = reactive({
  Name: '',
  Email: '',
  Subject: '',
  Message: ''
})

const Errors = reactive({
  Name: '',
  Email: '',
  Subject: '',
  Message: ''
})

const IsSubmitting = ref(false)
const Submitted = ref(false)

const ValidateField = (FieldIdentifier) => {
  Errors[FieldIdentifier] = ''
  
  if (FieldIdentifier === 'Name' && !Form.Name.trim()) {
    Errors.Name = 'Name is required'
  }
  if (FieldIdentifier === 'Email') {
    if (!Form.Email.trim()) {
      Errors.Email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Form.Email)) {
      Errors.Email = 'Please enter a valid email'
    }
  }
  if (FieldIdentifier === 'Subject' && !Form.Subject) {
    Errors.Subject = 'Please select a subject'
  }
  if (FieldIdentifier === 'Message' && !Form.Message.trim()) {
    Errors.Message = 'Message is required'
  }
}

const ValidateAll = () => {
  ValidateField('Name')
  ValidateField('Email')
  ValidateField('Subject')
  ValidateField('Message')
  return !Errors.Name && !Errors.Email && !Errors.Subject && !Errors.Message
}

const HandleSubmit = async () => {
  if (!ValidateAll()) return

  IsSubmitting.value = true
  Submitted.value = false

  try {
    const EmailJsUrl = 'https://api.emailjs.com/api/v1.0/email/send'
    
    const PayloadData = {
      service_id: 'service_ys62pml',
      template_id: 'template_e85f14o',
      user_id: 'az6wAqXHiMcv3cmyy',
      template_params: {
        Name: Form.Name,
        Email: Form.Email,
        Subject: Form.Subject,
        Message: Form.Message
      }
    }

    const FetchResponse = await fetch(EmailJsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(PayloadData)
    })

    if (!FetchResponse.ok) {
      const ErrorText = await FetchResponse.text()
      throw new Error(ErrorText)
    }

    IsSubmitting.value = false
    Submitted.value = true

    Form.Name = ''
    Form.Email = ''
    Form.Subject = ''
    Form.Message = ''
  } catch (SubmitError) {
    console.error('EmailJS Error:', SubmitError)
    IsSubmitting.value = false
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: var(--color-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ========== HERO ========== */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 90vh;
  padding: 6rem 0;
  overflow: hidden;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  color: var(--color-text);
  font-family: var(--font-family-display);
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.text-accent {
  color: var(--color-text-secondary);
  font-style: italic;
  font-weight: 300;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  background: var(--color-text);
  color: var(--color-background);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
}

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
  mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 80%);
}

/* Shared Sections */
.section-header {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

/* ========== PORTFOLIO ========== */
.portfolio-section {
  padding: 6rem 0;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
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

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.portfolio-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

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

/* ========== ABOUT ========== */
.about-section {
  padding: 6rem 0;
  background: var(--color-surface-container-low);
  border-top: 1px solid var(--color-outline-variant);
  border-bottom: 1px solid var(--color-outline-variant);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
}

.mission-statement {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-top: 1.5rem;
  padding-left: 1.5rem;
  border-left: 3px solid var(--color-text);
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
  border: 1px solid var(--color-outline-variant);
  border-radius: 16px;
  padding: 1.5rem 2rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  min-width: 80px;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.sub-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-item {
  background: var(--color-surface-container);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.tech-item:hover {
  border-color: var(--color-text-secondary);
}

.tech-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
}

/* ========== CONTACT ========== */
.contact-section {
  padding: 6rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: start;
}

.contact-form-wrapper {
  background: var(--color-surface-container);
  border: 1px solid var(--color-outline-variant);
  border-radius: 20px;
  padding: 2.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-input {
  background: var(--color-background);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  color: var(--color-text);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
}

.form-input:focus {
  border-color: var(--color-text);
}

.input-error {
  border-color: #ef4444 !important;
}

.error-msg {
  font-size: 0.8rem;
  color: #ef4444;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2rem;
  background: var(--color-text);
  color: var(--color-background);
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: var(--color-background);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  color: #81c784;
  font-size: 0.9rem;
  font-weight: 500;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.info-card {
  background: var(--color-surface-container);
  border: 1px solid var(--color-outline-variant);
  border-radius: 20px;
  padding: 2rem;
}

.info-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.info-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-surface-variant);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}

.info-label {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  margin-bottom: 0.1rem;
}

.info-value {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .mission-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 0 4rem;
  }
  .hero-title {
    font-size: 3rem;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
