import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css"

const MovieCard = ({ movie }) => {
    function OnFavoriteClick() {
        alert("clicked")
    }
    return (
        <>
            <div className="card movie-card  ">
                <div className="movie-poster">
                    <img src={movie.url} className="card-img-top" alt={movie.title} />
                    <div className="card-body ">
                        {/* <h5 className="card-title"> {movie.title} </h5> */}
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> */}
                        <Link to="#" className="btn btn-primary" onClick={OnFavoriteClick}>hello</Link>
                    </div>
                    <div className="movie-info">
                        <h3> {movie.title}</h3>
                        <p>{movie.relese_date}</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default MovieCard;