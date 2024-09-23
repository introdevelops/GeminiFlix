import React, { useRef, useEffect } from 'react';
import MovieCard from './MovieCard';
import { IMG_CDN_URL } from '../utils/constants';

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheelScroll = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    if (scrollContainer && movies.length>5) {
      scrollContainer.addEventListener('wheel', handleWheelScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, []);

  if (!movies) {
    return null;
  }

  return (
    <div className="lg:p-5
    md:p-5
    sm:p-5 
    p-2 
    lg:-ml-4 
    md:-ml-4
    sm:-ml-2
    -ml-6
    bg-transparent z-50 overflow-hidden">
      <h1 className="lg:text-3xl 
      md:text-3xl sm:text-2xl 
      text-sm
      lg:py-6
      md:py-6
      sm:py-6
      py-4 text-white">{title}</h1>
      <div
        ref={scrollContainerRef}
        className={`flex ${
          movies.length && movies.length <= 5
            ? 'overflow-hidden'
            : 'overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-white scrollbar-corner-transparent'
        } w-[104%] mt-1 mb-2`}
      >
        <div className="flex lg:mb-2
        md:mb-2 sm:-mb-10 -mb-28 ">
          {movies?.map((movie, index) => {
            if (movie && movie?.imdbID) {
              return <MovieCard key={movie?.imdbID} title={movie?.Title} posterPath={movie?.Poster} />;
            }
            return <MovieCard key={movie?.id} title={movie?.original_title} posterPath={`${IMG_CDN_URL}${movie.poster_path}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
