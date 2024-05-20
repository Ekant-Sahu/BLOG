import { Alert, Spinner } from 'flowbite-react';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../componentes/OAuth';

export default function LogIn() {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) =>{
    // console.log(e.target.value);
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('please fill all the fields'));
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch(error){
      dispatch(signInFailure(error.message));
    }
 }

  return (
    <div className="min-h-screen mt-20">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required onChange={handleChange} />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>
          {
            loading ? (
              <> 
                <Spinner size = 'sm'/>
                {/* <span className='pl-3'>Loading</span> */}
              </>
            ) : 'log in'

          }
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 text-sm mt-5 max-w-sm mx-auto">
        <span>Don't have an account?</span>
        <a href="/sign-up" className="text-blue-500">Sign up here</a>
      </div>
      <div className="flex gap-2 text-sm mt-5 max-w-sm mx-auto bg-red-50">
      {
        errorMessage && (
          <Alert variant='danger'>{errorMessage}</Alert>
        )
      }
      </div>
      
    </div>
  )
}
