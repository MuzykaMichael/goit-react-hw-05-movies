import { MovieDetailsTopDiv,
    MovieDetailsHeader,
    MovieDetailsOverview,
    MovieDetailsGenres,
    MovieDetailsBotDiv,
    MovieDetailsDescription,
} from "./MovieDetails.styled";
import { useEffect, useState } from "react";
import {  useParams, Link, useLocation } from "react-router-dom";
import {fetchMovieDetails} from "api/fetchFromApi";
import defaultImage from '../../defaultImage.png';
import { Cast } from "components/Cast/Cast";
import { Reviews } from "components/Reviews/Reviews";
import PropTypes from 'prop-types'



export const MovieDetails = () =>{
    const [info,setInfo] = useState({});
    const {movieId} = useParams();
    const [cast,setCast] = useState(false);
    const [reviews,setReviews] = useState(false);
    const location = useLocation();

    
    
    useEffect(()=>{

        const fetchDetails = async () =>{
            if (movieId===null){
                return;
                } else {
                    try{
                        const response = await fetchMovieDetails(movieId);
                        setInfo({title:response.title, overview:response.overview, genres: response.genres,original_title:response.original_title,poster_path:response.poster_path,vote_average:response.vote_average,})
                    } catch(error){
                        console.log(error.message)
                    }
                }
        }

        fetchDetails();
    },[movieId])


    const handleCastClick = () =>{
        setCast(true);
        setReviews(false);
    };

    const handleReviewsClick = () =>{
        setCast(false);
        setReviews(true);
    }

    return(
        <>
        <MovieDetailsTopDiv>
            <Link to={location.state.from}>Go back</Link>
            <img src={!info.poster_path?defaultImage:`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt={info.title} />
            <MovieDetailsHeader>{info.title}</MovieDetailsHeader>
            <MovieDetailsDescription>{info.original_title}, User Score:{info.vote_average*10}%</MovieDetailsDescription>
            <MovieDetailsOverview>Overview</MovieDetailsOverview>
            <MovieDetailsDescription>{info.overview}</MovieDetailsDescription>
            <MovieDetailsGenres>Genres</MovieDetailsGenres>
            <ul>
                {info.genres?.map(({id,name})=>{
                    return(
                    <li key={id}>
                        <p>{name}</p>
                    </li>
                    )
                })}
            </ul>
        </MovieDetailsTopDiv>
        <MovieDetailsBotDiv>
            <p>Additional information</p>
            <ul>
                <li>
                    <Link to="cast" onClick={handleCastClick}>Cast</Link>
                </li>
                <li>
                    <Link to="reviews" onClick={handleReviewsClick}>Reviews</Link>
                </li>
            </ul>
        </MovieDetailsBotDiv>
        {cast&&<Cast/>}
        {reviews&&<Reviews/>}
        </>
    )
}

MovieDetails.propTypes = {
info: PropTypes.shape({
    title: PropTypes.string.isRequired,
overview: PropTypes.string.isRequired,
genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}).isRequired,).isRequired,
original_title: PropTypes.string.isRequired,
poster_path: PropTypes.string.isRequired,
vote_average:PropTypes.string.isRequired,
})
    
}