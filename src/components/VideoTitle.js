


const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white  z-30">
    <div className="bg-gradient-to-r from-slate-900 opacity-80 w-[100%] lg:h-[700px] md:h-[600px] sm:h-[500px] xs:h-[83%] h-[250px] -z-50 absolute top-[5rem] left-0
    lg:mt-0 md:mt-0 sm:-mt-4 -mt-6 
    "
    ></div>

     <h1 className="lg:text-5xl  
     md:text-3xl sm:text-2xl 
     text-[12px] leading-3 font-bold lg:mt-12  lg:-ml-10 md:mt-16 md:-ml-16 
     sm:mt-7 
     sm:-ml-16 
     mt-10 -ml-20 ">{title}</h1>
      <p className="lg:py-6 md:py-4 sm:py-4 py-3 lg:text-lg md:text-base
      sm:text-sm
      text-[8px] lg:w-1/4 md:w-[250px] sm:w-2/4 w-[120px]
      lg:line-clamp-4
      md:line-clamp-3
      sm:line-clamp-3
      line-clamp-2 lg:mb-6 md:mb-5 sm:mb-4 mb- lg:-ml-10 md:-m;-10 sm:-ml-16 
      -ml-20">{overview}</p>
    <div>

      <button className="bg-white text-black lg:p-4 md:p-4 sm:p-3 p-1 lg:px-10
      md:px-6 sm:px-6 
      px-2 
      lg:py-2
      md:py-2
      sm:py-2
      py-0
      lg:text-3xl
      md:text-sm 
      sm:text-base
      text-[8px] rounded-lg hover:bg-opacity-80 lg:-ml-12
      md:-ml-16 sm:-ml-16
      -ml-20 active:bg-gray-400 hover:bg-gray-600 
      "><i class="ri-play-large-fill mr-1"></i>Play</button>
      <button className="bg-gray-800 mx-2 text-white lg:p-4 md:p-4 sm:p-3 p-1 lg:px-10
      md:px-8
       sm:px-8 
      px-3 
      lg:py-2
      md:py-2
      sm:py-2
      py-0
      lg:text-3xl
      md:text-sm 
      sm:text-base
      text-[8px]  bg-opacity-50 rounded-lg 
      lg:-mt-0 md:-mt-0 sm:-mt-0
    
     
       active:bg-gray-500  ">
      <i className="ri-info-i mr-1 bg-black"></i>Info</button>
    </div>
    </div>
  )
}

export default VideoTitle;