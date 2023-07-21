import { HomePage } from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {SearchMovie} from './Pages/SearchMovie/SearchMovie'
import { MovieDetails } from "./Pages/MovieDetails/MovieDetails";

export const App = () => {
  return (

    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="movies" element={<SearchMovie/>}></Route>
        <Route path='/movies/:movieId' element={<MovieDetails/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
};
