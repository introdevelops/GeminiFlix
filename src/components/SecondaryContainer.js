import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerCorousal from "./ShimmerCorousal";



const SecondaryContainer = () => {
    const movies = useSelector((store)=> store.movies);
    const playingMovies = useSelector(store => store?.movies?.nowPlayingMovies);
    const upcomingMovies = useSelector(store => store?.movies?.upcomingMovies);
  const topRatedMovies = useSelector(store => store?.movies?.topRatedMovies);
  
  const trendingMovies = useSelector(store => store?.movies?.trendingMovies);
  const popularMovies = useSelector(store => store?.movies?.popularMovies);

   if(!movies) return null;


   return  (
      
       <div className="lg:-mt-[385px] md:-mt-[350px]
       sm:-mt-[365px]
       xs:-mt-[390px]
       -mt-[400px] bg-gray-900 pl-6 relative z-50 overflow-hidden flex flex-col justify-between ">
        
       {(playingMovies) ? <MovieList title = {"Now Playing" } movies= {movies?.nowPlayingMovies}/>:<div className="lg:ml-1 md:ml-1 file:sm:ml-0 -ml-6 -mt-1"><ShimmerCorousal/></div>}
       {(trendingMovies)? <MovieList title = {"Trending" } movies= {movies?.trendingMovies}/>:<div className="lg:ml-1 md:ml-1 sm:ml-0 -ml-6 lg:-mt-12 md:-mt-12 sm:-mt-12 mt-2"><ShimmerCorousal/></div>}
       {(popularMovies)? <MovieList title = {" Popular" } movies= {movies?.popularMovies}/>: <div className="lg:ml-1 md:ml-1 sm:ml-0 -ml-6  lg:-mt-8 md:-mt-8 sm:-mt-8 mt-2"><ShimmerCorousal/></div>}
      {(topRatedMovies)?  <MovieList title = {"Top Rated" } movies= {movies?.topRatedMovies}/>:<div className="lg:ml-1 md:ml-1 sm:ml-0 -ml-6  lg:-mt-10 md:-mt-10 sm:-mt-10 mt-2 "><ShimmerCorousal/></div>}
      {(upcomingMovies)?  <MovieList title = {"Upcoming"} movies= {movies?.upcomingMovies}/>:<div className="lg:ml-1 md:ml-1 sm:ml-0 -ml-6 lg:-mt-10 md:-mt-10 sm:-mt-10 mt-2"><ShimmerCorousal/></div>}
        </div>
        
        
         )
}


export default SecondaryContainer;