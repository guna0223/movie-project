# 🎬 Movie Explorer

A modern, responsive web application for browsing movies and TV shows, built with React 18 and Vite. Search titles in real-time, view detailed information, and manage your favorites list with persistent storage.

![Movie Explorer Banner](./frontend/public/bg-images/bg-movie-app.jpeg)

---

## 📋 Project Overview

Movie Explorer is a full-featured frontend application that connects to The Movie Database (TMDB) API to provide users with an immersive way to discover and explore movies and television shows. The application offers a clean, dark-themed interface with smooth navigation and responsive design that works seamlessly across all devices.

This project demonstrates modern React development practices including functional components, hooks, Context API for state management, and API integration patterns. It serves as an excellent portfolio piece for showcasing frontend development skills while providing genuine utility for movie enthusiasts.

The application handles API rate limiting gracefully, caches frequently accessed data, and provides immediate user feedback through loading states and error handling. LocalStorage integration ensures users can maintain their favorites collection across browser sessions without requiring authentication or backend persistence.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| **🎥 Movie Browsing** | Browse trending, popular, and top-rated movies with infinite scroll pagination |
| **📺 TV Shows** | Dedicated section for exploring television series with detailed information |
| **🔍 Real-time Search** | Instant search functionality that filters movies and TV shows as you type |
| **⭐ Favorites Management** | Add and remove titles to your favorites list with persistent LocalStorage storage |
| **📄 Detailed Pages** | Comprehensive movie and TV show information including cast, overview, ratings, and release dates |
| **🌙 Dark Theme** | Beautiful dark-themed UI that's easy on the eyes and perfect for media consumption |
| **📱 Responsive Design** | Fully responsive layout that adapts to desktop, tablet, and mobile screens |

### Technical Features

- **React 18** with functional components and hooks for modern, efficient rendering
- **Context API** for global state management without external libraries like Redux
- **Vite** for lightning-fast development server and optimized production builds
- **TMDB API Integration** with structured service layer for maintainable code
- **CSS Custom Properties** for consistent theming and easy style updates
- **Flexbox and CSS Grid** for modern, flexible layouts
- **Component-based Architecture** for reusable and maintainable code
- **Error Handling** with graceful fallbacks and user-friendly error messages
- **Loading States** with skeleton loaders and spinners for better UX

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building the component-based interface |
| **Vite** | Next-generation frontend tooling for fast development and building |
| **JavaScript (ES6+)** | Modern JavaScript features including arrow functions, destructuring, and async/await |
| **CSS3** | Styling with Flexbox, Grid, and custom properties |
| **Context API** | Built-in React state management solution |
| **TMDB API** | External API for movie and TV show data |
| **LocalStorage** | Browser storage for persisting favorites across sessions |
| **ESLint** | Code linting for maintaining code quality and consistency |

---

## 📁 Project Structure

```
movieproject/
├── frontend/
│   ├── public/
│   │   ├── bg-images/           # Background images and assets
│   │   ├── logo/                # Application logos
│   │   ├── logo-met-one.png
│   │   ├── logo-met.jpg
│   │   └── nav-logo/            # Navigation bar logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Css/             # Shared CSS styles
│   │   │   │   ├── App.css
│   │   │   │   ├── Favorite.css
│   │   │   │   ├── Footer.css
│   │   │   │   ├── index.css
│   │   │   │   ├── MovieCard.css
│   │   │   │   ├── MovieDetails.css
│   │   │   │   ├── Navbar.css
│   │   │   │   ├── TvShows.css
│   │   │   │   └── TvShowsDetails.css
│   │   │   ├── Footer/          # Footer component
│   │   │   │   └── Footer.jsx
│   │   │   ├── MovieCard/       # Reusable movie/TV card component
│   │   │   │   └── MovieCard.jsx
│   │   │   ├── Moviedetails/    # Movie details page component
│   │   │   │   └── MovieDetails.jsx
│   │   │   ├── Navbar/          # Navigation bar component
│   │   │   │   └── Navbar.jsx
│   │   │   └── TvShowsDetails/  # TV show details page component
│   │   │       └── TvShowsDetails.jsx
│   │   ├── contexts/
│   │   │   └── MovieContext.jsx # Global state management
│   │   ├── pages/
│   │   │   ├── Favorite.jsx     # Favorites page
│   │   │   ├── Home.jsx         # Home/browse page
│   │   │   └── TvShows.jsx      # TV shows browsing page
│   │   ├── services/
│   │   │   └── api.js           # TMDB API service layer
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.0 or higher) - Download from [nodejs.org](https://nodejs.org)
- **npm** or **yarn** - Comes bundled with Node.js

You will also need a **TMDB API Key** to access movie and TV show data. Instructions for obtaining one are provided in the API Configuration section below.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/movieproject.git
   cd movieproject
   ```

2. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

   This command installs all required dependencies defined in the `package.json` file. The process may take a few minutes on the first run as npm downloads and caches the packages.

4. **Configure Environment Variables**

   Create a `.env` file in the `frontend` directory:

   ```bash
   touch .env
   ```

   Add your TMDB API key:

   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_API_BASE_URL=https://api.themoviedb.org/3
   VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`. The server supports hot module replacement (HMR), so changes to your code will automatically reflect in the browser without requiring a full reload.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment to any static hosting service.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 🔧 API Configuration

### Obtaining a TMDB API Key

1. Create a free account at [The Movie Database](https://www.themoviedb.org/)
2. Navigate to Settings > API in your account dashboard
3. Request an API key by filling in the required information
4. Copy your API key once approved (approval is usually instant for personal use)

### API Endpoints Used

The application uses the following TMDB API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/movie/popular` | GET | Fetch popular movies |
| `/movie/top_rated` | GET | Fetch top-rated movies |
| `/movie/now_playing` | GET | Fetch now playing movies |
| `/trending/all/week` | GET | Fetch trending content |
| `/search/multi` | GET | Search movies and TV shows |
| `/movie/{movie_id}` | GET | Get movie details |
| `/tv/{tv_id}` | GET | Get TV show details |
| `/movie/{movie_id}/similar` | GET | Get similar movies |
| `/tv/{tv_id}/similar` | GET | Get similar TV shows |

### Environment Variables

Configure the following environment variables in your `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_KEY` | Your TMDB API key | `abc123def456...` |
| `VITE_API_BASE_URL` | Base URL for TMDB API | `https://api.themoviedb.org/3` |
| `VITE_IMAGE_BASE_URL` | Base URL for image CDN | `https://image.tmdb.org/t/p/w500` |

---

## 📊 State Management

### Context API Implementation

The application uses React's built-in Context API for global state management, specifically for managing the favorites collection. This approach eliminates the need for external state management libraries while providing a clean, predictable state architecture.

#### MovieContext (`src/contexts/MovieContext.jsx`)

The `MovieContext` provides the following functionality:

```javascript
// Context provides:
- favorites: Array of favorite movies/TV shows
- addToFavorites(movie): Add a title to favorites
- removeFromFavorites(movieId): Remove a title from favorites
- isFavorite(movieId): Check if a title is in favorites
- toggleFavorite(movie): Toggle favorite status
```

#### Usage Example

```jsx
import { useMovieContext } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  
  const isFav = isFavorite(movie.id);
  
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <button onClick={() => isFav ? removeFromFavorites(movie.id) : addToFavorites(movie)}>
        {isFav ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
```

### LocalStorage Integration

Favorites are persisted to LocalStorage automatically, ensuring data survives browser refreshes and sessions. The context handles all LocalStorage operations internally:

- **Loading**: Favorites are loaded from LocalStorage on application mount
- **Saving**: Any change to favorites immediately syncs to LocalStorage
- **Persistence**: Data remains available even after closing the browser

---

## 📱 Responsive Design

The application implements a mobile-first responsive design approach using CSS Flexbox and Grid layouts. The interface adapts seamlessly across device sizes.

### Breakpoints

| Breakpoint | Device Type | Grid Columns |
|------------|-------------|--------------|
| < 480px | Mobile | 1 column |
| 480px - 768px | Large Mobile / Small Tablet | 2 columns |
| 768px - 1024px | Tablet | 3 columns |
| 1024px - 1200px | Small Laptop | 4 columns |
| > 1200px | Desktop | 5 columns |

### CSS Techniques

- **CSS Custom Properties**: Used for consistent theming with `--primary-color`, `--background-color`, and other design tokens
- **Flexbox**: Navigation, card layouts, and alignment-dependent components
- **CSS Grid**: Main content area and responsive card grids
- **Media Queries**: Responsive adjustments for typography, spacing, and layout
- **Relative Units**: `rem`, `em`, `%`, and `vw/vh` for scalable design

### Mobile Optimizations

- Touch-friendly button sizes (minimum 44x44px)
- Optimized image loading with lazy loading
- Streamlined navigation for mobile users
- Swipe-friendly card interactions

---

## 🤝 Contributing

Contributions are welcome! Whether you want to fix a bug, add a new feature, or improve documentation, your help is appreciated.

### How to Contribute

1. **Fork the Repository**

   Click the "Fork" button at the top right of this repository page to create your own fork.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOURUSERNAME/movieproject.git
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/amazing-new-feature
   ```

4. **Make Your Changes**

   Implement your feature or fix, ensuring code quality and consistency.

5. **Test Your Changes**

   Run the application and verify your changes work correctly.

6. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add amazing new feature"
   ```

7. **Push to GitHub**

   ```bash
   git push origin feature/amazing-new-feature
   ```

8. **Submit a Pull Request**

   Open a pull request from your branch to the main repository with a clear description of your changes.

### Coding Standards

- Follow ESLint configuration for code style
- Use meaningful variable and function names
- Write comments for complex logic
- Keep components small and focused
- Use functional components with hooks
- Maintain consistent formatting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License grants permission to use, copy, modify, merge, publish, distribute, sublicense, and sell the software, subject to the condition that the copyright notice and permission notice appear in all copies or substantial portions of the software.

---

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing an excellent API with comprehensive movie and TV show data
- **React Team** for creating and maintaining the React library
- **Vite Team** for the fantastic build tooling and development experience
- **Open Source Community** for the countless libraries and tools that make modern web development possible
- **Contributors** who have taken time to improve this project

---

## 📞 Support

If you have questions or need help, please open an issue on the GitHub repository or reach out to the maintainers.

---

**Built with ❤️ using React and Vite**

