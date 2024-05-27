import React from 'react'
import PostCard from '../componentes/PostCard'
import SupportUs from '../componentes/SupportUs'
import { useState,useEffect } from 'react';
export default function Post() {
  const [recentPosts,setRecentPost] = useState(null);
  const [showMore,setShowMore] = useState(true);
  useEffect(()=>{
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if(res.ok){
          setRecentPost(data.posts);
          if(data.length<9){
            setShowMore(false);
          }
        }
      }
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  },[]);

  const handleShowMore = async () => {
    const startIndex = recentPosts.length;
    try{
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setRecentPost((prev) => [...prev, ...data.posts]);
        if(data.posts.length<9){
          setShowMore(false);
        }
      }
    }catch(error){
      console.log(error)
    }
  }


  return (
    <>
    <main className='p-3 flex flex-col min-h-screen max-w-7x items-center mx-auto'>
        <div className='text-5xl justify-center items-center'>
          <div className='flex justify-center items-center'>POSTS</div>
          <div className="flex flex-wrap mt-5 max-w-7xl">
            {
              recentPosts && recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            }
          </div>
          {showMore && (
          <button onClick ={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
        )
        }
        </div>
        <SupportUs/>
    </main>
    
    </>

  )
}

