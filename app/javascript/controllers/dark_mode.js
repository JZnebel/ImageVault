// Function to read the value of a cookie by its name
function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      const cookie = cookieArr[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  
  // Turbo:load event to ensure JavaScript runs after Turbo page navigation
  document.addEventListener("turbo:load", function () {
    const darkModeButton = document.getElementById("dark-mode-toggle");
    const darkModeIcon = document.getElementById("dark-mode-icon");
  
    // Check if dark mode preference is stored in cookies
    const darkModeCookie = getCookie("dark_mode");
    if (darkModeCookie === "true") {
      document.documentElement.classList.add("dark");
      darkModeIcon.textContent = "☀️"; // Sun icon for dark mode
    } else {
      document.documentElement.classList.remove("dark");
      darkModeIcon.textContent = "🌙"; // Moon icon for light mode
    }
  
    // Event listener for dark mode toggle
    if (darkModeButton) {
      darkModeButton.addEventListener("click", function () {
        const isDarkModeEnabled = document.documentElement.classList.toggle("dark");
        darkModeIcon.textContent = isDarkModeEnabled ? "☀️" : "🌙";
        document.cookie = `dark_mode=${isDarkModeEnabled}; path=/`;
      });
    }
  });
  