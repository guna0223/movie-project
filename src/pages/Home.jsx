import MovieCard from "../components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPopularMovie, getMoviesByGenre, searchMovies, getTopRatedMovies, getTopRatedTamilMovies, getTopRatedHollywoodMovies } from "../services/api";
import "../components/Css/index.css";
import bgImg from "/public/bg-images/bg-movie-app.jpeg";

// Skeleton Loader Component
const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-poster"></div>
        <div className="skeleton-title"></div>
    </div>
);

const categories = [
    { id: "popular", name: "Popular" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
];

// Horizontal Movie Row Component
const MovieRow = ({ title, movies, loading }) => {
    return (
        <div className="movie-row">
            <h2 className="row-title">{title}</h2>
            {loading ? (
                <div className="movie-row-grid">
                    {[...Array(10)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <div className="movie-row-grid">
                    {movies.length > 0 ? (
                        movies.slice(0, 15).map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))
                    ) : (
                        <p className="no-results">No movies found</p>
                    )}
                </div>
            )}
        </div>
    );
};

const Home = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [categoriesMovies, setCategoriesMovies] = useState({});
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTamilMovies, setTopRatedTamilMovies] = useState([]);
    const [topRatedHollywoodMovies, setTopRatedHollywoodMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [topRatedLoading, setTopRatedLoading] = useState(true);
    const [tamilLoading, setTamilLoading] = useState(true);
    const [hollywoodLoading, setHollywoodLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("popular");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovie = await getPopularMovie();
                setMovies(popularMovie);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    useEffect(() => {
        const loadCategoryMovies = async () => {
            const newCategoriesMovies = {};
            for (const category of categories) {
                if (category.id === "popular") continue;
                try {
                    const movies = await getMoviesByGenre(category.id);
                    newCategoriesMovies[category.id] = movies.slice(0, 12);
                } catch (err) {
                    console.log(err);
                }
            }
            setCategoriesMovies(newCategoriesMovies);
        };
        loadCategoryMovies();
    }, []);

    // Fetch Top Rated Movies
    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                const movies = await getTopRatedMovies();
                setTopRatedMovies(movies.slice(0, 15));
            } catch (err) {
                console.log(err);
            } finally {
                setTopRatedLoading(false);
            }
        };
        fetchTopRated();
    }, []);

    // Fetch Top Rated Tamil Movies
    useEffect(() => {
        const fetchTopRatedTamil = async () => {
            try {
                const movies = await getTopRatedTamilMovies();
                setTopRatedTamilMovies(movies.slice(0, 15));
            } catch (err) {
                console.log(err);
            } finally {
                setTamilLoading(false);
            }
        };
        fetchTopRatedTamil();
    }, []);

    // Fetch Top Rated Hollywood Movies
    useEffect(() => {
        const fetchTopRatedHollywood = async () => {
            try {
                const movies = await getTopRatedHollywoodMovies();
                setTopRatedHollywoodMovies(movies.slice(0, 15));
            } catch (err) {
                console.log(err);
            } finally {
                setHollywoodLoading(false);
            }
        };
        fetchTopRatedHollywood();
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            if (query) {
                setLoading(true);
                setSearchQuery(query);
                try {
                    const results = await searchMovies(query);
                    setMovies(results || []);
                    setActiveCategory("search");
                } catch (err) {
                    console.log(err);
                    setError("Search failed");
                } finally {
                    setLoading(false);
                }
            }
        };
        handleSearch();
    }, [query]);

    const handleCategoryClick = async (categoryId) => {
        setLoading(true);
        setActiveCategory(categoryId);
        setSearchQuery("");
        if (categoryId === "popular") {
            try {
                const popularMovie = await getPopularMovie();
                setMovies(popularMovie);
            } catch (err) {
                setError("Failed to load movies");
            }
        } else if (categoriesMovies[categoryId]) {
            setMovies(categoriesMovies[categoryId]);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="home">
                <div className="hero-section">
                    <img src={bgImg} alt="" className="hero-bg-img" />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h2 className="hero-title">Unlimited movies, TV shows, and more</h2>
                        <h4 className="hero-subtitle">Watch anywhere. Cancel anytime.</h4>
                    </div>
                </div>
                <div className="skeleton-loader">
                    {[...Array(6)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <h3 className="error_message">{error}</h3>;

    const getCategoryTitle = () => {
        if (searchQuery) return `Results for "${searchQuery}"`;
        if (activeCategory === "popular") return "Popular on METFLIX";
        const cat = categories.find(c => c.id === activeCategory);
        return cat ? `${cat.name} Movies` : "Movies";
    };

    return (
        <div className="home">
            {/* HERO SECTION */}
            <div className="hero-section">
                <img src={bgImg} alt="" className="hero-bg-img" />
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h2 className="hero-title">Unlimited movies, TV shows, and more</h2>
                    <h4 className="hero-subtitle">Watch anywhere. Cancel anytime.</h4>
                </div>
            </div>

            {/* TOP RATED SECTIONS - Horizontal Scroll */}
            <MovieRow 
                title="Top Rated Movies" 
                movies={topRatedMovies} 
                loading={topRatedLoading} 
            />
            
            <MovieRow 
                title="Top Rated Tamil Movies" 
                movies={topRatedTamilMovies} 
                loading={tamilLoading} 
            />
            
            <MovieRow 
                title="Top Rated Hollywood Movies" 
                movies={topRatedHollywoodMovies} 
                loading={hollywoodLoading} 
            />

            {/* CATEGORY TABS - Netflix Style */}
            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
                        onClick={() => handleCategoryClick(cat.id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* MOVIES GRID */}
            <div className="movies-section">
                <h2 className="section-title">{getCategoryTitle()}</h2>
                <div className="container-fluid">
                    <div className="movie-grid">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))
                        ) : (
                            <p className="no-results">No movies found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
