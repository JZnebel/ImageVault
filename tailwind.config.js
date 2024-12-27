module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  darkMode: 'class', // Enables dark mode based on the 'dark' class
  theme: {
    extend: {
      colors: {
        'dark-bg': '#2d3748', // Dark background color
        'dark-text': '#e2e8f0', // Light text color
        'dark-border': '#4a5568', // Darker border color
        'btn-hover': '#2b6cb0', // Darker hover color for buttons
        'link-hover': '#4299e1' // Darker hover color for links
      },
    },
  },
  plugins: [],
}
