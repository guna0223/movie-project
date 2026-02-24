import React from "react";
import { Link } from "react-router-dom";
import "../Css/MovieCard.css";
import Swal from "sweetalert2";
import { useMovieContext } from "../../contexts/MovieContext";

const MovieCard = ({ movie, isTvShow = false, variant = "default" }) => {
    const { isFavorite, addToFavorites, removeFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    // Get the right title and date based on whether it's a movie or TV show
    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;
    const overview = movie.overview;

    function OnFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (favorite) {
            removeFavorites(movie.id);
            Swal.fire({
                title: "Removed!",
                text: `${isTvShow ? "TV Show" : "Movie"} removed from favorites`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                width: "280px",
                toast: true,
                position: "top-end",
                customClass: { popup: "slide-toast" }
            });
        } else {
            addToFavorites(movie);
            Swal.fire({
                title: "Added!",
                text: `${isTvShow ? "TV Show" : "Movie"} added to favorites`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                width: "260px",
                toast: true,
                position: "top-end",
                customClass: { popup: "slide-toast" }
            });
        }
    }

    const getDetailLink = () => {
        return isTvShow ? `/tv/${movie.id}` : `/movie/${movie.id}`;
    };

    // Different class for horizontal row variant
    const cardClass = variant === "row" ? "movie-card movie-card-row" : "movie-card";

    return (
        <>
            <div className={cardClass}>
                <Link to={getDetailLink()} className="movie-card-link">
                    <div className="movie-poster">
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image"
                            }
                            className="card-img-top"
                            alt={title}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                            }}
                        />
                        {/* Hover Description Preview */}
                        <div className="movie-overlay">
                            <p className="overlay-description">
                                {overview && overview.length > 150
                                    ? overview.substring(0, 150) + "..."
                                    : overview || "No description available"}
                            </p>
                        </div>
                    </div>

                    {variant !== "row" && (
                        <button
                            className={`btn-one ${favorite ? "active" : ""}`}
                            onClick={OnFavoriteClick}
                        >
                            <i className="bi bi-heart-fill"></i>
                        </button>
                    )}

                    <div className="movie-info">
                        <h3 className="movie-title">{title}</h3>
                        <p className="movie-year">{releaseDate?.split("-")[0] || "N/A"}</p>

                        <div className="rating-circle">
                            <span>{Math.round(movie.vote_average * 10)}%</span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default MovieCard;
