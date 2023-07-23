import {CastList,
    CastListItem,} from './Cast.styled'
import {useState,useEffect} from 'react'
import {fetchMovieCredits} from '../../api/fetchFromApi'
import { useParams } from 'react-router-dom'
import defaultImage from '../defaultImage.png'
import { Loader } from 'components/Loader/Loader'

export const Cast = () =>{
const [cast,setCast] = useState([])
const {movieId} = useParams(); 
const [isLoading,setIsLoading] = useState(false);
const [error,setError] = useState(false);

useEffect(()=>{
    setIsLoading(true)
    const fetcher = async ()=>{
            try{
                const response = await fetchMovieCredits(movieId);
                setCast(response.cast)
            } catch(error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
    }
    fetcher();
},[movieId])


return(
    <>
    {isLoading&&<Loader/>}
    {error&&<p>Oops, something went wrong...</p>}
    <CastList>
            {cast.length > 0? cast.map(({id,character,name,profile_path})=>{
                return(
                    <CastListItem key={id}>
                        <img src={!profile_path?defaultImage:`https://image.tmdb.org/t/p/w200${profile_path}`} alt={name}/>
                        <p>{name}</p>
                        <p>Character:{character}</p>
                    </CastListItem>
                )
            }):<div>We can't find actors.</div>}
        </CastList>
    </>
)

}

export default Cast;
