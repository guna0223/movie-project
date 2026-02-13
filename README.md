# 🎬 Movie Explorer App

A modern, feature-rich movie and TV show browsing web application built with React and Vite. This application provides users with an immersive experience to explore popular movies and TV shows, search for specific titles, view detailed information, and manage a personal favorites collection that persists across sessions.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📡 API Configuration](#-api-configuration)
- [🎨 Styling](#-styling)
- [💾 State Management](#-state-management)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **🔍 Real-time Search** | Instantly search through thousands of movies and TV shows with debounced input for smooth performance. Results update dynamically as you type, providing immediate feedback. |
| **⭐ Favorites Management** | Add or remove movies from your personal favorites list with a single click. Visual feedback confirms actions with animated icons. |
| **📁 Dedicated Favorites Page** | A dedicated page showcasing all your favorite movies in a grid layout, easily accessible from the navigation bar. |
| **📖 Detailed Movie Information** | Comprehensive movie details including synopsis, release date, rating, cast, and related media. |
| **📺 TV Shows Support** | Browse and explore TV shows with dedicated detail pages showing seasons, episodes, and show information. |
| **🌙 Dark Mode Ready** | Clean, modern UI with a dark theme aesthetic optimized for extended viewing sessions. |

### Technical Features

| Feature | Description |
|---------|-------------|
| **⚡ Fast Performance** | Built with Vite for lightning-fast development server and optimized production builds. |
| **📱 Fully Responsive** | Adaptive layout that works seamlessly across desktop, tablet, and mobile devices. |
| **💾 Persistent Storage** | Favorites are stored in browser LocalStorage, ensuring they remain available even after page refresh or browser restart. |
| **🔄 Context-Based State** | Efficient state management using React Context API for global data access without prop drilling. |
| **🎯 Error Handling** | Robust error handling for API failures and network issues with user-friendly error messages. |
| **⏳ Loading States** | Smooth loading indicators and skeleton screens while fetching data from the API. |

---

## 🛠️ Tech Stack

### Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | Core UI library with functional components and hooks |
| **Vite** | 5+ | Next-generation frontend build tool |

### Development Tools

| Technology | Purpose |
|------------|---------|
| ESLint | Code linting and style enforcement |
| npm | Package management |

### External Services

| Service | Purpose |
|---------|---------|
| **TMDB API** | Movie and TV show database with comprehensive metadata |

### State & Data Management

| Technology | Purpose |
|------------|---------|
| **Context API** | Global state management for movies, favorites, and search functionality |
| **LocalStorage** | Browser storage for persisting favorites data |
| **Custom Hooks** | Reusable logic for API calls and state operations |

### Styling

| Technology | Purpose |
|------------|---------|
| **CSS3** | Custom styles with CSS variables for theming |
| **Flexbox & Grid** | Modern layout techniques for responsive design |
| **CSS Animations** | Smooth transitions and interactive feedback |

---

## 🏗️ Project Structure

```
movieproject/
├── frontend/
│   ├── public/
│   │   ├── bg-images/              # Background images for the application
│   │   ├── logo/                   # Application logos and icons
│   │   └── nav-logo/               # Navigation bar logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Css/
│   │   │   │   ├── App.css              # Main application styles
│   │   │   │   ├── Favorite.css         # Favorites page styles
│   │   │   │   ├── Footer.css            # Footer component styles
│   │   │   │   ├── index.css             # Global styles and resets
│   │   │   │   ├── MovieCard.css         # Movie card component styles
│   │   │   │   ├── MovieDetails.css      # Movie details page styles
│   │   │   │   ├── Navbar.css            # Navigation bar styles
│   │   │   │   ├── TvShows.css           # TV shows page styles
│   │   │   │   └── TvShowsDetails.css    # TV show details styles
│   │   │   ├── Favorite/            # Favorites related components
│   │   │   ├── Footer/
│   │   │   │   └── Footer.jsx        # Footer component with links and info
│   │   │   ├── MovieCard/
│   │   │   │   └── MovieCard.jsx     # Reusable movie card component
│   │   │   ├── Moviedetails/
│   │   │   │   └── MovieDetails.jsx  # Detailed movie information page
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx        # Top navigation with search
│   │   │   └── TvShowsDetails/
│   │   │       └── TvShowsDetails.jsx # Detailed TV show information
│   │   ├── contexts/
│   │   │   └── MovieContext.jsx      # Global movie state provider
│   │   ├── pages/
│   │   │   ├── Favorite.jsx         # User's favorite movies page
│   │   │   ├── Home.jsx             # Main landing page with movie grid
│   │   │   └── TvShows.jsx          # TV shows browsing page
│   │   ├── services/
│   │   │   └── api.js               # TMDB API integration layer
│   │   ├── App.jsx                  # Root application component
│   │   ├── main.jsx                 # Application entry point
│   │   └── App.css                  # App-level styles
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Project dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── README.md                    # Project documentation
```

### Component Details

#### Pages (`src/pages/`)

| Component | File | Description |
|-----------|------|-------------|
| **Home** | `Home.jsx` | Main landing page displaying featured and popular movies in a responsive grid layout. Includes hero section and category-based movie listings. |
| **Favorites** | `Favorite.jsx` | Personal collection page showing all favorited movies. Users can browse and manage their saved movies here. |
| **TV Shows** | `TvShows.jsx` | Dedicated page for browsing TV shows with similar functionality to the movies page. |

#### Components (`src/components/`)

| Component | Location | Description |
|-----------|----------|-------------|
| **Navbar** | `Navbar/Navbar.jsx` | Top navigation bar with logo, navigation links, and integrated search functionality. Responsive design with mobile menu support. |
| **MovieCard** | `MovieCard/MovieCard.jsx` | Reusable card component displaying movie poster, title, rating, and release year. Includes favorite toggle button. |
| **MovieDetails** | `Moviedetails/MovieDetails.jsx` | Comprehensive movie detail page showing synopsis, cast, crew, rating, genres, and related movies. |
| **TvShowsDetails** | `TvShowsDetails/TvShowsDetails.jsx` | TV show detail page with seasons, episodes, show information, and cast details. |
| **Footer** | `Footer/Footer.jsx` | Site footer with navigation links, copyright information, and social media links. |

#### Services (`src/services/`)

| Service | File | Description |
|---------|------|-------------|
| **API** | `api.js` | Centralized API service handling all TMDB API requests including search, movie details, TV show details, and favorites management. |

#### Context (`src/contexts/`)

| Context | File | Description |
|---------|------|-------------|
| **MovieContext** | `MovieContext.jsx` | Global state provider managing movie data, favorites list, search functionality, and loading states across the application. |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - Alternative package manager

Verify your installation:
```bash
node --version
npm --version
```

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd movieproject
   ```

2. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

3. **Install Dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

4. **Configure API Key**

   Before running the application, you need to configure your TMDB API key. See the [API Configuration](#-api-configuration) section below.

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will start and be available at:
   - **URL**: `http://localhost:5173`
   - **Hot Module Replacement (HMR)** enabled for instant updates

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The build output will be in the `dist/` directory. You can deploy this to any static hosting service.

**Preview Production Build:**

```bash
npm run preview
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Create production build |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | Run ESLint to check code quality |

---

## 📡 API Configuration

### Obtaining a TMDB API Key

1. **Create a TMDB Account**
   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Sign up for a free account

2. **Request an API Key**
   - Go to your [API settings](https://www.themoviedb.org/settings/api)
   - Click "Request an API Key"
   - Fill in the required information
   - Submit and wait for approval (usually instant for developer tier)

3. **Configure the Application**

   Open [`src/services/api.js`](src/services/api.js) and add your API key:

   ```javascript
   const API_KEY = 'YOUR_TMDB_API_KEY_HERE';
   const BASE_URL = 'https://api.themoviedb.org/3';
   const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
   ```

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/movie/popular` | GET | Fetch popular movies |
| `/movie/now_playing` | GET | Fetch movies currently in theaters |
| `/movie/top_rated` | GET | Fetch top-rated movies |
| `/movie/{movie_id}` | GET | Get detailed movie information |
| `/search/movie` | GET | Search for movies |
| `/tv/popular` | GET | Fetch popular TV shows |
| `/tv/{tv_id}` | GET | Get detailed TV show information |
| `/search/tv` | GET | Search for TV shows |

---

## 🎨 Styling

### CSS Architecture

The application uses a modular CSS approach with component-specific styles:

- **Global Styles** (`Css/index.css`): Reset rules, typography, CSS variables, and global utilities
- **Component Styles**: Individual CSS files for each component
- **CSS Variables**: Consistent color palette and spacing values

### Color Palette

| Color | Usage |
|-------|-------|
| Primary | Brand color for buttons, links, and accents |
| Secondary | Supporting elements and hover states |
| Background | Page backgrounds (dark theme) |
| Surface | Card and component backgrounds |
| Text | Primary and secondary text colors |
| Error | Error states and warnings |

### Responsive Breakpoints

| Breakpoint | Target Devices |
|------------|----------------|
| `max-width: 1200px` | Large desktops |
| `max-width: 992px` | Tablets landscape |
| `max-width: 768px` | Tablets portrait |
| `max-width: 576px` | Mobile devices |

---

## 💾 State Management

### MovieContext

The [`MovieContext`](src/contexts/MovieContext.jsx) provides global state management:

**Provided Data:**
- `movies`: Array of movie objects
- `tvShows`: Array of TV show objects
- `favorites`: Array of favorited movie IDs
- `searchResults`: Search query results
- `loading`: Boolean indicating data fetch status
- `error`: Error messages if any

**Provided Functions:**
- `fetchMovies()`: Load popular movies
- `searchMovies(query)`: Search for movies
- `toggleFavorite(movieId)`: Add/remove from favorites
- `isFavorite(movieId)`: Check if a movie is favorited

### LocalStorage Integration

Favorites are persisted to LocalStorage with the key `movie_favorites`. This ensures data persists across:
- Page refreshes
- Browser restarts
- Session changes

---

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

| Viewport | Layout |
|----------|--------|
| **Desktop (1200px+)** | Full grid with 5-6 columns |
| **Laptop (992px)** | 4-column grid |
| **Tablet Landscape (768px)** | 3-column grid |
| **Tablet Portrait (576px)** | 2-column grid |
| **Mobile (<576px)** | Single column layout |

### Mobile Features

- Hamburger menu for navigation
- Touch-friendly interactive elements
- Optimized touch targets (minimum 44x44px)
- Swipe-friendly card interactions
- Stacked layouts for better readability

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork the Repository**
   Click the "Fork" button at the top right of the repository page.

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit Your Changes**

   ```bash
   git commit -m 'Add amazing new feature'
   ```

5. **Push to GitHub**

   ```bash
   git push origin feature/amazing-new-feature
   ```

6. **Create a Pull Request**
   Go to the repository and click "New Pull Request"

### Coding Standards

- Use functional components with hooks
- Follow React best practices
- Write meaningful component and variable names
- Add comments for complex logic
- Test your changes before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ Free to use for personal and commercial purposes
- ✅ Permission to modify and distribute
- ✅ Provided "as is" without warranty

---

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing an excellent movie database API
- [React](https://reactjs.org/) community for amazing documentation and resources
- [Vite](https://vitejs.dev/) team for the fantastic build tool
- All contributors who help improve this project

---

## 📞 Support

If you encounter any issues or have questions:

- 📧 Email: support@movieexplorer.example.com
- 🐛 Issues: Submit via GitHub Issues
- 📖 Documentation: Check this README and code comments

---

**Built with ❤️ using React and TMDB API**
