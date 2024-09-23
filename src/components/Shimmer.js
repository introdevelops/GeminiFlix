import React from 'react';
import ShimmerCorousal from './ShimmerCorousal';

const Shimmer = () => {
  const shimmerArray = Array.from({ length: 6}, (_, index) => index + 1);

  return (
  
  <div className="bg-transparent z-50 lg:ml-9 md:ml-9 sm:ml-9 ml-1 -mt-96  pt-20">

    <div className=" flex  flex-col p-3 mt-4 z-50 bg-tranparent">

      <div className='lg:h-8 md:h-8 sm:h-8 h-6 lg:w-[250px] md:w-[250px] sm:w-[200px] w-[100px]  bg-slate-300 opacity-80 z-[60] mb-8 lg:-mt-0 md:-mt-0 sm:-mt-0 -mt-6 rounded-lg '>  
        <div className='bg-slate-500 lg:h-8 md:h-8 sm:h-8 h-6 lg:w-[250px] md:w-[250px] sm:w-[200px] w-[100px]  rounded-lg animate-pulse p-[6px] pl-2'>
        
           <div className='lg:w-32 md:w-32 sm:w-32 w-20  lg:h-2 md:h-2 sm:h-2 h-1 bg-slate-600 mb-1 rounded-lg '>
           </div>
           <div  className='lg:w-16 md:w-16 sm:w-16 w-12 lg:h-2 md:h-2 sm:h-2 h-1 bg-slate-600 rounded-lg '>
          </div> 

        </div>  
    </div>

        <div className="flex lg:-mt-0 md:-mt-0 sm:-mt-0 -mt-2">
          {shimmerArray.map((element) => (
            <div key={element} className="lg:w-48 md:w-48 sm:w-36 w-24 lg:h-60 md:h-60 sm:h-48 h-36 pr-4 lg:mr-10 md:mr-10 sm:mr-10 mr-2  bg-slate-300 opacity-80 mb-2 z-50 rounded-lg " ><div className='bg-slate-500 lg:h-60 md:h-60 sm:h-48 h-36 lg:w-48 md:w-48 sm:w-36 w-24 rounded-lg stroke animate-pulse opacity-95'></div></div>
          ))}
        </div>
      </div>

<ShimmerCorousal/>
<ShimmerCorousal/>
<ShimmerCorousal/>
<ShimmerCorousal/>
<ShimmerCorousal/>
      
    </div>
  );
};

export default Shimmer;
