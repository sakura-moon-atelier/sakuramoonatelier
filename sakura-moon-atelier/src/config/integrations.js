/**
 * INTEGRATIONS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * All third-party service IDs and endpoints.
 * Never hardcode these in components.
 *
 * Setup:
 *   1. Copy .env.example to .env.local
 *   2. Fill in your real IDs
 *   3. Never commit .env.local to git
 * ─────────────────────────────────────────────────────────────────
 */

export const INTEGRATIONS = {
  /**
   * Formspree — contact form submissions
   * Get your form ID at https://formspree.io
   * Format: 'xrgvkzwb' (8-character ID, no URL prefix)
   */
  formspree: import.meta.env.VITE_FORMSPREE_ID ?? null,

  /**
   * Mailchimp — newsletter subscriptions
   * Get your action URL from Mailchimp → Audience → Signup Forms → Embedded forms
   * Format: 'https://your-list.us1.list-manage.com/subscribe/post?u=xxx&id=yyy'
   */
  mailchimp: import.meta.env.VITE_MAILCHIMP_URL ?? null,

  /**
   * Sentry — error monitoring
   * Get your DSN at https://sentry.io
   * Format: 'https://xxx@yyy.ingest.sentry.io/zzz'
   */
  sentry: import.meta.env.VITE_SENTRY_DSN ?? null,

  /**
   * Google Analytics — traffic analytics (optional)
   * Format: 'G-XXXXXXXXXX'
   */
  ga: import.meta.env.VITE_GA_ID ?? null,
}

/**
 * Returns true if a required integration is not yet configured.
 * Use in Debug page to surface missing setup.
 */
export const getMissingIntegrations = () => {
  const required = { formspree: INTEGRATIONS.formspree, mailchimp: INTEGRATIONS.mailchimp }
  return Object.entries(required)
    .filter(([, v]) => !v)
    .map(([k]) => k)
}
