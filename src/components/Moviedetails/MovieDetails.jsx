import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRow from "../MovieCard/MovieRow";
import "../Css/MovieDetails.css";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="related-skeleton-card">
    <div className="related-skeleton-poster"></div>
    <div className="related-skeleton-title"></div>
    <div className="related-skeleton-year"></div>
  </div>
);

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [providers, setProviders] = useState([]);
  const [cast, setCast] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

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

  // FETCH RELATED MOVIES
  useEffect(() => {
    const fetchRelatedMovies = async () => {
      setRelatedLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        // Limit to 8-10 items
        setRelatedMovies(data.results?.slice(0, 10) || []);
      } catch (error) {
        console.error("Error fetching related movies:", error);
        setRelatedMovies([]);
      } finally {
        setRelatedLoading(false);
      }
    };
    fetchRelatedMovies();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;


  return (
    <>
      <div
        className="movie-hero"
        style={{ "--bg-img": `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >

        {/* BACK BUTTON */}
        <button className="movie-back-btn" onClick={() => navigate(-1)}>
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
            <button
              className="trailer-btn"
              onClick={() => setShowTrailer(true)}
            >
              <i className="bi bi-youtube"></i> Play Trailer
            </button>
          )}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && trailerKey && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="trailer-close-btn"
              onClick={() => {
                setShowTrailer(false);
                navigate(-1);
              }}
              aria-label="Close trailer and go back"
            >
              <i className="bi bi-x-lg"></i>
            </button>

              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            
          </div>
        </div>
      )}
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

      {/* RELATED MOVIES SECTION */}
      <section className="related-movies-section">
        <div className="related-movies-container">
          <h2>Related Movies</h2>

          {relatedLoading ? (
            <div className="related-movies-grid">
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : relatedMovies.length > 0 ? (
            <div className="related-movies-grid">
              {relatedMovies.map((relatedMovie) => (
                <div
                  className="related-movie-card"
                  key={relatedMovie.id}
                  onClick={() => navigate(`/movie/${relatedMovie.id}`)}
                >
                  <div className="related-movie-poster">
                    {relatedMovie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w342${relatedMovie.poster_path}`}
                        alt={relatedMovie.title}
                      />
                    ) : (
                      <div className="no-poster">No Image</div>
                    )}
                  </div>
                  <div className="related-movie-info">
                    <h4 className="related-movie-title">
                      {relatedMovie.title}
                    </h4>
                    <p className="related-movie-year">
                      {relatedMovie.release_date?.split("-")[0] || "N/A"}
                    </p>
                    {relatedMovie.vote_average > 0 && (
                      <p className="related-movie-rating">
                        ⭐ {relatedMovie.vote_average.toFixed(1)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-related-movies">No related movies found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
