import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import { TextInput,Button, Alert,Modal } from 'flowbite-react';
import {
  updateStart, 
  updateSuccess, 
  updateFailure,
  deletUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logout
} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, error, loading} = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const [showModel,setShowModel] = useState(false);
  const [success,setSuccess] = useState(null);
  const [failure,setFaliure] = useState(null);
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (Object.keys(formData).length === 0) {
          return;
      }
      try {
          dispatch(updateStart());
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
              dispatch(updateFailure(data.message));
              setSuccess(null);
              setFaliure(data.message);
          } else {
              dispatch(updateSuccess(data));
              setFaliure(null);
              setSuccess("UPDATE SUCCESSFUL");
          }
      } catch (error) {
          console.error('Error updating user:', error);
          dispatch(updateFailure('An error occurred while updating the user.'));
          setSuccess(null)
          setFaliure(error.message);
      }
  };

  const handleDelete = async () => {
    setShowModel(false)
      try{
        dispatch(deletUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method: 'DELETE',
        });
        const data = await res.json();
        if(!res.ok){
          dispatch(deleteUserFailure(data.message));
        }
        else{
          dispatch(deleteUserSuccess(data));
        }

      }catch(error){
        dispatch(deleteUserFailure(error.message));
      }
  }

  const handleLogOut = async() =>{
    try{
      const res = await fetch('api/user/logout',{
        method: 'POST',
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(logout());
      }
    } catch(error){
      console.log(error.message)
    }
  }


    return (
    <div className="p-4 relative min-h-screen md:ml-64">
      
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
              <div className='w-40 h-40 cursor-pointer shadow-md overflow-hidden rounded-full flex items-center justify-center my-5'>
                <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-8 object-cover border-[lightgray]' />
              </div>
              <div className='grid grid-rows-3 gap-8 w-80'>
                <TextInput onChange={handleChange} type ='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
                <TextInput onChange={handleChange} type ='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
                <TextInput onChange={handleChange} type ='password' id='password' placeholder='password'/>
              </div>
                <Button type="submit" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-80 my-2 flex justify-center" disabled={loading}>
                    {loading ? 'loading...':'Update'}
                </Button>
                <div className="flex justify-between min-w-80">
                    <span onClick={()=>setShowModel(true)} className='text-red-500 cursor-pointer'>Delet User</span> 
                    <span onClick={handleLogOut} className='text-red-500 cursor-pointer'>Log Out</span>
                </div>
                {success && (
                  <Alert className='mt-5 bg-blue-600 text-white'>{success}</Alert>
                )}
                {failure && (
                  <Alert className='mt-5 bg-red-600 text-white'>{failure}</Alert>
                )}
                {error && (
                  <Alert className='mt-5 bg-red-600 text-white'>{failure}</Alert>
                )}
            </form>
      </div>
      {showModel && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={()=>{setShowModel(false)}}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button
                onClick={handleDelete}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                data-modal-hide="popup-modal"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={()=>{setShowModel(false)}}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                data-modal-hide="popup-modal"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </div>

  )
}
