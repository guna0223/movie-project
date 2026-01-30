import React from "react";
import { Link } from "react-router-dom";
import "../Css/MovieDetails.css";
import "../Css/MovieCard.css";
import Swal from "sweetalert2";

import { useMovieContext } from "../../contexts/MovieContext";

const MovieCard = ({ movie, isTvShow = false }) => {
    const { isFavorite, addToFavorites, removeFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    // Get the right title and date based on whether it's a movie or TV show
    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;
    const overview = movie.overview;

    function OnFavoriteClick(e) {
        e.preventDefault();

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

    return (
        <div className="movie-card text-light fav-card">
            <Link to={getDetailLink()} className="movie-card">
                <div className="movie-poster fav-card">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top"
                        alt={title}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                        }}
                    />
                </div>

                <button
                    className={`btn-one ${favorite ? "active" : ""}`}
                    onClick={OnFavoriteClick}
                >
                    <i className="bi bi-heart-fill"></i>
                </button>

                <div className="movie-info">
                    <h3>{title}</h3>
                    <p>{releaseDate?.split("-")[0]}</p>

                    <div className="rating-circle">
                        <span>{Math.round(movie.vote_average * 10)}%</span>
                    </div>

                    <p className="movie-overview">
                        {overview && overview.length > 120
                            ? overview.substring(0, 120) + "..."
                            : overview || "No description available"}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
