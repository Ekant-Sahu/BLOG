import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CiCircleCheck,CiCircleRemove } from "react-icons/ci";

import { FaCommentDots } from "react-icons/fa";
export const Dash = () => {
    const [users, setUsers] = useState([]);
    const [comments,setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalPost,setTotalPost] = useState([]);
    const [totalComments, setTotalComments] = useState([]);
    const [lastMonthUser,setlastMonthUser] = useState([]);
    const [lastMonthComment,setlastMonthComment] = useState([]);
    const [lastMonthPost,setlastMonthPost] = useState([]);
    const {currentUser} = useSelector((state)=>state.user);    

    console.log(users);
  useEffect (()=>{
    try {
      const fetchUsers = async () =>{
        if (currentUser && currentUser.isAdmin) { // Check if currentUser is defined and isAdmin
          const res = await fetch(`/api/user/getusers?limit=9`);
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setlastMonthUser(data.lastMonthUsers);
          }
        }
      }
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=9`);
        const data = await res.json();
        if(res.ok){
          setPosts(data.posts);
          setTotalPost(data.totalPost);
          setlastMonthPost(data.lastMonthPosts);
        }

      }
      const fetchComments = async () => {
        if (currentUser && currentUser.isAdmin) { // Check if currentUser is defined and isAdmin
          const res = await fetch(`/api/comment/getcomments`);
          const data = await res.json();
          if (res.ok) {
            setComments(data.comments);
            setTotalComments(data.totalComment);
            setlastMonthComment(data.lastMonthComment);

          }
        }
      }

      if(currentUser.isAdmin) {
        fetchUsers();
        fetchPosts();
        fetchComments();
      }
      
    } catch (error) {
      console.log(error);
    }



  },[currentUser])

    return (
    <div className="p-4 relative min-h-screen md:ml-64 ">
      <h1 className="text-2xl font-semibold whitespace-nowrap border-b pb-10">Dashboard</h1>
      <div className='grid md:grid-cols-3 mx-auto gap-10 my-20 max-w-8xl'>
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Posts</span>
              <span className="text-lg font-semibold">{totalPost}</span>
            </div>
            <div className="p-10 bg-gray-200 rounded-md"><MdArticle /></div>
          </div>
          <div>
            <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{lastMonthPost}</span>
            <span>Last months</span>
          </div>
        </div>
        
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Users</span>
              <span className="text-lg font-semibold">{totalUsers}</span>
            </div>
            <div className="p-10 bg-gray-200 rounded-md"><FaUser /></div>
          </div>
          <div>
            <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{lastMonthUser}</span>
            <span>Last months</span>
          </div>
        </div>
        
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Comments</span>
              <span className="text-lg font-semibold">1{totalComments}</span>
            </div>
            <div className="p-10 bg-gray-200 rounded-md"><FaCommentDots /></div>
          </div>
          <div>
            <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{lastMonthComment}</span>
            <span>Last Months</span>
          </div>
        </div>
      </div>
        <div className='grid md:grid-cols-2 mx-auto gap-10 my-20 relative overflow-x-auto'>
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <caption className='text-3xl mb-5'>
            <a href='/dashboard?tab=post'><button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>View all Posts</button></a>
          </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Date updated
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Post image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        title
                    </th>
                </tr>
            </thead>
            {posts.map((post) => (
              <tbody key={post._id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {new Date(post.updatedAt).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">
                      <Link to={`/post/${post.slug}`}>
                          <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                      </Link>
                  </td>
                  <td className="px-6 py-4">
                      {post.category}
                  </td>
                  <td className="px-6 py-4">
                      <Link to={`/post/${post.slug}`}>
                          {post.title}
                      </Link>
                  </td>
                
              </tr>
          </tbody>
            ))}
        </table>
        
        
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
        <caption className='text-3xl mb-5'>
            <a href='/dashboard?tab=users'><button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>View all Users</button></a>
          </caption>
        
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
              </tr>
          </tbody>
            ))}
        </table>
        
        </div>
    </div>

  )
}
