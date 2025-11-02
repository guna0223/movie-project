import React from "react";
import "../components/Css/Favourite.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard/MovieCard";

const Favourites = () => {
    const { favourites } = useMovieContext();
    if (favourites) {
        return (
            <div className="favorites">
                <h2>Your favorite movies</h2>
                <div className="container-fluid">
                    <div className="row movie-grid">
                        {favorites && favorites.length > 0 ? (
                            favorites.map(movie => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))
                        ) : (
                            <p>No favourite movies added yet 😊</p>
                        )}
                    </div>
                </div>
            </div>
        );

    }
};

export default Favourites;


