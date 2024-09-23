import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import MovieList from "./MovieList"

const GeminiMovieSuggestions = () => {
  const suggestions = useSelector((store)=>store?.geminiSearch?.suggestions);
  const recommendedMovies = useSelector((store)=>store?.geminiSearch?.recommendedMovies);

  
  useEffect(() => {
    console.log('Suggestions updated:', suggestions);
  }, [suggestions]);

  useEffect(() => {
    console.log('Recommended movies updated:', recommendedMovies);
  }, [recommendedMovies]);
  
  if(!suggestions) return null;

  return (<>
    {suggestions.length>0 && recommendedMovies.length>0 &&
      <div className="mt-52 z-50">
    
    <div className="bg-gray-800 z-50 -mt-1 -ml-4">
    <div className="-mt-48 pl-12 relative z-50 ">
      
      {recommendedMovies.map((element,index)=>{
        if(!Array.isArray(suggestions[index])){ 
         if(suggestions[index]?.Response==="true"){
            return <MovieList key={index} title = {element} movies= {suggestions[index]?.Search}/> 
           
          }
          else{
            return <></>
          }
        }
          return <>
          <MovieList key={index} title = {element} movies= {suggestions[index]}/> 
          </>
    

      })
      }
        </div>
        </div>
       </div>
    }
    </>
  )
}

export default GeminiMovieSuggestions;