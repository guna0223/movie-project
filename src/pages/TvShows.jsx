import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/Css/TvShows.css";


const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";

const TvShows = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setShows(data.results)
            });
    }, []);

    return (
        <>
            <div className="movie-container">
                <h1 className="page-title">TV Shows</h1>

                <div className="gird">
                    {shows.map(show => (
                        <div key={show.id} className="card">
                            <Link to={`/tv/${show.id}`}>
                                <img src={
                                    show.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                        : "/placeholder.png"
                                }
                                    alt={show.name}
                                />
                                <p>{show.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TvShows;