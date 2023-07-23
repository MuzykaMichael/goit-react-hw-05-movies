import {  Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Header/Header";
import { lazy } from "react";

const HomePage = lazy(()=>import('../Pages/HomePage/HomePage'));
const SearchMovie = lazy(()=>import('../Pages/SearchMovie/SearchMovie'))
const MovieDetails = lazy(()=>import('../Pages/MovieDetails/MovieDetails'));
const Cast = lazy(()=>import('../components/Cast/Cast'));
const Reviews = lazy(()=>import('../components/Reviews/Reviews'));

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
