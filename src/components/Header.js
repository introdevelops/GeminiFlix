import React, { useEffect} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { addUser, removeUser } from '../utils/userSlice';
import logo from "../images/Geminiflix.png";
import { user_icon } from '../utils/constants';
import {changeLangOption, toggleGeminiSearch} from '../utils/geminiSlice';
import lang from '../utils/langConstants';
import {setModalClicked} from '../utils/movieSlice.js';
import ModalComponent from './ModalComponent.js';


const Header = ({login}) => {

const langOption=useSelector((store)=>store?.geminiSearch?.langOption);

  const showGeminiSearch =useSelector(store => store?.geminiSearch?.showGeminiSearch)
  const modalClicked = useSelector(store => store?.movies?.modalClicked);

  const user = useSelector(store=> store.user);

  const dispatch= useDispatch();

const navigate= useNavigate();


const handleGeminiSearchClick= () =>{
  dispatch(toggleGeminiSearch());
}


  const handleSignOut=()=>{
    signOut(auth).then(()=>{

      navigate("/");
    }).catch((error)=>{
      
    });
  
  }

  const handleLangOption=(e)=>{
   
   
    dispatch(changeLangOption(e.target.value));
  }


  useEffect(()=>{

    // onAuthStateChanged obserses every auth state change in firebase 
    // we want this to observer the auth state only once so using it in useEffect
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        
        // on sign in this part is executed 
        if(user){
                const {uid, email, displayName} = auth.currentUser;
              
                dispatch(addUser({uid:uid, email:email, displayName: displayName}))
                navigate("/browse")
        }
        // when signout is called this part is executed
        else{

     dispatch(removeUser());
    navigate("/");
              
        }


    } )
     
    // unscribe is called when component is unmount...
    return () => unsubscribe();
    },  
    [])


  return (<>
  {!modalClicked &&  <div className={`w-screen fixed top-0 left-0 right-0 pl-2 flex justify-between z-[200] Lg:h-20 md:h-20 sm:h-16 h-16 shadow-lg 
  ${user && showGeminiSearch ? "bg-gradient-to-b from-black backdrop-blur-sm " : (!user ? "bg-gradient-to-b from-black backdrop-blur-sm" : "bg-black")}`}>

        <img 
        className="lg:mt-4 Lg:h-14 lg:w-48 z-50 sm:w-36 sm:h-14 md:w-40 md:h-14 md:m-4 m-0 mt-3 w-24 h-10"
        src={logo}
        alt='logo'/>

   {user && <div className='flex flex-row p-6'>
   {showGeminiSearch && <select className='w-28 h-10 hidden sm:block md:block lg:block cursor-pointer mr-2 bg-purple-800 text-white rounded-lg z-50 lg:h-10 md:h-10 sm:h-8 h-8 lg:mt-0 md:mt-0 sm:-mt-2' 
   value={langOption}
   onChange={handleLangOption}>
      {Object.keys(lang).map((element)=>{
        return <option className='bg-white text-black rounded-lg' key={element} value={element}>{lang[element].name}</option>
      })}
    </select> }

    <button className="px-2 lg:px-4 md:px-4 sm:px-3 mr-2 bg-purple-800 text-white rounded-lg lg:text-base md:text-base sm:text-base text-xs
    lg:h-10 md:h-10 sm:h-8 h-8 z-50 sm:-mt-2 lg:-mt-0 md:-mt-0 -mt-2 leading-3" 
    onClick={handleGeminiSearchClick}
    >{showGeminiSearch ? 'Home Page': 'Gemini Search'  }</button>
       <img 
       className="z-50 hidden sm:block md:block lg:block lg:h-11 md:h-11 sm:h-9 h-9 lg:w-9 md:w-9 sm:w-9 w-9 lg:mt-0 md:mt-0 sm:-mt-2"
       
       
       src={user_icon}
       alt="logout"
      />

      <button onClick={handleSignOut}className='lg:text-base font-bold md:text-base sm:text-xs text-xs p-2 text-white lg:mt-0 md:mt-0 sm:-mt-3 -mt-2 
      lg:ml-0 md:ml-0 sm:ml-0 -ml-2 leading-3'>Sign Out </button>  
      </div>  }

        </div>}

    {modalClicked && <ModalComponent/>}


  
       </>
  )
}

export default Header;