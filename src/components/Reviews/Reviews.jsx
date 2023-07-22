import { ReviewList } from "./Reviews.styled";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "api/fetchFromApi";

export const Reviews = () =>{
const [review,setReview] = useState([]);
const {movieId} = useParams();

useEffect(()=>{
    const fetcher = async () =>{
        if(movieId===null){
            return;
        } else{
            try{
                const response = await fetchMovieReviews(movieId);
                console.log(response)
                setReview(response.results)
            } catch(error){
                console.log(error.message)
            }
        }
    }
    fetcher();
},[movieId])


return(
    <div>
        <ReviewList>
            {review&&review.map(({id,author,content})=>{
                return(
                    <li key={id}>
                        <h4>{author}</h4>
                        <p>{content}</p>
                    </li>
                )
            })}
            {!review&&<div>Sorry, no reviews on this film.</div>}
        </ReviewList>
    </div>
)

}