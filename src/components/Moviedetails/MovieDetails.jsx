import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");

  const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Movie details
        const res = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);

        // Credits API to get director
        const creditsRes = await fetch(`${BASE_URL}/${id}/credits?api_key=${API_KEY}`);
        const creditsData = await creditsRes.json();

        const directorInfo = creditsData.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorInfo ? directorInfo.name : "Not Available");
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate(-1)}>X</button>
      
      <div className="movie-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>📅 Release Date: {movie.release_date}</p>
        <p>⭐ Rating: {movie.vote_average}</p>

        <p>🎬 Director: {director}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
