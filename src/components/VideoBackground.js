

import {  useState } from 'react';

const VideoBackground = ({title, movieId }) => {
 
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);



  

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    console.log("Video loaded");
  };

if(!movieId){
  return <div className='bg-black lg:h-[800px] md:h-[600px] sm:h-[400px] h-[350px] w-screen'></div>;
}

  return (
    <div className='w-screen -z-20 '>
      {!isVideoLoaded && <div className='bg-black
      xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 
      lg:h-[700px] w-[100%] md:h-[600px] sm:h-[500px] h-[350px] z-25 absolute inset-0 mt-16 '>Loading...</div>}
     <iframe
        className='aspect-video w-[100%] xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 -mt-[55px] -z-20 xl:h-[700px] lg:h-[600px] md:h-[500px] sm:h-[400px] h-[350px]'
        src={`https://www.youtube.com/embed/${movieId}?&autoplay=1&mute=1&loop=1&controls=0disablekb=1&modestbranding=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${movieId}`}
        title="YouTube video player"
        allow="autoplay; encrypted-media;"
        allowFullScreen
        onLoad={handleVideoLoad}
      ></iframe>
    </div>
  );
}

export default VideoBackground;
