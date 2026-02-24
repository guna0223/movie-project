import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { searchMovies } from "../../services/api";
import "../css/SearchResult.css";

const SearchResult = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const results = await searchMovies(query);
                setMovies(results || []);
                setError(null);
            } catch (err) {
                console.error("Search error:", err);
                setError("Failed to fetch search results");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const getPosterUrl = (posterPath) => {
        if (posterPath) {
            return `https://image.tmdb.org/t/p/w500${posterPath}`;
        }
        return "/logo-met-one.png";
    };

    const getReleaseYear = (date) => {
        if (!date) return "N/A";
        return date.split("-")[0];
    };

    if (loading) {
        return (
            <div className="search-result-page">
                <div className="search-result-container">
                    <div className="search-result-header">
                        <h2 className="search-result-title">
                            Searching for "{query}"...
                        </h2>
                    </div>
                    <div className="search-result-grid">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="search-skeleton-card">
                                <div className="search-skeleton-poster"></div>
                                <div className="search-skeleton-title"></div>
                                <div className="search-skeleton-year"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search-result-page">
                <div className="search-result-container">
                    <div className="search-error">
                        <h3>{error}</h3>
                        <Link to="/" className="search-back-link">
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="search-result-page">
            <div className="search-result-container">
                <div className="search-result-header">
                    <h2 className="search-result-title">
                        Search Results for "{query}"
                    </h2>
                    <p className="search-result-count">
                        {movies.length} {movies.length === 1 ? "movie" : "movies"} found
                    </p>
                </div>

                {movies.length === 0 ? (
                    <div className="search-no-results">
                        <h3>No movies found</h3>
                        <p>Try searching with different keywords</p>
                        <Link to="/" className="search-back-link">
                            Go Back Home
                        </Link>
                    </div>
                ) : (
                    <div className="search-result-grid">
                        {movies.map((movie) => (
                            <Link
                                to={`/movie/${movie.id}`}
                                key={movie.id}
                                className="search-movie-card"
                            >
                                <div className="search-movie-poster">
                                    <img
                                        src={getPosterUrl(movie.poster_path)}
                                        alt={movie.title}
                                        onError={(e) => {
                                            e.target.src = "/logo-met-one.png";
                                        }}
                                    />
                                </div>
                                <div className="search-movie-info">
                                    <h3 className="search-movie-title">
                                        {movie.title}
                                    </h3>
                                    <p className="search-movie-year">
                                        {getReleaseYear(movie.release_date)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
