import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [providers, setProviders] = useState([]);
  const [cast, setCast] = useState([]);

  const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  // FETCH MOVIE DETAILS
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setMovie(data);

      // DIRECTOR
      const credits = await fetch(`${BASE_URL}/${id}/credits?api_key=${API_KEY}`);
      const creditsData = await credits.json();
      const directorInfo = creditsData.crew.find(p => p.job === "Director");
      setDirector(directorInfo ? directorInfo.name : "Not Available");

      // TRAILER
      const trailerRes = await fetch(`${BASE_URL}/${id}/videos?api_key=${API_KEY}`);
      const trailerData = await trailerRes.json();

      const trailer = trailerData.results.find(
        vid => vid.type === "Trailer" && vid.site === "YouTube"
      );

      setTrailerKey(trailer ? trailer.key : "");
    };

    fetchMovie();
  }, [id]);

  // FETCH PROVIDERS
  useEffect(() => {
    const getProviders = async () => {
      const res = await fetch(`${BASE_URL}/${id}/watch/providers?api_key=${API_KEY}`);
      const data = await res.json();
      const region = data.results?.IN || data.results?.US || {};
      setProviders(region.flatrate || region.rent || []);
    };
    getProviders();
  }, [id]);

  // FETCH CAST
  useEffect(() => {
    const fetchCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await res.json();
      setCast(data.cast || []);
    };
    fetchCast();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;


  return (
    <>
      <div
        className="movie-hero"
        style={{ "--bg-img": `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-x-lg"></i>
        </button>

        {/* LEFT SIDE */}
        <div className="movie-left">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster"
          />

          <div className="providers-section">
            <h3>Available on:</h3>

            {providers.length > 0 ? (
              <div className="provider-list">
                {providers.map(prov => (
                  <div key={prov.provider_id} className="provider-box">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${prov.logo_path}`}
                      alt={prov.provider_name}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="ott-none">Not on OTT</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="movie-right">
          <h1>
            {movie.title} <span>({movie.release_date?.split("-")[0]})</span>
          </h1>

          <p className="tagline">{movie.tagline}</p>

          <h3>Overview</h3>
          <p className="overview">{movie.overview}</p>

          <div className="details-row">
            <p><strong>📅 Release:</strong> {movie.release_date}</p>
            <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
            <p><strong>🎬 Director:</strong> {director}</p>
          </div>
          {trailerKey && (
            <Link
              to={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              className="trailer-btn"
            >
              <i className="bi bi-youtube"></i> Play Trailer
            </Link>
          )}
        </div>
      </div>
      {/* CAST SECTION */}
      <section className="cast-part">
        <div className="cast-section">
          <h2>Top Billed Cast</h2>

          <div className="cast-grid">
            {cast.slice(0, 10).map(actor => (
              <div className="cast-card" key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/placeholder.png"
                  }
                  alt={actor.name}
                />
                <p className="actor-name">{actor.name}</p>
                <p className="actor-role">{actor.character}</p>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
