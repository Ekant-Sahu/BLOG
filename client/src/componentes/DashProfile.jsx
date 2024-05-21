import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import { TextInput,Button } from 'flowbite-react';
import {updateStart, updateSuccess, updateFailure} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [formData, setFormData] = useState({});

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
          } else {
              dispatch(updateSuccess(data));
          }
      } catch (error) {
          console.error('Error updating user:', error);
          dispatch(updateFailure('An error occurred while updating the user.'));
      }
  };


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
                <Button type="submit" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-80 my-2 flex justify-center">
                    UPDATE
                </Button>
                <div className="flex justify-between min-w-80">
                    <span className='text-red-500 cursor-pointer'>Delet User</span> 
                    <span className='cursor-pointer'>Log Out</span>
                </div>
            </form>
      </div>
    </div>
  )
}
