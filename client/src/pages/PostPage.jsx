import React, { useEffect, useState } from 'react'

import {useParams,Link} from 'react-router-dom'
import { Spinner,Button } from 'flowbite-react';

export default function PostPage() {
    const {postSlug} = useParams();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [post,setPost] = useState(null);
    console.log(post);
    useEffect(()=>{
        const fetchPosts = async () =>{   
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (res.ok) {
                  setPost(data.posts[0]);
                  setError(false);
                  setLoading(false);
                }
                else{
                    setError(true);
                    setLoading(false);
                    return;
                }
            } catch (error) {
                setError(true);
                setLoading(false);
              console.log(error);
            }
          };
        fetchPosts();
    },[postSlug]);


  if(loading) return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner size = 'xl'></Spinner>
    </div>
)
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-5xl mx-auto lg:text-4xl'>{post && post.title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit adipisci ipsam pariatur dolor explicabo corporis dicta nostrum consequatur, nulla officiis fugiat expedita perspiciatis, voluptatum assumenda voluptas quod nisi harum cumque!</h1>
        <Link to = {`/serach?category=${post && post.category}`} className='self-center mt-5'>
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-small rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{post && post.category}</button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600] w-full max-w-5xl self-center object-cover'/>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-5xl text-xs ">
            <span>{post && new Date(post.updatedAt).toLocaleDateString()}</span>
            <span className='italic'>{post && (post.content.length/1000).toFixed(0)} mins read</span>
        </div>
        <div className='p-3 text-2xl max-w-4xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}></div>
    </main>
  )
}
