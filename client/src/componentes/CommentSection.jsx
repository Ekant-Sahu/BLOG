import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState('');
    const [error,setError] = useState(null);
    const [comments, setComments] = useState();
    console.log(comments);
    useEffect(()=>{
      const getComments = async()=>{
        try {
          const res = await fetch(`/api/comment/getPostComments/${postId}`);
          if(res.ok){
            const data = await res.json();
            setComments(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getComments();

    },[postId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if(comment.length>200 || comment.length===0){
            return;
          }
          const res = await fetch('/api/comment/create',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: comment, postId, userId: currentUser._id})
          })
          
        if(res.ok){
          setComment('');
          setError(null);
        }
        } catch (error) {
          setError(error.message);
          console.log(error)
        }
    };
  return (
    <div className='max-w-4xl w-full mx-auto p-3'>
    {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray text-lg'>
            <p>Signed in as:</p>
            <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
            <Link to= {'/dashboard?tab=profile'} className='text-sm text-cyan-600 hover:underline'>
            @{currentUser.username}
            </Link>
        </div>
    ):(
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be loged in to comment.
            <Link to = {'/sign-in'} className='text-bule-500 hover:underline'>Sign In</Link>
        </div>
    )
    }
    {currentUser && (
        <div className="border border-teal-500 rounded-md p-3">
        <form onSubmit={handleSubmit} className="grid grid-cols-1">
        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="write a comment" onChange={(e)=>{setComment(e.target.value)} } value={comment}></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 my-3 max-w-full mx-auto flex"
        >
          Post Comment
        </button>
      </form>
      {
        error && (
          <Alert variant='danger'>{error}</Alert>
        )
      }
      </div>
    )}
</div>
  )
}
