import { useDispatch, useSelector } from "react-redux";
import { FETCH_OPTIONS } from "../utils/constants";
import {addPopularMovies} from "../utils/movieSlice";
import { useEffect } from "react";
import { popularMovies } from "../utils/movies";

const usePopularMovies = ()=>{
    const dispatch = useDispatch();
    const fetchChoice = useSelector(store=>store?.movies?.apiChoice);


   const getPopularMoviesFromTmdb = async () =>{
   try{
    const data= await fetch (
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        FETCH_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json?.results));
}catch(e){
    console.log("error in usePopularMovies");
}
};
 
    const getFromMovies=async () =>{
        dispatch(addPopularMovies(popularMovies.results));
    }

    const getPopularMovies = async()=>{
    if(fetchChoice==='tmdb'){ 
        await getPopularMoviesFromTmdb()}
        else{
            await getFromMovies();
        }
        }
useEffect(()=>{
   const id= setTimeout( getPopularMovies,10000);

   return ()=>{
    clearTimeout(id);
   }
},[fetchChoice])



}

export default usePopularMovies;