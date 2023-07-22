import {CastList,
    CastListItem,} from './Cast.styled'
import {useState,useEffect} from 'react'
import {fetchMovieCredits} from '../../api/fetchFromApi'
import { useLocation, useParams } from 'react-router-dom'
import defaultImage from '../defaultImage.png'


export const Cast = () =>{
const location = useLocation();
const [cast,setCast] = useState([])
const {movieId} = useParams(); 
useEffect(()=>{
    const fetcher = async ()=>{
        if (movieId===null){
            return;
        } else {
            try{
                const response = await fetchMovieCredits(movieId);
                setCast(response.cast)
            } catch(error) {
                console.log(error.message)
            }
        }
    }
    fetcher();
},[movieId])


return(
    <div>
        <CastList>
            {cast.map(({id,character,name,profile_path})=>{
                return(
                    <CastListItem key={id}>
                        <img src={!profile_path?defaultImage:`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name}/>
                        <p>{name}</p>
                        <p>Character:{character}</p>
                    </CastListItem>
                )
            })}
        </CastList>
    </div>
)

}