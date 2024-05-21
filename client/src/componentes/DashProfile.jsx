import React from 'react'
import {useSelector} from 'react-redux';
import { TextInput,Button } from 'flowbite-react';
export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className="p-4 relative min-h-screen md:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <form action="" className="flex flex-col items-center justify-center">
              <div className='w-40 h-40 cursor-pointer shadow-md overflow-hidden rounded-full flex items-center justify-center my-5'>
                <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-8 object-cover border-[lightgray]' />
              </div>
              <div className='grid grid-rows-3 gap-8 w-80'>
                <TextInput type ='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
                <TextInput type ='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
                <TextInput type ='password' id='password' placeholder='password'/>
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
