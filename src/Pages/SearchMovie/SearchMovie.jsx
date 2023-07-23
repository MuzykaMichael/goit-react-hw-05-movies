import {SearchForm,
    SearchInput,
    FormButton,
    SearchMovieDiv,
    } from './SearchMovie.styled';
import { fetchMovieByQuery } from 'api/fetchFromApi';
import {useState, useEffect,} from 'react'
import {useSearchParams} from 'react-router-dom'
import { MovieList } from 'components/MovieList/MovieList';
import { Loader } from 'components/Loader/Loader';

export const SearchMovie = () =>{
    const [inputValue,setInputValue] = useState('');
    const [movies,setMovies] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams()
    const query = searchParams.get('query');
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);

    useEffect(()=>{
        if (query===null){
            return;
        }
        setIsLoading(true);
        const fetcher = async() =>{
            try {
                const response = await fetchMovieByQuery(query)
                if (response.length===0){
                    console.alert("0 films matching query")
                } 
                setMovies(response)
            }
            catch(error){
                setError(error.message)
            } finally{
                setIsLoading(false);
            }
        }
        fetcher();
    },[query])

    const handleSubmit = evt =>{
        evt.preventDefault();
        const q = inputValue.trim();
        if (q!==''){
            setSearchParams({query:q})
        } else {
            return null;
        }

    }

    const handleChange = evt =>{
        setInputValue(evt.target.value);
    }


    return(
        <div>
            <SearchForm onSubmit={handleSubmit}>
                <SearchInput
                type='text'
                name='query'
                onChange={handleChange}
                value={inputValue}/>
                <FormButton>Search</FormButton>
            </SearchForm>
            <SearchMovieDiv>
                {isLoading&&<Loader/>}
                {error&&<p>Oops, something went wrong...</p>}
                {movies.length>0?<MovieList movies={movies}/>:<div>No films matching your query</div>}
            </SearchMovieDiv>
        </div>
    )

}

export default SearchMovie;