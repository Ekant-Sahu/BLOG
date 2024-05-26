import React, { useEffect, useState } from 'react'
import SupportUs from '../componentes/SupportUs';
import {useParams,Link} from 'react-router-dom'
import { Spinner,Button } from 'flowbite-react';
import ShareLinks from '../componentes/ShareLinks';
import CommentSection from '../componentes/CommentSection';
import PostCard from '../componentes/PostCard';
export default function PostPage() {
    const {postSlug} = useParams();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [post,setPost] = useState(null);
    const [recentPosts,setRecentPost] = useState(null);
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

    useEffect(()=>{
      try {
        const fetchRecentPosts = async () => {
          const res = await fetch(`/api/post/getposts?limit=6`);
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





  if(loading) return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner size = 'xl'></Spinner>
    </div>
)
  return (
    <main className='p-3 flex flex-col max-w-8xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-7xl mx-auto lg:text-4xl'>{post && post.title} </h1>
        <Link to = {`/serach?category=${post && post.category}`} className='self-center mt-5'>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-small rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{post && post.category}</button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600] w-full max-w-7xl self-center object-cover'/>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-7xl text-xs ">
            <span><ShareLinks /></span>
            <span className='italic'>{post && new Date(post.updatedAt).toLocaleDateString()} - {post && (post.content.length/1000).toFixed(0)} mins read</span>
        </div>
        <div className='p-3 text-2xl max-w-7xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}></div>
        <div className='mx-auto max-w-7xl'>
          <SupportUs />
        </div>
        <CommentSection postId={post._id}/>
        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recents</h1>
          <div className="flex flex-wrap mt-5 max-w-7xl">
            {
              recentPosts && recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            }
          </div>
        </div>
    </main>
  )
}
