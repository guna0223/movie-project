import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Favorite from "./pages/Favorite.jsx";
import "./components/Css/index.css"
import MovieDetails from "./components/Moviedetails/MovieDetails.jsx";
import TvShows from "./pages/TvShows";
import TvDetails from "./components/TvShowsDetails/TvShowsDetails.jsx";
import SearchResult from "./components/SearchResult/SearchResult.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "favourite", element: <Favorite /> },
      { path: "Movie/:id", element: <MovieDetails /> },
      { path: "tv/:id", element: <TvDetails /> },
      { path: "search/:query", element: <SearchResult /> },
      { path: "TvShows", element: <TvShows /> }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <MovieProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </MovieProvider>
);
