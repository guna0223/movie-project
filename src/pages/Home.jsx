import MovieCard from "../components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovie } from "../services/api";
import "../components/Css/index.css";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopilarMOvies = async () => {
            try {
                const popularMovie = await getPopularMovie();
                setMovies(popularMovie);
            } catch (err) {
                console.log(err);
                setError("fail to load movies");
            } finally {
                setLoading(false);
            }
        };
        loadPopilarMOvies();
    }, []);

    const handelSearch = async (e) => {
        e.preventDefault();

        try {
            const results = await searchMovies(searchQuery);
            setMovies(results);
        } catch {
            setError("Search failed");
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h3>{error}</h3>;

    return (
        <div className="home">
            <form onSubmit={handelSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movie"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error_message">{error}</div>}

            {
                loading ?
                    (<div className="loading">Loadding....</div>
                    ) : (

                        < div className="container-fluid">
                            <div className="row movie-grid">
                                {movies.map((movie) => (
                                    <MovieCard movie={movie} key={movie.id} />
                                ))}
                            </div>
                        </div>
                    )
            }
        </div >
    );
};

export default Home;
