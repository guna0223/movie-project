import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [trailerKey, setTrailerKey] = useState("");

  const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Movie Details
        const res = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-`);
        const data = await res.json();

        if (!data || data.success === false) {
          console.error("Movie fetch failed:", data);
          setMovie(null);
          return;
        }

        setMovie(data);

        // Credits - get director
        const creditsRes = await fetch(`${BASE_URL}/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const creditsData = await creditsRes.json();
        const directorInfo = creditsData.crew.find((p) => p.job === "Director");
        setDirector(directorInfo ? directorInfo.name : "Not Available");

        // Trailer
        const trailerRes = await fetch(`${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailerData = await trailerRes.json();
        const officialTrailer = trailerData.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(officialTrailer ? officialTrailer.key : "");

      } catch (error) {
        console.log("Error:", error);
        setMovie(null);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="bi bi-x-lg"></i>
      </button>

      <div className="movie-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="info">
        <h2>
          <Link
            className="tmdb-link"
            to={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movie.title}
          </Link>
        </h2>

        <p>{movie.overview}</p>
        <p>📅 Release Date: {movie.release_date}</p>
        <p>⭐ Rating: {movie.vote_average}</p>
        <p>🎬 Director: {director}</p>

        {trailerKey && (
          <Link
            className="trailer-btn"
            to={`https://www.youtube.com/watch?v=${trailerKey}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="youtube-icon"><i className="bi bi-youtube"></i> Watch Trailer</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
