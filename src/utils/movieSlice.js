import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({

   name :"movies",
   initialState: {
        nowPlayingMovies:null,
        trailerVideo : null,
        popularMovies: null,
        trendingMovies: null,
        topRatedMovies:null,
        upcomingMovies:null,
        apiChoice:"tmdb",
        modalClicked:false,
        movieTitle:"",
   },
   reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addTrailerVideo: (state,action)=>{
          state.trailerVideo = action.payload;
        },
        addPopularMovies:(state,action)=>{
          state.popularMovies= action.payload;
        },
        addTrendingMovies: (state,action)=>{
          state.trendingMovies= action.payload;
        },
        addTopRatedMovies: (state,action)=>{
          state.topRatedMovies=action.payload;
        },
        addUpcomingMovies: (state,action)=>{
          state.upcomingMovies=action.payload;
        },
        setApiChoice: (state,action)=>{
          state.apiChoice = action.payload;
        },
        setModalClicked:(state,action)=>{
          state.modalClicked=action.payload;
        },
        setMovieTitle: (state,action)=>{
          state.movieTitle=action.payload;
        }

   }

})

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRatedMovies,addTrendingMovies,addUpcomingMovies,setApiChoice,setModalClicked,setMovieTitle} = movieSlice.actions;

export default movieSlice.reducer;