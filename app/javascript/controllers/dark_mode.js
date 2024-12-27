import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "icon"]

  connect() {
    this.updateDarkMode(this.getCookie("dark_mode") === "true")
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
  
