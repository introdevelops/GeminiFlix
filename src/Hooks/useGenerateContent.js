import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const useGenerateContent = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [error, setError] = useState(null);

  const generateContent = async (searchText) => {
    try {
      console.log(searchText);
      const genAI = new GoogleGenerativeAI('AIzaSyBPmoZEHR6qSrwyG9NFdSjXslKIIoAomGQ');
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `As a recommendation system, recommend me at most 20 movies in hindi and english according to this query: '${searchText}' in the form of an array of strings of recommended movies without JSON delimiters. Example format: ["Sholay","Masti","Andaz Apna Apna","Hera Pheri","Welcome"].
      AND ALWAYS GIVE ME DIFFERENT RESULTS FROM THE PAST SEARCH RESULTS.
      If the query is short , then search for query + "movies in english and hindi randomly " , to return at least 20 movies in the form of and array of strings of recommended movies without JSON delimiters.
      If query is impossible to understand, then return at most 20 top or latest famous Indian and Hollywood movies only in the form of an array of strings of recommended movies without JSON delimiters.
      If query is missing, then return at most 20 top rated or latest or popular  Hollywood and Indian movies only in the form of an array of strings of recommended movies without JSON delimiters.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      console.log(responseText);
      const startIndex = responseText.indexOf('[');
      const endIndex = responseText.indexOf(']') + 1;

      if (startIndex !== -1 && endIndex !== -1) {
        const arrayString = responseText.slice(startIndex, endIndex);
        const moviesArray = JSON.parse(arrayString);
        
       if(moviesArray.length>0){ 
        console.log("recommended movies updated");
        setRecommendedMovies(moviesArray);}
        return moviesArray;
      } else {
        console.error("Failed to extract array from response");
        setError("Failed to extract array from response");
        return [];
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError(error.message || "An error occurred");
      return [];
    }
  };

  return { generateContent, recommendedMovies, error };
};

export default useGenerateContent;
