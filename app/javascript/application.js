// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// Enable Rails UJS for `data-method` and `data-confirm`
import Rails from "@rails/ujs";
Rails.start();

// Import custom controllers
import "dark_mode";
import "stock_images";
import "notes";
