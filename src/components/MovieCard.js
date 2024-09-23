import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {setModalClicked,setMovieTitle} from '../utils/movieSlice';

const MovieCard = ({ title,posterPath }) => {
  const dispatch= useDispatch();
  const [isImageValid, setIsImageValid] = useState(true); // Track if the image is valid
  const desiredCardHeight = 350; // Set your desired card height

  // Check the image dimensions on load
  const handleImageLoad = (event) => {
    const imgHeight = event.target.naturalHeight;

    // Skip rendering if the height is smaller than the card height
    if (imgHeight < desiredCardHeight) {
      setIsImageValid(false);
    }
  };

  // Handle image loading error
  const handleImageError = () => {
    setIsImageValid(false); // Mark the image as invalid if it fails to load
  };

  // Don't render anything if the image is not valid or posterPath is missing
  if (!isImageValid || !posterPath) {
    return null; // Return null if the image is invalid or path is missing
  }

  return (
    <div 
   
    className="lg:w-52 md:w-48 
    sm:w-36 w-[110px]
     h-64 pr-4 z-50
      mr-1 lg:mr-0 md:mr-0 sm:mr-0  ">
      <img
         onClick={()=>{
          dispatch(setMovieTitle(title));
          dispatch(setModalClicked(true));
        }}
        className='cursor-pointer hover:border border-white'
        alt="" // Avoid showing alt text
        src={posterPath}
        onLoad={handleImageLoad} // Check image dimensions
        onError={handleImageError} // Handle image loading error
        style={{ maxHeight: desiredCardHeight }} // Optionally control max height
      />
    </div>
  );
};

export default MovieCard;
