import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MoviDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [providers, setProviders] = useState([]);

  const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  // ✅ FETCH MOVIE DETAILS
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`);
        const dat = await res.json();
        if (!dat || dat.success === false) return setMovie(null);
        setMovie(dat);

        // Director
        const creditsRes = await fetch(`${BASE_URL}/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const creditsData = await creditsRes.json();
        const directorInfo = creditsData.crew.find((p) => p.job === "Director");
        setDirector(directorInfo ? directorInfo.name : "Not Available");

        // Trailer
        const trailerRes = await fetch(`${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailerData = await trailerRes.json();

        const trailers = trailerData.results?.filter(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        const officialTrailer = trailers?.find((vid) =>
          vid.name.toLowerCase().includes("official")
        );

        const trailerToShow = officialTrailer || (trailers && trailers[0]);
        setTrailerKey(trailerToShow ? trailerToShow.key : "");
      } catch {
        setMovie(null);
      }
    };

    fetchMovie();
  }, [id]);

  // ✅ FETCH OTT PROVIDERS
  const fetchProviders = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}&watch_region=IN`
    );
    const data = await res.json();

    const region = data.results?.IN || data.results?.US || {};
    return region.flatrate || region.rent || [];
  };

  useEffect(() => {
    const loadOTT = async () => {
      setProviders(await fetchProviders(id));
    };
    loadOTT();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i class="bi bi-x-lg"></i>
      </button>

      <div className="movie-img">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="details-img" />

        <div className="providers">
          <h3>Available on:</h3>
          {providers.length > 0 ? (
            <div className="provider-list">
              {providers.map((prov) => (
                <div key={prov.provider_id} className="provider-box">
                  <img src={`https://image.tmdb.org/t/p/w200${prov.logo_path}`} alt={prov.provider_name} className="provider-logo" />
                </div>
              ))}
              <p className="ott-subtitle">Now Streaming</p>
            </div>
          ) : (

            <p>Not available on OTT</p>
          )}
        </div>
      </div>

      <div className="info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>📅 Release Date: {movie.release_date}</p>
        <p>⭐ Rating: {movie.vote_average}</p>
        <p>🎬 Director: {director}</p>

        {trailerKey ? (
          <Link className="trailer-btn" to={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank">
            <i className="bi bi-youtube youtube-icon"></i>Play Trailer
          </Link>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </div>
  );
};

export default MoviDetails;
