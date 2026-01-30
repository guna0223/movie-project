import MovieCard from "../components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPopularMovie, getMoviesByGenre, searchMovies } from "../services/api";
import "../components/Css/index.css";
import bgImg from "../assets/images/bg-img/bg-movie-app.jpeg";
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


const Home = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [categoriesMovies, setCategoriesMovies] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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

    if (loading) return <h2 className="loading">Loading...</h2>;
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
