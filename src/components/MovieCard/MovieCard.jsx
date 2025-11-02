import React from "react";
import { Link } from "react-router-dom";
import "../Css/MovieCard.css"

const MovieCard = ({ movie }) => {
    function OnFavoriteClick() {
        alert("clicked")
    }
    return (
        <>
            <div className="card text-light">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                    <div className="card-body">
                        {/* <h5 className="card-title"> {movie.title} </h5> */}
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> */}
                            <Link to="/" className="btn-one" onClick={OnFavoriteClick}>💙</Link>
                    </div>
                    <div className="movie-info">
                        <h3> {movie.title}</h3>
                        <p>{movie.relese_date?.split("-")[0]}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard;