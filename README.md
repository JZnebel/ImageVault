# Image Vault

Image Vault is a Rails 7 application that allows users to search, select, and manage stock images. Administrators can manage users, projects, and view images tied to specific users or projects. The application uses modern tools like Tailwind CSS for styling and Devise for authentication.

## Features

- **User Authentication**: Managed using Devise for secure login and user management.
- **Image Search**: Search stock images using integrated APIs.
- **Image Selection**: Select and save images tied to a user and their project.
- **Admin Features**: Manage users, projects, and view selected images.
- **Modern Styling**: Tailwind CSS provides a responsive and visually appealing design.

## Prerequisites

Ensure you have the following installed:

- Ruby 3.2.2
- Rails 7.1.5
- Node.js (for Tailwind CSS)
- PostgreSQL (for database management)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd image_vault
   ```

2. **Install Dependencies**:
   ```bash
   bundle install
   ```

3. **Setup CSS Bundling**:
   Ensure Node.js is installed, then install Tailwind CSS:
   ```bash
   rails css:install:tailwind
   ```

4. **Setup Environment Variables**:
   Create a `.env` file in the root directory and add your API keys:
   ```plaintext
   STOCK_IMAGE_API_KEY=your_api_key
   ```

5. **Setup the Database**:
   ```bash
   rails db:create db:migrate
   ```

6. **Start the Server**:
   ```bash
   rails server
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Users
- Log in to search and select images.
- View selected images under "My Selected Images" in the navigation bar.

### Admins
- Log in to access administrative tools:
  - Manage users and projects.
  - View all images tied to users and projects.


## Technologies Used

- **Rails 7**: Framework for building the application.
- **Devise**: User authentication.
- **Tailwind CSS**: Styling and responsiveness.
- **PostgreSQL**: Database management.
- **HTTParty**: For API requests to fetch stock images.
- **dotenv-rails**: Manage environment variables.
- **Turbo Rails**: Enhanced responsiveness and SPA-like behavior.

