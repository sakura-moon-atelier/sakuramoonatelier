/**
 * Merge class names, filtering falsy values.
 * Lightweight alternative to clsx for this project's needs.
 * @param {...(string|undefined|null|false)} classes
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format an email address for display (obfuscates bots).
 */
export function obfuscateEmail(user, domain) {
  return `${user}@${domain}`
}

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} ms
 */
export function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
