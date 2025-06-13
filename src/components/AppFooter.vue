<template>
  <footer class="app-footer">
    <div class="container">
      <!-- Newsletter Section -->
      <div class="newsletter">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h4 class="newsletter-title">Stay in the Loop</h4>
            <p class="newsletter-description">
              Subscribe to get the latest updates and insights delivered to your inbox.
            </p>
          </div>
          <form class="newsletter-form" @submit.prevent="handleNewsletterSubmit">
            <div class="form-group">
              <input 
                v-model="email"
                type="email" 
                placeholder="Your email address"
                class="email-input"
                required
              >
              <BaseButton 
                type="submit"
                variant="filled"
                color="primary"
                :loading="isSubmitting"
                class="subscribe-btn"
              >
                Subscribe
              </BaseButton>
            </div>
          </form>
        </div>
      </div>

      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <span class="logo-text">inove.<span>studio</span></span>
          <p class="footer-tagline">
            Where innovation meets creativity. Crafting exceptional digital experiences 
            that are designed for you.
          </p>
        </div>

        <!-- Navigation Links -->
        <div class="footer-nav">
          <div class="nav-column">
            <h4 class="nav-title">Navigation</h4>
            <ul class="nav-list">
              <li><RouterLink to="/about" class="nav-link">About</RouterLink></li>
              <li><RouterLink to="/services" class="nav-link">Services</RouterLink></li>
              <li><RouterLink to="/portfolio" class="nav-link">Portfolio</RouterLink></li>
              <li><RouterLink to="/contact" class="nav-link">Contact</RouterLink></li>
            </ul>
          </div>
          
          <div class="nav-column">
            <h4 class="nav-title">Contact</h4>
            <ul class="nav-list">
              <li class="contact-item">
                <span class="contact-icon">✉️</span>
                <a href="mailto:hello@inove.studio" class="nav-link">hello@inove.studio</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} inove.studio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const email = ref('')
const isSubmitting = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const handleNewsletterSubmit = async () => {
  if (!email.value) return
  
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Show success message (in a real app, you'd handle this properly)
  alert('Thank you for subscribing!')
  email.value = ''
  isSubmitting.value = false
}
</script>

<style scoped>
.app-footer {
  margin-top: var(--spacing-3xl);
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-outline-variant);
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Newsletter Section */
.newsletter {
  background: var(--color-surface);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  padding: var(--spacing-2xl);
  margin: var(--spacing-2xl) auto;
  max-width: 800px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.newsletter-content {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  align-items: center;
  text-align: center;
}

.newsletter-text {
  max-width: 500px;
}

.newsletter-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-on-surface);
  margin: 0 0 var(--spacing-xs);
  line-height: 1.3;
}

.newsletter-description {
  color: var(--color-on-surface-variant);
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

.newsletter-form {
  width: 100%;
  max-width: 500px;
}

.form-group {
  display: flex;
  gap: var(--spacing-sm);
  width: 100%;
}

.email-input {
  flex: 1;
  padding: 0 var(--spacing-md);
  height: 48px;
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-on-surface);
  font-size: 1rem;
}

.email-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
}

.email-input::placeholder {
  color: var(--color-text-tertiary);
  opacity: 0.7;
}

.subscribe-btn {
  padding: 0 var(--spacing-lg);
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.subscribe-btn:hover {
  background-color: var(--color-primary-dark);
}

.subscribe-btn:active {
  transform: translateY(1px);
}

/* Footer Content */
.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  padding: var(--spacing-3xl) 0;
  border-bottom: 1px solid var(--color-outline-variant);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.logo-text {
  color: white;
  font-family: var(--font-family);
  font-size: 1.5rem;
  font-weight: 700;
}

.logo-text span {
  font-weight: 200;
}

.footer-tagline {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 300px;
  margin: 0;
}

/* Navigation */
.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2xl);
}

.nav-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.nav-title {
  font-size: var(--font-size-title-small);
  color: var(--color-on-surface);
  margin: 0 0 var(--spacing-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.nav-link {
  color: var(--color-on-surface-variant);
  text-decoration: none;
  font-size: var(--font-size-body);
  transition: color var(--transition-fast);
  display: inline-block;
  padding: var(--spacing-xs) 0;
}

.nav-link:hover {
  color: var(--color-primary);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-on-surface-variant);
}

.contact-icon {
  font-size: 1.2em;
}

/* Footer Bottom */
.footer-bottom {
  padding: var(--spacing-lg) 0;
  text-align: center;
}

.copyright {
  color: var(--color-text-secondary);
  font-size: var(--font-size-body-small);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
  
  .footer-nav {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .form-group {
    flex-direction: column;
  }
  
  .subscribe-btn {
    width: 100%;
  }
  
  .email-input {
    width: 100%;
  }
}
</style>

