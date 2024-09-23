
import {GOOGLE_API_KEY } from "../utils/constants";




const useMovieTrailer =() =>{

   
    const getMovieTrailer = async (movieName) => {
      console.log("inside useMovietrailer :"+ movieName);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(movieName + ' trailer')}&key=${GOOGLE_API_KEY}`
        
        );
        const data = await response.json();
         console.log(data);
        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          console.log(`YouTube Video ID: ${videoId}`);
          return videoId;
        } else {
          console.log('No trailer found.');
          return null;
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
      }
    };
    

  

    return getMovieTrailer;






}

export default useMovieTrailer;


