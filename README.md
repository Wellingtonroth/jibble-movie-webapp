# Jibble Movie WebApp

A modern Vue.js web application for exploring and discovering movies. Built with Vue 3, TypeScript, and Vite.

## 🚀 Features

- Modern and responsive user interface
- Movie search and discovery
- State management with Pinia
- Type-safe development with TypeScript
- Component-based architecture
- Vue Router for navigation
- SASS for styling

## 🛠️ Tech Stack

- **Framework:** Vue.js 3
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Styling:** SASS
- **Testing:**
  - Unit Testing: Vitest
- **Icons:** Iconify

## 📦 Prerequisites

- Node.js (Latest LTS version recommended)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jibble-movie-webapp.git
cd jibble-movie-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/               # Static assets
├── components/modules    # Modules Vue components to connect with views
├── components/shared     # Reusable Vue components
├── composables/          # Vue composables
├── constants/            # Constant values
├── router/               # Vue Router configuration
├── services/             # API services
├── stores/               # Pinia stores
├── types/                # TypeScript type definitions
└── views/                # Page views
```

### 🧪 Unit Testing with Vitest
- Uses Vitest as the testing framework
- Tests are written in TypeScript
- JSDOM environment for DOM testing
- Test files are located in `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
- Run unit tests with:
```bash
npm run test
# or
npm run test-ui
# or
npm run test-cover
# or
npm run test-cover-ui
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
