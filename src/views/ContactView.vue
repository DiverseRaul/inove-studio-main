<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container">
        <div class="hero-content">
          <span class="hero-eyebrow">Contact</span>
          <h1 class="hero-heading">Let's Work <span class="gradient-text">Together</span></h1>
          <p class="hero-description">Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>
      </div>
      <div class="hero-bg">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrapper">
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
                  <option value="Web Design">Web Design & Development</option>
                  <option value="AI Solutions">AI Solutions</option>
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
                  rows="6"
                  @blur="ValidateField('Message')"
                ></textarea>
                <span v-if="Errors.Message" class="error-msg">{{ Errors.Message }}</span>
              </div>

              <div class="form-group">
                <label for="budget" class="form-label">Budget Range <span class="optional">(optional)</span></label>
                <select id="budget" v-model="Form.Budget" class="form-input form-select">
                  <option value="" disabled>Select budget range</option>
                  <option value="< $500">Less than $500</option>
                  <option value="$500 - $2,000">$500 - $2,000</option>
                  <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
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

          <div class="contact-info">
            <div class="info-card">
              <h3 class="info-title">Get in Touch</h3>
              <p class="info-desc">Prefer to reach out directly? Here's how you can contact us.</p>
              
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

                <div class="info-item">
                  <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <span class="info-label">Response Time</span>
                    <span class="info-value">Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="faq-card">
              <h3 class="info-title">FAQ</h3>
              <div class="faq-list">
                <div v-for="FaqItem in Faqs" :key="FaqItem.Question" class="faq-item" @click="FaqItem.Open = !FaqItem.Open">
                  <div class="faq-question">
                    <span>{{ FaqItem.Question }}</span>
                    <svg :class="{ 'faq-open': FaqItem.Open }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  <div class="faq-answer" v-show="FaqItem.Open">{{ FaqItem.Answer }}</div>
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
import { ref, reactive } from 'vue'

const Form = reactive({
  Name: '',
  Email: '',
  Subject: '',
  Message: '',
  Budget: ''
})

const Errors = reactive({
  Name: '',
  Email: '',
  Subject: '',
  Message: ''
})

const IsSubmitting = ref(false)
const Submitted = ref(false)

const Faqs = ref([
  { Question: 'How long does a typical project take?', Answer: 'Most projects take 1-6 weeks depending on scope and complexity. We\'ll give you a clear timeline during the discovery phase.', Open: false },
  { Question: 'What is your pricing model?', Answer: 'We offer project-based pricing tailored to your needs. After our initial discussion, we\'ll provide a detailed quote.', Open: false },
  { Question: 'Do you offer ongoing support?', Answer: 'Yes! We provide maintenance and support to keep your project running after launch.', Open: false }
])

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
        Message: Form.Message,
        Budget: Form.Budget
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
    Form.Budget = ''
  } catch (SubmitError) {
    console.error('EmailJS Error:', SubmitError)
    IsSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  color: var(--color-text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ========== HERO ========== */
.contact-hero {
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

/* ========== CONTACT CONTENT ========== */
.contact-content {
  padding: 4rem 0 6rem;
  background: var(--color-surface);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: start;
}

/* ========== FORM ========== */
.contact-form-wrapper {
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
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
  letter-spacing: 0.02em;
}

.optional {
  font-weight: 400;
  color: var(--color-text-tertiary);
}

.form-input {
  background: var(--color-background);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  color: var(--color-text);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
}

.form-input::placeholder {
  color: var(--color-text-tertiary);
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

.input-error {
  border-color: var(--color-error) !important;
}

.error-msg {
  font-size: 0.8rem;
  color: var(--color-error);
  margin-top: 0.1rem;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  cursor: pointer;
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
  background: linear-gradient(135deg, var(--color-primary), #7c5cbf);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(var(--color-primary-rgb), 0.3);
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(var(--color-primary-rgb), 0.4);
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
  border-top-color: white;
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
  padding: 1rem 1.25rem;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  color: #81c784;
  font-size: 0.9rem;
  font-weight: 500;
}

/* ========== SIDEBAR ========== */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card, .faq-card {
  background: var(--color-surface-container);
  border: 1px solid rgba(255, 255, 255, 0.05);
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
  line-height: 1.7;
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
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.info-item:hover {
  background: rgba(var(--color-primary-rgb), 0.05);
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(var(--color-primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.info-label {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.1rem;
}

.info-value {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

/* FAQ */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.faq-item {
  cursor: pointer;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  transition: background 0.2s ease;
}

.faq-item:hover {
  background: rgba(var(--color-primary-rgb), 0.04);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
}

.faq-question svg {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  color: var(--color-text-tertiary);
}

.faq-question svg.faq-open {
  transform: rotate(180deg);
}

.faq-answer {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-top: 0.5rem;
  padding-left: 0.25rem;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 9rem 0 3rem;
  }
  .hero-heading {
    font-size: 2.25rem;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form-wrapper {
    padding: 1.5rem;
  }
}
</style>

