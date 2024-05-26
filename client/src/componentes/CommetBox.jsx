import React, { useEffect, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function CommentBox({ comment, onLike,onEdit, onDelete }) {
  const { currentUser } = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [user, setUser] = useState({});


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`,{
        method: 'PUT',
        hedaers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: editedContent})
      });
      if(res.ok){
        setIsEditing(false);
        onEdit(comment,editedContent);
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-lg'>
      <div className='flex-shrink-0 mr-3'>
        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.usrename} />
      </div>
      <div className='flex-1'>
        <div className='flex mb-1'>
          <div className='flex flex-col md:flex-row'>
            <div className='font-bold mr-1 text-sm truncate'>{user ? `@${user.username}` : 'anonymous user'}</div>
            <div className='text-gray-500 text-xs'>-{moment(comment.createdAt).fromNow()}</div>
          </div>
        </div>
        {isEditing ? (
          <div className="grid grid-cols-1">
            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setEditedContent(e.target.value) }} value={editedContent}></textarea>
            <div className='flex'>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 my-3 max-w-full flex"
                onClick={handleSave}
              >
                Update Comment
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 my-3 max-w-full mx-auto flex"
                onClick={()=>setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className="flex items-center pt-2 text-sm border-t dark:border-gray-700 max-w-fit gap-2">
              <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}><AiFillLike /></button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 && comment.numberOfLike + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                <>
                  <button type='button' className='text-gray-400 hover:text-blue-500' onClick={handleEdit}>
                    Edit
                  </button>
                  <button type='button' className='text-gray-400 hover:text-red-500' onClick={()=>onDelete(comment._id)}>
                  Delelt
                  </button>
              </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}