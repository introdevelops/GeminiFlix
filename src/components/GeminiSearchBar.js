import React, { useEffect, useState } from 'react';
import lang from '../utils/langConstants.js';
import { useDispatch, useSelector } from 'react-redux';
import useGenerateContent from '../Hooks/useGenerateContent.js';
import { changeSearchText, setIsClicked } from '../utils/geminiSlice.js';
import useSuggestions from './../Hooks/useSuggestions';

const GeminiSearchBar = () => {
  const dispatch = useDispatch();
  const langOption = useSelector((store) => store?.geminiSearch?.langOption);
  const searchText = useSelector((store) => store?.geminiSearch?.searchText);
  const [searchValue, setSearchValue] = useState(searchText);
  const [immediateFinalData,setImmediateFinalData] = useState("");

  const { generateContent } = useGenerateContent();
  const { handleSuggestionToShow } = useSuggestions();

  // Update local state when Redux state changes
  useEffect(() => {
    setSearchValue(searchText);
  }, [searchText]);

  // Dispatch Redux action with current local searchValue (only when search button is clicked)
  const handleSearchText = () => {
    dispatch(changeSearchText(searchValue)); // Dispatch search text only on button click
  };

  // Perform search and handle results (only when search button is clicked)
  const handleSearch = async () => {
    const generatedContent = await generateContent(searchValue); 
    console.log("hello");
    if (generatedContent.length > 0 ) {
      console.log(" handleSuggestiontoshow calling");
    const result=  await handleSuggestionToShow(searchValue, generatedContent);
    setImmediateFinalData(result);
    console.log("result:",result);
  }
    
    // Use the searchValue when search is initiated
    if (immediateFinalData.length > 0) {
      
      console.log("inside geminiSearchbar finalData: ",immediateFinalData);
    }
  };

 

  return (
    <div className="absolute inset-0 flex items-center justify-center lg:-mt-[199px] md:-mt-72 sm:-mt-[260px] -mt-8 z-30 lg:mb-0 md:mb-2 sm:-mb-0 mb-20 ">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchText(); // Update search text in Redux
          handleSearch(); // Trigger search on form submission (Enter key press)
        }} 
        className="lg:w-[50vw] md:w-[70%] sm:w-[70%] w-[70%] bg-black bg-opacity-75 grid grid-cols-12 p-2 rounded-lg"
      >
        <input 
          type="text" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} // Update local state on input change
          className="lg:p-4 md:p-3 sm:p-3 p-2 col-span-9 text-black rounded-l-lg lg:text-base md:text-base sm:text-base text-[8px]" 
          placeholder={lang[langOption].getSearchPlaceholder}
        />
        <button
          onClick={() => {
            handleSearchText(); // Update search text in Redux
            handleSearch(); 
            dispatch(setIsClicked(true));// Trigger search when button is clicked
          }}
          className="col-span-3 py-2 lg:px-4 md:px-4 sm:px-4 px-1 bg-red-700 text-white rounded-r-lg lg:text-base md:text-base sm:text-base text-[10px] active:bg-red-700 hover:bg-red-600"
        >
          {lang[langOption].search}
        </button>
      </form>
    </div>
  );
};

export default GeminiSearchBar;
