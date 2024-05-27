import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

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


  useEffect (()=>{
    try {
      const fetchUsers = async () =>{
        if (currentUser && currentUser.isAdmin) { // Check if currentUser is defined and isAdmin
          const res = await fetch(`/api/user/getusers`);
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setlastMonthUser(data.lastMonthUsers);
          }
        }
      }
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getposts`);
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
            {/* <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
            <span>from 2019</span> */}
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
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
            <span>from 2019</span>
          </div> */}
        </div>
        
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Comments</span>
              <span className="text-lg font-semibold">1{totalComments}</span>
            </div>
            <div className="p-10 bg-gray-200 rounded-md"><FaCommentDots /></div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
            <span>from 2019</span>
          </div> */}
        </div>
      </div>
        <div className='grid md:grid-cols-3 mx-auto gap-10 my-20 max-w-7xl'>
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
              show posts
          </div>
        
          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
              show user
          </div>
        </div>
    </div>

  )
}
