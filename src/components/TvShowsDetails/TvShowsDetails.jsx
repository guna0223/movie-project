import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Css/TvShowsDetails.css";

const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";

const TvDetails = () => {
    const { id } = useParams();

    const [show, setShow] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [providers, setProviders] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [similar, setSimilar] = useState([]);

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

                        {trailer && (
                            <a
                                className="trailer-btn"
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                🎬 Watch Trailer
                            </a>
                        )}

                        <p><strong>Overview:</strong> {show.overview}</p>
                        <p><strong>Rating:</strong> ⭐ {show.vote_average}</p>
                        <p><strong>Seasons:</strong> {show.number_of_seasons}</p>
                        <p><strong>Total Episodes:</strong> {show.number_of_episodes}</p>

                        <p><strong>Director:</strong> {director ? director.name : "Not Available"}</p>

                        {providers?.flatrate && (
                            <p><strong>Watch on:</strong> {providers.flatrate.map(p => p.provider_name).join(", ")}</p>
                        )}
                    </div>
                </div>
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
                <section className="siimilar-show">
                    <h2>Similar Shows</h2>
                    <div className="cast-grid">
                        {similar.slice(0, 6).map(s => (
                            <Link key={s.id} to={`/tv/${s.id}`} className="cast-card">
                                <img
                                    src={
                                        s.poster_path
                                            ? `https://image.tmdb.org/t/p/w185${s.poster_path}`
                                            : "/placeholder.png"
                                    }
                                    alt={s.name}
                                />
                                <p>{s.name}</p>
                            </Link>
                        ))}
                    </div>
                </section>

            </section >
        </>
    );
};

export default TvDetails;
