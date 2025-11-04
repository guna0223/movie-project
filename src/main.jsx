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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "favourite", element: <Favorite /> },
      { path: "Movie/:id", element: <MovieDetails /> },
      { path: "search/:query", element: <Home /> }
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
