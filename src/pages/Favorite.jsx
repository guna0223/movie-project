import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard/MovieCard";
import "../components/Css/Favorite.css";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites) {
        return (
            <div className="favorites">
                <h2 className="headiing">Your Watchlist</h2>
                <div className="movies-grid ">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
    );
}

export default Favorites;
