# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


🎬 Movie Explorer App

A modern movie browsing web application built with React and TMDB API. This app allows users to explore popular movies, search movie details, and add/remove movies from a personal favourites list. LocalStorage is used to save favourites so they persist even after refresh.

🚀 Features

🔍 Search movies in real-time

⭐ Add / Remove favourite movies

📁 Dedicated favourites page

📱 Fully responsive UI

🌐 Fetch data from TMDB API

⚛️ Built using React Hooks & Context API

🛠️ Tech Stack
Technology	Purpose
React JS	UI Development
TMDB API	Movie Data
Context API	State Management
LocalStorage	Persistent Favourites
CSS	Styling & Responsiveness


src/
 ├── components/
 ├── context/
 ├── pages/
 ├── App.jsx
 ├── index.js
