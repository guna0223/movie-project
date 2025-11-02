import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext.jsx";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Favourite from "./pages/Favourite.jsx";
import "./components/Css/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "favourite", element: <Favourite /> },
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
