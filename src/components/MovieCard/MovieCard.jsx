import React from "react";
import { Link } from "react-router-dom";
import "../Css/MovieDetails.css";
import "../Css/MovieCard.css";
import Swal from "sweetalert2";

import { useMovieContext } from "../../contexts/MovieContext";

const MovieCard = ({ movie }) => {
    const { isFavorite, addToFavorites, removeFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function OnFavoriteClick(e) {
        e.preventDefault();

        if (favorite) {
            removeFavorites(movie.id);
            Swal.fire({
                title: "Remove!",
                text: "Remove from Favorite",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                width: "280px", // smaller popup
                toast: true,
                position: "top-end",
                customClass: {
                    popup: "slide-toast"
                }
            });
        } else {
            // Adding to favorites
            addToFavorites(movie);

            Swal.fire({
                title: "Added!",
                text: "Movie Added To Favorite",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                width: "260px",
                toast: true,
                position: "top-end",
                customClass: { popup: "slide-toast" }
            });
        }



        if (favorite) removeFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <div className="card text-light fav-card">
            <div className="movie-poster fav-card">

                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                />
                <button className={`btn-one ${favorite ? "active" : ""}`}
                    onClick={OnFavoriteClick}>
                    <i class="bi bi-heart-fill"></i>
                </button>
                <Link to={`/movie/${movie.id}`} className="movie-card">
                    <div className="movie-info">
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date?.split("-")[0]}</p>
                        <p className="rating-fill">⭐{movie.vote_average}</p>
                        <p className="movie-overview">
                            {movie.overview.length > 120
                                ? movie.overview.substring(0, 120) + "..."
                                : movie.overview}
                        </p>
                    </div>
                </Link>
            </div>
        </div >
    );
};

export default MovieCard;


