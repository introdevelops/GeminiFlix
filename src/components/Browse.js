import React,{useEffect} from 'react'
import Header from './Header.js';

import MainContainer from './MainContainer.js';
import SecondaryContainer from './SecondaryContainer.js';
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies.js';
import usePopularMovies from '../Hooks/usePopularMovies.js';

import GeminiSearch from './GeminiSearch.js';
import { useSelector } from 'react-redux';
import useTopRatedMovies from './../Hooks/useTopRatedMovies';
import useTrendingMovies from './../Hooks/useTrendingMovies';
import useUpcomingMovies from './../Hooks/useUpcomingMovies';
import useDecideApi from './../Hooks/useDecideApi';

import ShimmerCorousal from './ShimmerCorousal.js';




const Browse = () => {
  
  const showGeminiSearch =useSelector(store => store?.geminiSearch?.showGeminiSearch);
  
  
 

  
     

      useDecideApi();
   useNowPlayingMovies();
   useTrendingMovies();
   usePopularMovies();
    useTopRatedMovies();
      useUpcomingMovies();
       

  

   
  console.log("browse");
  return (
    <div>
     <Header/>
     {showGeminiSearch ? <GeminiSearch/> 
     :
      <>

      <MainContainer/>

      <div className="bg-orange-500 transform translate-y-[330px] z-50">
       <div className="bg-gray-900 z-50 ">  
       <SecondaryContainer/>
       </div>
       </div>

       <div className='flex flex-col bg-slate-800 overflow-x-hidden'>
   
    </div>   

      </>}
    </div>
  )
}

export default Browse;