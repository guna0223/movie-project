import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { useParams } from "react-router-dom";
import "../components/Css/TvShows.css";

const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";

const tvCategories = [
    { id: "popular", name: "Popular" },
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }
];

const TvShows = () => {
    const { query } = useParams();
    const [shows, setShows] = useState([]);
    const [categoriesShows, setCategoriesShows] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("popular");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch popular TV shows on mount
    useEffect(() => {
        const fetchPopularShows = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
                const data = await res.json();
                setShows(data.results || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load TV shows");
                setLoading(false);
            }
        };
        fetchPopularShows();
    }, []);

    // Fetch shows by category
    useEffect(() => {
        const fetchCategoryShows = async () => {
            const newCategoriesShows = {};
            for (const category of tvCategories) {
                if (category.id === "popular") continue;
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${category.id}`
                    );
                    const data = await res.json();
                    newCategoriesShows[category.id] = data.results?.slice(0, 12) || [];
                } catch (err) {
                    console.error(err);
                }
            }
            setCategoriesShows(newCategoriesShows);
        };
        fetchCategoryShows();
    }, []);

    // Handle search
    useEffect(() => {
        const handleSearch = async () => {
            if (query) {
                setLoading(true);
                setSearchQuery(query);
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
                    );
                    const data = await res.json();
                    setShows(data.results || []);
                    setActiveCategory("search");
                } catch (err) {
                    console.error(err);
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
                const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
                const data = await res.json();
                setShows(data.results || []);
            } catch (err) {
                setError("Failed to load TV shows");
            }
        } else if (categoriesShows[categoryId]) {
            setShows(categoriesShows[categoryId]);
        }
        setLoading(false);
    };

    const getCategoryTitle = () => {
        if (searchQuery) return `Results for "${searchQuery}"`;
        if (activeCategory === "popular") return "Popular TV Shows";
        const cat = tvCategories.find(c => c.id === activeCategory);
        return cat ? `${cat.name} Shows` : "TV Shows";
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error_message">{error}</div>;

    return (
        <div className="tvshows-page">
            {/* CATEGORY TABS - Netflix Style */}
            <div className="category-tabs">
                {tvCategories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
                        onClick={() => handleCategoryClick(cat.id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* TV SHOWS GRID */}
            <div className="tvshows-content">
                <h2 className="section-title">{getCategoryTitle()}</h2>
                <div className="container-fluid">
                    <div className="movie-grid">
                        {shows.length > 0 ? (
                            shows.map(show => (
                                <MovieCard key={show.id} movie={show} isTvShow={true} />
                            ))
                        ) : (
                            <p className="no-results">No TV shows found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvShows;
