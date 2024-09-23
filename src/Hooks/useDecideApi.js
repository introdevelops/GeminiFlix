import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import {setApiChoice} from '../utils/movieSlice.js';
import { FETCH_OPTIONS } from './../utils/constants';


const useDecideApi = () => {
  
    const selectedApi = useRef(null); 
    const dispatch = useDispatch();
  

// TMDB movie search
const searchMoviesTmdb = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&language=en-US&include_adult=false&page=1`,
      FETCH_OPTIONS
    );
    if (!response.ok) throw new Error("TMDB fetch failed");
    const json = await response.json();
    return json.results;
  };
  
// TMDB shows search
  const searchShowsTmdb = async (shows) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${shows}&language=en-US&include_adult=false&page=1`,
      FETCH_OPTIONS
    );
    if (!response.ok) throw new Error("TMDB fetch failed");
    const json = await response.json();
    return json.results;
  };
  

// OMDB movie or shows search  
  const searchOmdb = async (query) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=c9eb1bb2&s=${encodeURIComponent(query)}`
      );
  
      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error(`OMDB request failed with status: ${response.status}`);
      }
  
      const json = await response.json();
  
      // Check if OMDB's Response is 'True' and the Search array exists
      if (json.Response === "True" && Array.isArray(json.Search)) {
        return json.Search; // Return the array of search results
      } else {
        // If the API response is not successful, throw an error
    console.log("movie not found");
    return [];
    
      }
    } catch (error) {
      // Log the error and rethrow it so the calling function can handle it
      console.error("OMDB fetch error:", error);
      return []
    }
  };
  
  
  const decideApi = async (video, isShows) => {
    try {
      // Send fetch requests to both TMDB and OMDB
      const [tmdbResponse, omdbResponse] = await Promise.allSettled([
        isShows ? searchShowsTmdb(video) : searchMoviesTmdb(video),
        searchOmdb(video),
      ]);

      // Handle the results and decide which API to use for future requests
      if (tmdbResponse.status === "fulfilled" && omdbResponse.status === "fulfilled") {
        // Both TMDB and OMDB returned success, prioritize TMDB
        selectedApi.current = "tmdb";
        return tmdbResponse.value;
      } else if (tmdbResponse.status === "fulfilled" && omdbResponse.status === "rejected") {
        // TMDB succeeded, OMDB failed, choose TMDB
        selectedApi.current = "tmdb";
        return tmdbResponse.value;
      } else if (tmdbResponse.status === "rejected" && omdbResponse.status === "fulfilled") {
        // TMDB failed, OMDB succeeded, choose OMDB
        selectedApi.current = "omdb";
        return omdbResponse.value;
      } else {
        // Both failed, handle the error
        // throw new Error("Both TMDB and OMDB fetch failed");
        console.log('error in both tmdb omdb ');
        
      }
    } catch (error) {
      console.error("API decision error:", error);
      throw error;
    }
  };

  // Main search logic to use the decided API for all future requests
  const searchMoviesOrShows = async (video, isShows) => {
    if (!selectedApi.current) {
     
      return await decideApi(video, isShows);
    } else {
    
       
    }
  };
  
  searchMoviesOrShows("Avengers",false);
  
  useEffect(()=>{
    
    
    dispatch(setApiChoice(selectedApi.current));

  },[selectedApi]);

    return (
         <div>
     </div>
  )
}

export default useDecideApi;