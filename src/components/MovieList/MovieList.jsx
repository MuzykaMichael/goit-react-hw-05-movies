import { MovieListing, MovieListItem } from "./MovieList.styled";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

export const MovieList = ({movies}) =>{
    const location = useLocation();
    return(
        <MovieListing>
        {movies.map(({title,id,original_title})=>
            <MovieListItem key={id}>
                <Link to={`/movies/${id}`} state={{from:location}}>{title||original_title}</Link>
            </MovieListItem>
        )}
        </MovieListing>
    )
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        original_title: PropTypes.string.isRequired,
    }).isRequired,).isRequired,
}

export default MovieList;