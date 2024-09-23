import React, { useState } from 'react';
import GeminiSearchBar from './GeminiSearchBar';
import GeminiMovieSuggestions from './GeminiMovieSuggestions';
import { BG_IMG } from '../utils/constants';
import SuggestionsBar from './SuggestionsBar';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import background4 from '../images/background4.jpg';




const GeminiSearch = () => {

  const langOption=useSelector((store)=>store?.geminiSearch?.langOption);
  const isClicked= useSelector((store)=>store?.geminiSearch?.isClicked);
  const suggestions= useSelector((store)=>store?.geminiSearch?.suggestions);
 




  return (
    <div className="bg-black z-20 overflow-hidden">
      <div className='relative w-full z-30'> 
     
      <img 
      src={background4} alt="bg-image" className="-z-50 fixed top-0 left-0 bottom-0 right-0 w-full h-full object-cover filter blur-sm " />
      
        <GeminiSearchBar />
      <SuggestionsBar/>
      </div>
    {!isClicked &&  <GeminiMovieSuggestions />}
   {isClicked && <div className='bg-slate-800 mt-[340px]'> <Shimmer/></div>}
    </div>
  );
};

export default GeminiSearch;
