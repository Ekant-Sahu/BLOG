import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CommentBox from './CommetBox'
import {Alert} from 'flowbite-react'
export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState('');
    const [error,setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModel,setShowModel] = useState(false);
    const [commentToDelete,setCommentToDelete] = useState(null);
    const navigate = useNavigate();
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
        if(comment.length > 200 || comment.length === 0 || !currentUser) {
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
          const data = await res.json();
          setComment('');
          setError(null);
          setComments([data, ...comments]);
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      } else {
        const res = await fetch(`/api/comment/likeComment/${commentId}`, {
          method: 'PUT',
        });
        if (res.ok) {
          const data = await res.json();
          setComments(comments.map((comment) => {
            return comment._id === commentId ? {
              ...comment,
              likes: data.likes,
              numberOfLikes: data.likes.length
            } : comment;
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async(comment,editedContent) =>{
    setComments(
      comments.map((c)=>
      c._id === comment._id ? {...c,content: editedContent}: c)
    )
  }
  const handleDelete = async (commentId) => {
    try {
      if(!currentUser){
        navigate('/sign-in');
        return; 
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
        method: 'DELETE',
      });
      if(res.ok){
        const data = await res.json();
        setComments(comments.filter((comment)=> comment._id !== commentId));
        setShowModel(false);
      }
    } catch (error) {
      console.log(error);
    }
    

  }


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
    {comments.length===0 ? (<p className='text-sm my-5'>No comments yet!!</p>):
    (<>
      <div className='text-sm my-5 flex items-center gap-1'>
        <p>Comments</p>
        <div className='border border-gray-400 py-1 px-2 rounded-sm shadow-gray-50'><p>{comments.length}</p></div>
      </div>
      {
        comments.map(comm => (
          <CommentBox key={comm._id} comment={comm} onLike={handleLike} onEdit = {handleEdit} onDelete={(commentId)=>{setShowModel(true);setCommentToDelete(commentId)}}/>
        ))
      }
      </>
    )}
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
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment?</h3>
                            <button
                              onClick={()=>handleDelete(commentToDelete)}
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
