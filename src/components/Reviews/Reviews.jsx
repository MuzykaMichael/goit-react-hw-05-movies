import { ReviewList } from "./Reviews.styled";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "api/fetchFromApi";
import { Loader } from "components/Loader/Loader";

export const Reviews = () =>{
const [review,setReview] = useState([]);
const {movieId} = useParams();
const [isLoading,setIsLoading] = useState(false);
const [error,setError] = useState(false);

useEffect(()=>{
    setIsLoading(true);
    const fetcher = async () =>{
            try{
                const response = await fetchMovieReviews(movieId);
                setReview(response.results);
            } catch(error){
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
    }
    fetcher();
},[movieId])


return(
    <>
        {isLoading&&<Loader/>}
        {error&&<p>Oops, something went wrong...</p>}
        <ReviewList>
            {review.length>0?review.map(({id,author,content})=>{
                return(
                    <li key={id}>
                        <h4>{author}</h4>
                        <p>{content}</p>
                    </li>
                )
            }):<div>Sorry, no reviews on this film.</div>}
        </ReviewList>
    </>
)

}