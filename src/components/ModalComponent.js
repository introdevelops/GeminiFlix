import React, { useEffect, useState } from 'react'
import { setModalClicked } from '../utils/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import useMovieTrailer from '../Hooks/useMovieTrailer';

const ModalComponent = () => {

  const getMovieTrailer=useMovieTrailer();
  const [movieId,setMovieId]=useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const title=useSelector(store=>store?.movies?.movieTitle);
  const modalClicked=useSelector(store=>store?.movies?.modalClicked);
  const dispatch=useDispatch();


  useEffect(()=>{
    console.log("useEffect from modalcomponent");

    const handleMovieId=async ()=>{
      if(title && modalClicked){
       const id=await getMovieTrailer(title);
       setMovieId(id);
      }

    }

    handleMovieId();

  },[title]);

  

const handleVideoLoad = () => {
  setIsVideoLoaded(true);
  console.log("Video loaded");
};



   
  return (
    <div 
    onClick={(e)=>{
     dispatch(setModalClicked(false));
    }}
    className="fixed top-0 left-0 right-0 bottom-0 z-[150] bg-black bg-opacity-90 h-full w-screen border border-black flex justify-center items-center">
            <div 
            onClick={(e)=>{
              e.stopPropagation();
            }}
            className="bg-tranparent h-[95vh]  w-[90vw] z-[160] shadow-lg rounded-lg">

    <div className='m-4 font-bold text-white lg:text-3xl md:text-3xl sm:text-xl text-base flex flex-row justify-between line-clamp-1 p-1'>
      {title}<i  
    onClick={(e)=>{
     dispatch(setModalClicked(false));
    }} 
    className="ri-close-line bg-red-600 cursor-pointer active:bg-red-800 rounded-md lg:h-9 md:h-9 sm:h-9 h-8
    lg:w-8 md:w-8 sm:w-8 w-7 text-3xl"></i></div>
  <div className=''>
    {!isVideoLoaded && <div className='bg-white'></div>}
    <iframe
      className='w-[90vw] h-[445px] aspect-video rounded-b-lg mt-[20px] backdrop-blur-sm'
      src={`https://www.youtube.com/embed/${movieId}?&autoplay=1&mute=1&loop=1&controls=0disablekb=1&modestbranding=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${movieId}`}
      title="YouTube video player"
      allow="autoplay; encrypted-media;"
      allowFullScreen
      onLoad={handleVideoLoad}
    ></iframe>
  </div>





            </div>
      </div>
  )
}

export default ModalComponent