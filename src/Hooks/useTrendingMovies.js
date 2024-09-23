import { useDispatch, useSelector } from "react-redux";
import { FETCH_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { trendingMovies } from "../utils/movies";




const useTrendingMovies =()=>{

    const dispatch= useDispatch();
    const fetchChoice = useSelector(store=>store?.movies?.apiChoice);


    console.log("inside useTrendingMovies");
  
  
    const getTrendingMoviesFromTmdb = async () => {
      console.log('Fetching trending movies...');
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          FETCH_OPTIONS
        );
        const json = await data.json();
        console.log('Fetched data:', json);
        dispatch(addTrendingMovies(json.results));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  


    const getFromMovies=async () =>{
      dispatch(addTrendingMovies(trendingMovies.results));
  }
  
  
  
  const getTrendingMovies = async()=>{
      if(fetchChoice==='tmdb'){ 
          await getTrendingMoviesFromTmdb()}
          else{
              await getFromMovies();
          }
          }
  
    useEffect(()=>{
     
      

    const id= setTimeout(getTrendingMovies,10000);

    return ()=>{
      clearTimeout(id);
    }
    },[fetchChoice]);

    return null;
  
  }
    
    


export default useTrendingMovies;