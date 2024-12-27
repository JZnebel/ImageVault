import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon"]

  connect() {
    const isDarkMode = document.documentElement.classList.contains("dark")
    this.updateDarkMode(isDarkMode)
  }

  toggle() {
    const isDarkMode = document.documentElement.classList.contains("dark")
    const newDarkMode = !isDarkMode
    this.updateDarkMode(newDarkMode)
    
    // Set cookie to persist the preference
    document.cookie = `dark_mode=${newDarkMode}; path=/; max-age=31536000; SameSite=Lax` // 1 year
  }

  updateDarkMode(isDark) {
    document.documentElement.classList.toggle("dark", isDark)
    if (this.hasIconTarget) {
      this.iconTarget.textContent = isDark ? "☀️" : "🌙"
    }
  }
}
