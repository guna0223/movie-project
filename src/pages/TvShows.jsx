import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "../components/Css/TvShows.css";

const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch TV shows");
        }

        const data = await response.json();
        setShows(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load TV shows");
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // ❌ Error state
  if (error) {
    return <div className="error_message">{error}</div>;
  }

  return (
    <div className="tvshows-page">
      <div className="tvshows-header">
        <h1 className="page-title">TV Shows</h1>
      </div>

      <div className="tvshows-content">
        <div className="container-fluid">
          <div className="movie-grid">
            {shows.length > 0 ? (
              shows.map(show => (
                <MovieCard
                  key={show.id}
                  movie={show}
                  isTvShow={true}
                />
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
