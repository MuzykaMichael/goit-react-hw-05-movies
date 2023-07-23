import { HomePageHeader,} from "./HomePage.styled";
import { useState, useEffect } from "react";
import { fetchTrendsFromApi } from "api/fetchFromApi";
import { MovieList } from "components/MovieList/MovieList";
import { Loader } from "components/Loader/Loader";

export const HomePage = () =>{
    const [trends, setTrends] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);

    useEffect(() =>{
        setIsLoading(true);
        const getTrends = async () =>{
            try{
                const {results} = await fetchTrendsFromApi();
                setTrends(results);
            } catch(error){
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getTrends();
    },[])

    
    return (
        <>
            <HomePageHeader>Trending Today</HomePageHeader>
            {isLoading&&<Loader/>}
            {error&&<p>Oops, something went wrong...</p>}
            {trends.length>0?<MovieList movies={trends}/>:<p>No films for this day,come back later.</p>}
        </>
    )
}