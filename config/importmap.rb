# Pin npm packages by running ./bin/importmap
pin "@rails/ujs", to: "@rails--ujs.js" # Custom UJS implementation
pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "dark_mode", to: "controllers/dark_mode.js"
pin "stock_images", to: "controllers/stock_images.js"
pin "notes", to: "controllers/notes.js"
