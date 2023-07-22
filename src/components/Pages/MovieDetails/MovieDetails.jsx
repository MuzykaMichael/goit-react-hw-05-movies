import { MovieDetailsTopDiv,
    MovieDetailsHeader,
    MovieDetailsOverview,
    MovieDetailsGenres,
    MovieDetailsBotDiv,
    MovieDetailsDescription,
} from "./MovieDetails.styled";
import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import {fetchMovieDetails} from "api/fetchFromApi";
import defaultImage from '../../defaultImage.png'

export const MovieDetails = () =>{
    const [info,setInfo] = useState({});
    const location = useLocation();
    const {movieId} = useParams();

    
    
    useEffect(()=>{

        const fetchDetails = async () =>{
            if (movieId===null){
                return;
                } else {
                    try{
                        const response = await fetchMovieDetails(movieId);
                        // console.log(movieId)
                        // console.log(response)
                        setInfo({title:response.title, overview:response.overview, genres: response.genres,original_title:response.original_title,poster_path:response.poster_path,vote_average:response.vote_average,})
                        console.log(info.genres)
                    } catch(error){
                        console.log(error.message)
                    }
                }
        }

        fetchDetails();
    },[movieId])

    return(
        <>
        <MovieDetailsTopDiv>
            <img src={!info.poster_path?defaultImage:`https://image.tmdb.org/t/p/w500${info.poster_path}`} />
            <MovieDetailsHeader>{info.title}</MovieDetailsHeader>
            <MovieDetailsDescription>{info.original_title},User Score:{info.vote_average}</MovieDetailsDescription>
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
                    {/* <Link to={cast} element={<Cast/>}/> */}
                </li>
                <li>
                    
                </li>
            </ul>
        </MovieDetailsBotDiv>
        </>
    )
}