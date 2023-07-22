import { ReviewList } from "./Reviews.styled";
import { useEffect,useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMovieReviews } from "api/fetchFromApi";
import {MovieDetails} from '../Pages/MovieDetails/MovieDetails'

export const Reviews = () =>{
const [review,setReview] = useState([]);
const {movieId} = useParams();
const location=useLocation()

useEffect(()=>{
    const fetcher = async () =>{
        if(movieId===null){
            return;
        } else{
            try{
                const response = await fetchMovieReviews(movieId);
                console.log(response)
                setReview(response.results)
                console.log(location)
            } catch(error){
                console.log(error.message)
            }
        }
    }
    fetcher();
},[movieId])


return(
    <div>
        <MovieDetails/>
        <ReviewList>
            {review&&review.map(({id,author,content})=>{
                return(
                    <li key={id}>
                        <h4>{author}</h4>
                        <p>{content}</p>
                    </li>
                )
            })}
        </ReviewList>
    </div>
)

}