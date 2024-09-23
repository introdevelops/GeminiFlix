import { checkValidData } from '../utils/validation.js';
import React, { useState, useRef } from 'react';
import Header from './Header.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice.js';
import background8 from '../images/background8.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPasswordInstructions, setShowPasswordInstructions] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    console.log(isSignInForm);
  };

  const handleValidation = () => {
    const res = checkValidData(email.current.value, password.current.value);
    setErrorMessage(res);

    if (res) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
              navigate('/browse');
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + '-' + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log(userCredential.user);
        })
        .catch((error) => {
          setErrorMessage(error.code + '-' + error.message);
        });
    }
  };

  return (
    <>
      <Header login={false}/>

      <div className="overflow-hidden p-0 m-0  w-screen fixed top-0 right-0 bottom-0 left-0 h-screen ">
        <img
          className="overflow-x-hidden w-screen  object-cover m-0 p-0 blur-b-sm blur-l-sm blur-r-sm min-h-screen"
          src={background8}
          alt="bg-img"
        />
      </div>

    <div className='bg-transparent overflow-hidden absolute h-6 w-4 lg:mt-[900px] md:mt-[800px] sm:mt-[700px] mt-[600px]' ></div>

      <div className='lg:h-[700px] lg:w-[450px] md:h-[600px] md:w-[350px] sm:w-[300px] sm:h-[550px] w-[200px] h-[430px] my-24 bg-black lg:my-36 md:my-32 sm:my-28 mx-auto right-0 left-0  z-[150] absolute bg-opacity-50 rounded-lg overflow-hidden '>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute text-white right-0 left-0  flex flex-col lg:p-8 md:p-4 sm:p-2 p-2 rounded-lg overflow-hidden"
        >
          <h1 className="font-bold lg:text-3xl md:text-2xl sm:text-xl text-lg lg:ml-8 lg:mt-6 lg:mb-6 md:ml-7 md:mt-2 md:mb-2 sm:ml-7 sm:mt-2 sm:mb-1 mt-2 mb-2 ml-2 opacity-80 ">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>

          {!isSignInForm && (
            <input
              ref={fullName}
              type="text"
              placeholder="Full Name"
              className=" mx-auto lg:my-4 md:my-4 sm:my-4 my-2 bg-transparent border border-white rounded lg:w-80 lg:h-14 md:w-64 md:h-12 sm:h-10 sm:w-56 h-7 w-40 lg:text-lg md:text-base sm:text-sm text-xs lg:p-4 md:p-4 sm:p-3 p-2 "
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email or Mobile Number"
            className=" mx-auto lg:my-4 md:my-4 sm:my-4 my-2 bg-transparent border border-white rounded lg:w-80 lg:h-14 md:w-64 md:h-12 sm:h-10 sm:w-56 h-7 w-40 lg:text-lg md:text-base sm:text-sm text-xs lg:p-4 md:p-4 sm:p-3 p-2"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="lg:text-lg md:text-base sm:text-sm text-xs lg:p-4 md:p-4 sm:p-3 p-2 mx-auto lg:my-4 md:my-4 sm:my-4 my-2 bg-transparent border border-white rounded lg:w-80 lg:h-14 md:w-64 md:h-12 sm:h-10 sm:w-56 h-7 w-40 "
            onFocus={() => setShowPasswordInstructions(true)}
            onBlur={() => setShowPasswordInstructions(false)}
          />

          {/* Password Instructions */}
          {showPasswordInstructions && (
            <div className="lg:text-base md:text-sm sm:text-xs text-[0.5rem] lg:p-2 md:p-2 sm:p-1 p-1 mx-auto bg-tranparent bg-opacity-70 border border-white rounded lg:w-80 lg:h-28  text-gray-400 md:w-64 md:h-24 sm:h-20 sm:w-56 h-14 w-40">
              <p>Password must contain at least :</p>
            
               <span> 8 characters ,</span>
                <span>1 uppercase letter ,</span>
                <span>1 lowercase letter ,</span>
                <span>1 number ,</span>
                <span>1 special character (!@#$%^&*)</span>
              
            </div>
          )}

          {errorMessage && <p className="text-red-500 font-bold lg:text-lg md:text-base sm:text-sm text-xs  ">{errorMessage}</p>}

          <button
            onClick={handleValidation}
            className="rounded m-4 bg-[rgba(255,0,0,0.81)] lg:h-10 lg:w-80 md:w-64 md:h-12 sm:h-10 sm:w-56 w-40 h-7 lg:text-lg md:text-base sm:text-sm text-sm  mx-auto"
          >
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>

          {isSignInForm && (
            <div className="lg:ml-8 md:ml-8 sm:ml-8 ml-3">
              <input
                className="appearance-none relative peer rounded-sm 
                lg:w-[18px] lg:h-[18px] md:w-[18px] md:h-[18px] sm:w-[18px] sm:h-[18px] w-[14px] h-[14px] bg-black border border-gray-500 hover:border-white checked:border-none checked:bg-transparent z-10 mr-2 mt-3"
                type="checkbox"
                id="remember-me"
                name="remember-me"
              />
              <label className='lg:text-lg md:text-lg sm:text-base text-xs mb-1' htmlFor="remember-me"> Remember me </label>
              <svg
                className="transform -translate-y-[26px] absolute mt-[3px] w-[18px] h-[18px] bg-white hover:bg-gray-500 z-0 border border-gray-500 hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}

          <button onClick={toggleSignInForm} className="lg:ml-4 lg:mt-4 md:mt-4 md:ml-8 sm:mt-4 sm:ml-8 ml-3 mt-3 lg:text-lg md:text-lg sm:text-base text-xs">
            {isSignInForm ? 'New to GeminiFlix ? ' : 'Already Registered ?'}
            <span className="cursor-pointer font-bold">
              {isSignInForm ? 'Sign Up now.' : 'Sign In now.'}
            </span>
          </button>
        </form>
       
      </div>
      
      </>
  );
};

export default Login;
