import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { CiCircleCheck,CiCircleRemove } from "react-icons/ci";
export default function DashUsers() {
    const {currentUser} = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showModel,setShowModel] = useState(false);
    const [showMore,setShowMore] = useState(true);
    const [userIdToDelete,setUserIdToDelete] = useState('');
    const handleDelete = async () =>{
      setShowModel(false);
      try{
        const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
          method: 'DELETE',
        })
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }
        else{
          setUsers((prev)=>
            prev.filter((user)=>user.id !== userIdToDelete))
          setShowModel(false);
        }

      }catch(error){
        console.log(error)
      }
      
    }

    const handleShowMore = async () => {
      const startIndex = users.length;
      try{
        const res = await fetch(`api/user/getusers?startIndex=${startIndex}`);
        const data = await res.json();
        if(res.ok){
          setUsers((prev) => [...prev, ...data.users]);
          if(data.users.length<9){
            setShowMore(false);
          }
        }
      }catch(error){
        console.log(error)
      }
    }


  useEffect(()=>{
    const fetchUsers = async () =>{   
      try {
        if (currentUser && currentUser.isAdmin) { // Check if currentUser is defined and isAdmin
          const res = await fetch(`/api/user/getusers`);
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            if(data.users.length<9){
              setShowMore(false);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(currentUser.isAdmin) {
      fetchUsers();
    }
  },[currentUser._id]);
  return (
    <div className="p-4 relative min-h-screen md:ml-64">
      {currentUser.isAdmin && users.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Date Created
                    </th>
                    <th scope="col" className="px-6 py-3">
                        User Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Admin
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>
            {users.map((user) => (
              <tbody key={user._id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">
                    <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full object-cover bg-gray-500' />
                  </td>
                  <td className="px-6 py-4">
                      {user.username}
                  </td>
                  <td className="px-6 py-4">
                      {user.isAdmin ? <CiCircleCheck className='w-20 h-10 object-cover'/> : <CiCircleRemove className='w-20 h-10 object-cover'/>}
                  </td>
                  <td className="px-6 py-4">
                  <span onClick={()=>{setShowModel(true);setUserIdToDelete(user._id);}} className='text-red-500 cursor-pointer'>Delet</span>
                  </td>
              </tr>
          </tbody>
            ))}
        </table>
        
        {showMore && (
          <button onClick ={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
        )
        }




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
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
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
        
      ):(
        <p>you have no user yet</p>
      )}
      </div>
  )
}
