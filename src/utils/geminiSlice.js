import {createSlice} from "@reduxjs/toolkit";


const geminiSlice = createSlice({

name    : 'geminiSearch',
initialState: {
    searchText:"",
    showGeminiSearch : false,
    langOption:"en",
    suggestions:[],
    recommendedMovies:[],
    isClicked:false,

},
reducers: {
    toggleGeminiSearch: (state,action) =>{
        state.showGeminiSearch= !state.showGeminiSearch;
    },
    changeLangOption: (state,action)=>{
        state.langOption=action.payload;
    },
    addSuggestions: (state,action)=>{
        const {recommendedMovies,finalResults} = action.payload;
        state.suggestions=[...finalResults];
        state.recommendedMovies=[...recommendedMovies];

    },
    changeSearchText: (state,action)=>{
        state.searchText=action.payload;
    },
    setIsClicked: (state,action)=>{
        state.isClicked=action.payload;
    }
},

});

export const {toggleGeminiSearch,changeLangOption,addSuggestions,changeSearchText,setIsClicked} = geminiSlice.actions;

export default geminiSlice.reducer;

