import { MovieDetailsTopDiv,
    MovieDetailsHeader,
    MovieDetailsOverview,
    MovieDetailsGenres,
    MovieDetailsBotDiv,
    MovieDetailsDescription,
} from "./MovieDetails.styled";
import { useEffect, useState, useRef, Suspense } from "react";
import {  useParams, Link, useLocation, Outlet } from "react-router-dom";
import {fetchMovieDetails} from "api/fetchFromApi";
import defaultImage from '../../defaultImage.png';
import { Loader } from "components/Loader/Loader";


export const MovieDetails = () =>{
    const [info,setInfo] = useState({});
    const {movieId} = useParams();
    const location = useLocation();
    const goBack = useRef(location?.state?.from ?? '/');
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);
    
    useEffect(()=>{
        setIsLoading(true)
        const fetchDetails = async () =>{
                    try{
                        const response = await fetchMovieDetails(movieId);
                        setInfo({title:response.title, overview:response.overview, genres: response.genres,original_title:response.original_title,poster_path:response.poster_path,vote_average:response.vote_average,})
                    } catch(error){
                        setError(error.message)
                    } finally {
                        setIsLoading(false)
                    }
        }

        fetchDetails();
    },[movieId])



    return(
        <>
        {isLoading&&<Loader/>}
        {error&&<p>Oops, something went wrong...</p>}
        <MovieDetailsTopDiv>
            <div>
            <Link to={goBack.current}>Go back</Link>
            <img src={!info.poster_path?defaultImage:`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt={info.title} />
            </div>
            <div>
            <MovieDetailsHeader>{info.title}</MovieDetailsHeader>
            <MovieDetailsDescription>{info.original_title}, User Score:{info.vote_average*10}%</MovieDetailsDescription>
            <MovieDetailsOverview>Overview</MovieDetailsOverview>
            <MovieDetailsDescription>{info.overview}</MovieDetailsDescription>
            <MovieDetailsGenres>Genres</MovieDetailsGenres>
            <ul>
                {info.genres.length>0?info.genres.map(({id,name})=>{
                    return(
                    <li key={id}>
                        <p>{name}</p>
                    </li>
                    )
                }):<p>No information for that film</p>}
            </ul>
            </div>
        </MovieDetailsTopDiv>
        <MovieDetailsBotDiv>
            <p>Additional information</p>
            <ul>
                <li>
                    <Link to="cast">Cast</Link>
                </li>
                <li>
                    <Link to="reviews">Reviews</Link>
                </li>
            </ul>
        </MovieDetailsBotDiv>
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet/>
        </Suspense>
        </>
    )
}

