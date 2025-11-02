import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
                );
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.log("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return (
            <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details">
                <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-details-poster"
                />

                <h1 className="details-title">{movie.title}</h1>

                <p className="details-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
                <p className="details-date">📅 {movie.release_date}</p>

                <h3 className="details-overview-title">Overview</h3>
                <p className="details-overview">{movie.overview}</p>
            </div>
        </div>

    );
};

export default MovieDetails;
