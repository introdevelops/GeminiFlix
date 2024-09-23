import { useDispatch, useSelector } from "react-redux";
import { FETCH_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { upComingMovies } from "../utils/movies";




const useUpcomingMovies =()=>{

    const dispatch= useDispatch();
    const fetchChoice = useSelector(store=>store?.movies?.apiChoice);

    console.log("inside useUpcomingMovies");
  
  
    const getUpcomingMoviesFromTmdb = async () => {
      console.log('Fetching upcoming movies...');
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          FETCH_OPTIONS
        );
        const json = await data.json();
        console.log('Fetched data:', json);
        dispatch(addUpcomingMovies(json.results));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  


    const getFromMovies=async () =>{
      dispatch(addUpcomingMovies(upComingMovies?.results));
  }
  
  
  
  const getUpcomingMovies = async()=>{
      if(fetchChoice==='tmdb'){ 
          await getUpcomingMoviesFromTmdb()}
          else{
              await getFromMovies();
          }
          }
  
    useEffect(()=>{
     
      

     const id= setTimeout(getUpcomingMovies,10000);


      return ()=>{
        clearTimeout(id);
      }
    },[fetchChoice]);

    return null;
  
  }
    



export default useUpcomingMovies;