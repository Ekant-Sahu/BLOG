import React from 'react'
import PostCard from '../componentes/PostCard'
import SupportUs from '../componentes/SupportUs'
import { useState,useEffect } from 'react';
export default function Home() {
  const [recentPosts,setRecentPost] = useState(null);
  const [showMore,setShowMore] = useState(true);
  useEffect(()=>{
    window.scrollTo(0, 50);
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if(res.ok){
          setRecentPost(data.posts);
        }
      }
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  },[])
  return (
    <>
    <main className='p-3 flex flex-col min-h-screen max-w-7x items-center mx-auto'>
        <div className='text-5xl justify-center items-center'>
          <div className='min-h-screen flex items-center -my-6'>
          Welcome to our website here you will find varity of news 
          </div>
          <div className=''>RECENT POST</div>
          <div className="flex flex-wrap mt-5 max-w-7xl">
            {
              recentPosts && recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            }
          </div>
        </div>
        <SupportUs/>
    </main>
    
    </>

  )
}
