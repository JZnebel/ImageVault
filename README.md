# Image Vault 🖼️

A modern Rails 7 application for searching, managing, and organizing stock images from multiple sources. Built with security and user experience in mind, featuring dark mode support and responsive design.

https://www.youtube.com/watch?v=Y3xGzGOAojE

## ✨ Key Features

- **🔐 Secure Authentication**: Full user authentication system with Devise
- **🔍 Multi-Source Image Search**: Integrated with multiple stock image APIs:
  - Unsplash
  - Pexels
  - Pixabay
- **💾 Image Management**: Save and organize images in your personal vault
- **🌓 Dark Mode**: Full dark mode support with persistent user preference
- **📱 Responsive Design**: Mobile-first approach using Tailwind CSS
- **👥 User Management**: Admin interface for user and project management
- **🔒 Security**: Implemented Content Security Policy (CSP)

## 🛠️ Technical Stack

- **Backend**: Ruby 3.2.2, Rails 7.1.5
- **Frontend**: 
  - Tailwind CSS for styling
  - Stimulus.js for JavaScript interactions
  - Turbo for SPA-like experience
- **Database**: PostgreSQL
- **Authentication**: Devise
- **Security**: Content Security Policy (CSP)
- **Testing**: RSpec (coming soon)

## 📋 Prerequisites

- Ruby 3.2.2
- Rails 7.1.5
- Node.js 18+ and Yarn
- PostgreSQL 14+
- Redis (for Action Cable - coming soon)

## 🚀 Installation

1. **Clone and Setup**:
   ```bash
   git clone https://github.com/yourusername/image-vault.git
   cd image-vault
   bundle install
   yarn install
   ```

2. **Environment Configuration**:
   Create a `.env` file:
   ```
   UNSPLASH_ACCESS_KEY=your_key
   PEXELS_API_KEY=your_key
   PIXABAY_API_KEY=your_key
   ```

3. **Database Setup**:
   ```bash
   rails db:create db:migrate
   rails db:seed  # Creates admin user
   ```

4. **Start the Application**:
   ```bash
   ./bin/dev  # Starts Rails server with CSS/JS watching
   ```

Visit [http://localhost:3000](http://localhost:3000)

## 👤 Default Admin Login

- Email: admin@example.com
- Password: password123

*Remember to change these credentials in production!*

## 🔒 Security Features

- Content Security Policy (CSP) implementation
- CSRF protection
- Secure password handling with Devise
- API key protection
- XSS prevention

## 🎯 Upcoming Features

- [ ] Image tagging and categorization
- [ ] Bulk image operations
- [ ] Advanced search filters
- [ ] API rate limiting
- [ ] User activity logging
- [ ] Image usage analytics
- [ ] Project sharing
- [ ] RSpec test suite

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## 🙏 Acknowledgments

- Stock image providers: Unsplash, Pexels, and Pixabay
- The Ruby on Rails community
- Contributors and users of this project

