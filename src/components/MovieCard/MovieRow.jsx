import React from "react";
import MovieCard from "./MovieCard";
import "../Css/MovieRow.css";

// Skeleton Loader for MovieRow
export const MovieRowSkeleton = () => (
    <div className="movie-row-skeleton">
        {[...Array(10)].map((_, index) => (
            <div key={index} className="skeleton-card">
                <div className="skeleton-poster"></div>
                <div className="skeleton-title"></div>
            </div>
        ))}
    </div>
);

// MovieRow Component
const MovieRow = ({ 
    title, 
    movies = [], 
    loading = false, 
    isTvShow = false,
    showTitle = true 
}) => {
    if (loading) {
        return (
            <section className="movie-row">
                {showTitle && <h2 className="row-title">{title}</h2>}
                <MovieRowSkeleton />
            </section>
        );
    }

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <section className="movie-row">
            {showTitle && <h2 className="row-title">{title}</h2>}
            <div className="movie-row-container">
                <div className="movie-row-grid">
                    {movies.slice(0, 15).map((movie) => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            isTvShow={isTvShow}
                            variant="row"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MovieRow;
