import { HomePage } from "./Pages/HomePage/HomePage";
import {  Routes, Route, Navigate } from "react-router-dom";
import {SearchMovie} from './Pages/SearchMovie/SearchMovie'
import { MovieDetails } from "./Pages/MovieDetails/MovieDetails";
import {Cast} from '../components/Cast/Cast';
import { Reviews } from "./Reviews/Reviews";
import { Header } from "./Header/Header";
import { lazy } from "react";

export const App = () => {
  return (
      <>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<HomePage />} />
          <Route path="movies" element={<SearchMovie />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route> 
      </Routes>
      </>
  );
};
