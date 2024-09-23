import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import geminiSearchReducer from "./geminiSlice";


const appStore = configureStore({
    reducer:{
        user: userReducer, 
        movies: movieReducer,
        geminiSearch: geminiSearchReducer,
    }





})

export default appStore;