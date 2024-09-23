import { useDispatch, useSelector } from "react-redux";
import { FETCH_OPTIONS } from "../utils/constants";
import {addTopRatedMovies} from "../utils/movieSlice";
import { useEffect } from "react";
import { topRatedMovies } from "../utils/movies";

const useTopRatedMovies = ()=>{
    const dispatch = useDispatch();
    const fetchChoice = useSelector(store=>store?.movies?.apiChoice);

   const getTopRatedMoviesFromTmdb = async () =>{
  try{
    const data= await fetch (
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        FETCH_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json?.results));
}
catch(e){
    console.log("error in useTopRatedMovies");
}
};

const getFromMovies=async () =>{
    dispatch(addTopRatedMovies(topRatedMovies?.results));
}



const getTopRatedMovies = async()=>{
    if(fetchChoice==='tmdb'){ 
        await getTopRatedMoviesFromTmdb()}
        else{
            await getFromMovies();
        }
        }

useEffect(()=>{

  const id=setTimeout(getTopRatedMovies,10000);

  return ()=>{
    clearTimeout(id);
  }
},[fetchChoice])



}

export default useTopRatedMovies;