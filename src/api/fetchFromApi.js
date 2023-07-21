import axios from 'axios'


const apiRefs = {
  key: '2c6e7be86ec98be9c0020ecf9e4429f5',
  defaultURL: 'https://api.themoviedb.org/3',
  trendsURL: '/trending/movie/day',
  searchURL: '/search/movie',
  detailsURL: '/movie/',
  creditsURL: '/credits',
  reviewsURL:'/reviews'
}


export const fetchTrendsFromApi = async () =>{
  try {
    const response = await axios.get(`${apiRefs.defaultURL}${apiRefs.trendsURL}?api_key=${apiRefs.key}`)
    console.log(response.data.results)
    return response.data.results
  }
  catch (error) {
    console.log(error.message)
  }
}

export const fetchMovieByQuery = async (query) =>{
  try {
    const response = await axios.get(`${apiRefs.defaultURL}${apiRefs.searchURL}?api_key=${apiRefs.key}&query=${query}`)
    return response.data.results;
  }
  catch(error){
    console.log(error.message)
  }
}

export const fetchMovieDetails = async (id) =>{
  try{
    const response = await axios.get(`${apiRefs.defaultURL}${apiRefs.detailsURL}${id}?api_key=${apiRefs.key}`)
    return response.data;
  }
  catch(error){
    console.log(error.message)
  }
}

export const fetchMovieCredits = async (id) =>{
  try{
    const response = await axios.get(`${apiRefs.defaultURL}${apiRefs.detailsURL}${id}${apiRefs.creditsURL}?api_key=${apiRefs.key}`)
    return response.data;
  }
  catch(error){
    console.log(error.message)
  }
}

export const fetchMovieReviews = async (id) =>{
  try{
    const response = await axios.get(`${apiRefs.defaultURL}${apiRefs.detailsURL}${id}${apiRefs.reviewsURL}?api_key=${apiRefs.key}`)
    return response.data;
  } catch(error){
    console.log(error)
  }
}