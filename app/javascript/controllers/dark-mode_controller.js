import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon"]

  connect() {
    const isDarkMode = document.documentElement.classList.contains("dark")
    this.updateDarkMode(isDarkMode)
  }

  toggle() {
    const isDarkModeEnabled = document.documentElement.classList.toggle("dark")
    this.updateDarkMode(isDarkModeEnabled)
    document.cookie = `dark_mode=${isDarkModeEnabled}; path=/`
  }

  updateDarkMode(isDark) {
    document.documentElement.classList.toggle("dark", isDark)
    if (this.hasIconTarget) {
      this.iconTarget.textContent = isDark ? "☀️" : "🌙"
    }
  }

  getCookie(name) {
    const cookieArr = document.cookie.split(";")
    for (let i = 0; i < cookieArr.length; i++) {
      const cookie = cookieArr[i].trim()
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1)
      }
    }
    return null
  }
}
  
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon"]

  connect() {
    const isDarkMode = document.documentElement.classList.contains("dark")
    this.updateDarkMode(isDarkMode)
  }

  toggle() {
    const isDarkMode = document.documentElement.classList.contains("dark")
    this.updateDarkMode(!isDarkMode)
    
    // Set cookie to persist the preference
    document.cookie = `dark_mode=${!isDarkMode}; path=/; max-age=31536000` // 1 year
  }

  updateDarkMode(isDark) {
    document.documentElement.classList.toggle("dark", isDark)
    this.iconTarget.textContent = isDark ? "☀️" : "🌙"
  }
}
