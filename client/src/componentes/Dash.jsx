import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux';
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
    // console.log(users);
    // console.log(posts);
    // console.log(comments);
    
    

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
    <div className="p-4 relative min-h-screen md:ml-64">
      
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      
        DashBoard
      
      </div>
      
    </div>

  )
}
