import {SearchForm,
    SearchInput,
    FormButton,
    SearchMovieDiv,
    } from './SearchMovie.styled';
import { HomePageList, HomePageListItem } from "../HomePage/HomePage.styled";
import { fetchMovieByQuery } from 'api/fetchFromApi';
import {useState, useEffect,} from 'react'
import {useSearchParams,Link} from 'react-router-dom'


export const SearchMovie = () =>{
    const [inputTracker,setInputTracker] = useState('');
    const [load,setLoad] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams()
    const query = searchParams.get('query');

    useEffect(()=>{
        if (query===null){
            return;
        }

        const fetcher = async() =>{
            try {
                const response = await fetchMovieByQuery(query)
                if (response.length>0){
                    setLoad(response)
                } else {
                    console.log("0 films matching query")
                }
            }
            catch(error){
                console.log(error.message)
            }
        }
        fetcher();
    },[query])

    const handleSubmit = evt =>{
        evt.preventDefault();
        const q = inputTracker.trim();
        if (q!==''){
            setSearchParams({query:q})
        } else {
            return null;
        }

    }

    const handleChange = evt =>{
        setInputTracker(evt.target.value);
    }


    return(
        <div>
            <SearchForm onSubmit={handleSubmit}>
                <SearchInput
                type='text'
                name='query'
                onChange={handleChange}
                value={inputTracker}/>
                <FormButton>Search</FormButton>
            </SearchForm>
            <SearchMovieDiv>
                <HomePageList>
                    {load.map(({id,title})=>{
                    return(
                    <HomePageListItem key={id}>
                        <Link to={`/movies/${id}`}>{title}</Link>
                    </HomePageListItem>
                    )
                    })}
                </HomePageList>
            </SearchMovieDiv>
        </div>
    )

}