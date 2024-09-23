import { useDispatch, useSelector } from "react-redux";
import { FETCH_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { nowPlayingMovies } from './../utils/movies';




const useNowPlayingMovies =()=>{

    const dispatch= useDispatch();
    const fetchChoice = useSelector(store=> store?.movies?.apiChoice);
    console.log("inside useNowPlayingMovies");
  
   const  getFromMovies = async () =>{
        console.log('getfromMovie executed');
    dispatch(addNowPlayingMovies(nowPlayingMovies?.results));
    }
  
    const getFromTmdb = async () => {
      console.log('Fetching now playing movies from tmdb');
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          FETCH_OPTIONS
        );
        const json = await data.json();
        console.log('Fetched data:', json);
        dispatch(addNowPlayingMovies(json.results));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  
      const getNowPlayingMovies=async()=>{
       if(fetchChoice==="tmdb") {
        await getFromTmdb();
       }else{
        await getFromMovies();
       }
      }
  
    useEffect(()=>{

      const id = setTimeout(getNowPlayingMovies,20000);

      return ()=>{
        clearTimeout(id);
      }
    },[fetchChoice]);

    return null;
  
  }
    
    


export default useNowPlayingMovies;