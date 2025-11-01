import MovieCard from "../components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovie } from "../services/api";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, searchMovies] = useState([]);

    useEffect(() => { })

    const handelSearch = (e) => {
        e.preventDefault();
        alert(searchQuery);
    }

    return (
        <>
            <div className="home">
                <form onSubmit={handelSearch} className="search-form">
                    <input type="text"
                        placeholder="Search for movie"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit"
                        className="search-button">Search</button>
                </form>

                <div className="container-fluid">
                    <div className="row movie-grid">
                        {movies.map(
                            (movie) =>
                                movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
                                    <MovieCard movie={movie} key={movie.id} />
                                )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;