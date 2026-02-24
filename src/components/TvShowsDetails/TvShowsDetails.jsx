import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Css/TvShowsDetails.css";

const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";

const TvDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [show, setShow] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [providers, setProviders] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        // SHOW DETAILS
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setShow(data));

        // CREDITS (CAST + CREW)
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setCredits(data));

        // TRAILER
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const trailerVideo = data.results?.find(
                    v => v.type === "Trailer" && v.site === "YouTube"
                );
                setTrailer(trailerVideo);
            });

        // STREAMING PROVIDERS
        fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setProviders(data.results?.IN));

        // EPISODES FOR SEASON 1
        fetch(`https://api.themoviedb.org/3/tv/${id}/season/1?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setEpisodes(data.episodes));

        // SIMILAR SHOWS
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setSimilar(data.results));
    }, [id]);

    if (!show) return <h2>Loading...</h2>;

    const director = credits?.crew?.find(person => person.job === "Director");
    const cast = credits?.cast?.slice(0, 6);

    return (
        <>
            <section className="detaild-container" >
                <div style={{
                    backgroundImage: show.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`
                        : "none"
                }}>

                    {/* BACK BUTTON */}
                    <Link to="/TvShows" className="back-btn">X</Link>

                    {/* POSTER */}
                    <div className="details-content">
                        <img
                            src={
                                show.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                    : "/placeholder.png"
                            }
                            alt={show.name}
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="detaiols-text">
                        <h1>{show.name}</h1>

                        <p><strong>Overview:</strong> {show.overview}</p>
                        <p><strong>Rating:</strong> ⭐ {show.vote_average}</p>
                        <p><strong>Seasons:</strong> {show.number_of_seasons}</p>
                        <p><strong>Total Episodes:</strong> {show.number_of_episodes}</p>

                        <p><strong>Director:</strong> {director ? director.name : "Not Available"}</p>

                        {providers?.flatrate && (
                            <p><strong>Watch on:</strong> {providers.flatrate.map(p => p.provider_name).join(", ")}</p>
                        )}
                        {trailer && (
                            <button
                                className="trailer-btn"
                                onClick={() => setShowTrailer(true)}
                            >
                                <i className="bi bi-youtube"></i> Watch Trailer
                            </button>
                        )}
                    </div>

                </div>

                {/* TRAILER MODAL */}
                {showTrailer && trailer && (
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
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                title="TV Show Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
                {/* CAST */}
                <section className="cast-section">
                    <h2>Cast</h2>
                    <div className="cast-grid">
                        {cast && cast.map(actor => (
                            <div key={actor.id} className="cast-card">
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : "/placeholder.png"
                                    }
                                    alt={actor.name}
                                />
                                <p>{actor.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EPISODES */}
                <section className="episodes-section">
                    <h2>Episodes</h2>
                    <div className="episodes">
                        {episodes.map(ep => (
                            <details key={ep.id}>
                                <summary>Episode {ep.episode_number}: {ep.name}</summary>
                                <p>{ep.overview}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* SIMILAR SHOWS */}
                <section className="similar-show">
                    <h2>Similar Shows</h2>

                    <div className="cast-grid">
                        {similar.slice(0, 6).map(show => (
                            <Link
                                key={show.id}
                                to={`/tv/${show.id}`}
                                className="cast-card show-card"
                            >
                                <div className="poster-wrapper">
                                    <img
                                        src={
                                            show.poster_path
                                                ? `https://image.tmdb.org/t/p/w185${show.poster_path}`
                                                : "/placeholder.png"
                                        }
                                        alt={show.name}
                                    />

                                    {/* ⭐ Rating badge */}
                                    <span className="rating-badge">
                                        ⭐ {show.vote_average?.toFixed(1)}
                                    </span>
                                </div>

                                <p className="show-title">{show.name}</p>

                                {/* 📅 Year */}
                                <p className="show-year">
                                    {show.first_air_date
                                        ? show.first_air_date.slice(0, 4)
                                        : "—"}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            </section>
        </>
    );
};

export default TvDetails;
