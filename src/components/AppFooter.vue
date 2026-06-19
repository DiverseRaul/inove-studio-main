<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <span class="logo-text">inove.<span>studio</span></span>
          <p class="footer-tagline">
            Where innovation meets creativity. Crafting exceptional digital experiences 
            that are designed for you.
          </p>
        </div>

        <!-- Contact -->
        <div class="footer-nav">
          <div class="nav-column">
            <h4 class="nav-title">Contact</h4>
            <ul class="nav-list">
              <li class="contact-item">
                <span class="contact-icon">✉️</span>
                <a href="mailto:contact@inove.studio" class="nav-link">contact@inove.studio</a>
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
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
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
  color: var(--color-text);
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
  display: flex;
  justify-content: flex-end;
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
    justify-content: flex-start;
  }
}
</style>
