import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FETCH_OPTIONS } from "../utils/constants";
import { addSuggestions, setIsClicked } from "../utils/geminiSlice";

const useSuggestions = () => {
  const dispatch = useDispatch();
  const [finalData, setFinalData] = useState([]);
  const selectedApi = useRef(null); // Track the selected API (tmdb or omdb)

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

  // TMDB TV show search
  const searchShowsTmdb = async (shows) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${shows}&language=en-US&include_adult=false&page=1`,
      FETCH_OPTIONS
    );
    if (!response.ok) throw new Error("TMDB fetch failed");
    const json = await response.json();
    return json.results;
  };

  // OMDB search for both movies and TV shows
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
  



  //Dual API fetch to make a decision (only for the first request)
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
      // No API selected yet, make the initial dual API decision
      return await decideApi(video, isShows);
    } else {
      // Use the selected API for subsequent requests
      if (selectedApi.current === "tmdb") {
        return isShows ? await searchShowsTmdb(video) : await searchMoviesTmdb(video);
      } else {
        return await searchOmdb(video);
      }
    }
  };

  const handleSuggestionToShow = async (searchText, recommendedMovies) => {
    console.log("inside handleSuggestionToShow");
  
    let isShowsSearch = false;
  
    // Determine if the search text suggests looking for TV shows
    if (searchText) {
      isShowsSearch =
        searchText.includes("show") ||
        searchText.includes("season") ||
        searchText.includes("episode") ||
        searchText.includes("tv");
    }
  
    // Decide which API to use based on the first movie in the list
    const firstMovie = recommendedMovies[0].split(" ").slice(0,2).join(' ');
    let apiDecisionResults = await searchMoviesOrShows(firstMovie, isShowsSearch);

    // If no result is returned from the first query, stop further execution
    if (!apiDecisionResults) {
      console.log("No results from the first query. Aborting further requests.");
      return [];
    }
  
    // Now, process remaining movies using the decided API
    const remainingResults = await Promise.all(
      recommendedMovies.slice(1).map((video) => searchMoviesOrShows(video, isShowsSearch))
    );
  
    // Combine the first result with the remaining results
    const allResults = [apiDecisionResults, ...remainingResults];
  
    // Preserve order, handling TMDB (arrays) and OMDB (objects)
    const finalResults = allResults.map((result) => {
      if (Array.isArray(result)) {
        return result.length > 0 ? result : []; // TMDB results (filtered)
      }
      return result; // OMDB results (unfiltered)
    });
  
    console.log(finalResults);
  
    dispatch(addSuggestions({ recommendedMovies, finalResults }));
    dispatch(setIsClicked(false));
    console.log(finalResults);
  
    if (Array.isArray(finalResults) && finalResults.length > 0) {
      setFinalData(finalResults);
      console.log("Results processed.");
    }
  
    return finalData;
  };
  

  return { handleSuggestionToShow };
};

export default useSuggestions;



















