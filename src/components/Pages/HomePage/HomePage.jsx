import { HomePageHeader, HomePageList, HomePageListItem } from "./HomePage.styled";
import { useState, useEffect } from "react";
import { fetchTrendsFromApi } from "api/fetchFromApi";
import {Link} from 'react-router-dom'

export const HomePage = () =>{
    const [trends, setTrends] = useState([]);
    
    useEffect(() =>{
        const getTrends = async () =>{
            try{
                const {results} = await fetchTrendsFromApi();
                setTrends(results)

            } catch(error){
                console.log(error.message)
            }
        };
        getTrends();
    },[])

    
    return (
        <div>
            <HomePageHeader>Trending Today</HomePageHeader>
            <HomePageList>
                {trends.map(({title,id})=>
                    <HomePageListItem key={id}>
                        <Link to={`/movies/${id}`}>{title}</Link>
                    </HomePageListItem>
                )}
            </HomePageList>
        </div>
    )
}