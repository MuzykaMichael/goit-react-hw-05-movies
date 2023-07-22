import { HomePage } from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {SearchMovie} from './Pages/SearchMovie/SearchMovie'
import { MovieDetails } from "./Pages/MovieDetails/MovieDetails";
import {Cast} from '../components/Cast/Cast'

export const App = () => {
  return (

    <BrowserRouter basename="/">
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="movies" element={<SearchMovie/>}></Route>
        <Route path="/movies/:movieId" element={<MovieDetails/>}/>
        <Route path="/movies/:movieId/cast" element={<Cast/>}/>
        <Route path="*" element={<Navigate to={Routes.HomePage} replace/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
};