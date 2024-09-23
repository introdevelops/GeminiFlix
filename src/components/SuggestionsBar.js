import React from 'react';
import { changeSearchText } from '../utils/geminiSlice';
import { useDispatch } from 'react-redux';

const SuggestionsBar = () => {

    const dispatch= useDispatch();

    const handleSearchText=(value) =>{
        dispatch(changeSearchText(value));
    }


  return ( <>
  <div className='lg:h-[50px]
  md:h-[40px] sm:h-[40px] h-[22px]
  lg:py-[4px] md:py-[4px] sm:py-[4px] py-[4px]
   lg:w-[390px] md:w-[70vw] sm:w-[60vw] w-[70%] 
   bg-transparent border border-white 
   lg:mt-[200px] md:mt-56 sm:mt-[200px] mt-40 
   lg:ml-[33%] md:ml-32 sm:ml-32 ml-[16vw] 
    z-[100] flex justify-center rounded-3xl mb-2'>
    
   
    <button className="text-white
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1 bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl lg:h-10 md:h-8 sm:h-8 h-4 z-50
    -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0   hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Comedy")}>Comedy</button>

    <button className="text-white -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0 
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1  bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl lg:h-10 md:h-8 sm:h-8 h-4 z-50  hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Horror ")}>Horror </button>

    <button className="text-white -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0 
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1  bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl lg:h-10 md:h-8 sm:h-8 h-4 z-50  hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Drama")}>Drama </button>

   

    <button className="text-white -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0 
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1  bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl lg:h-10 md:h-8 sm:h-8 h-4 z-50 hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Bollywood")}>Bollywood</button>
    
  </div>

  <div className='lg:h-[50px] 
  md:h-[40px] sm:h-[40px] h-[21px]
   lg:py-[4px] md:py-[4px] sm:py-[4px] py-[4px]
   lg:w-[340px] md:w-[50vw] sm:w-[45vw] w-[60vw] 
   bg-transparent border border-white 
   lg:mt-0 md:mt-0 sm:mt-0 mt-0 
   lg:ml-[35vw] md:ml-44 sm:ml-[30vw] ml-[19vw]
    z-[100] flex justify-center rounded-3xl'>

 
<button className="
    text-white -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0 
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1  bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl 
    lg:h-10 md:h-8 sm:h-8 h-4 z-50  hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Hollywood")}>Hollywood</button>

  <button className="text-white -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0 
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1  bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl lg:h-10 md:h-8 sm:h-8 h-4 z-50  hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Action")}>Action</button>

    <button className="text-white -mt-[2px] lg:-mt-0   md:-mt-0 sm:-mt-0 
    lg:px-4 md:px-2 sm:px-2 px-1 mr-1  bg-red-700 lg:text-base md:text-base sm:text-sm text-[7px] rounded-3xl lg:h-10 md:h-8 sm:h-8 h-4 z-50 hover:bg-red-900 active:bg-red-600" 
    onClick={()=>handleSearchText("Adventure")}>Adventure</button> 

    </div>
    </>
  )
}

export default SuggestionsBar