import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function PostCard({post}) {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

    <article className="overflow-hidden rounded-lg shadow-lg">
      <a href={`/post/${post.slug}`}>
        <img alt="Placeholder" className="block h-[260px] w-full object-cover" src={post.image} />
      </a>

      <header className="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 className="text-lg">
          <a className="no-underline hover:underline text-black line-clamp-2" href={`/post/${post.slug}`}>
            {post.title}
          </a>
        </h1>
        <p className="text-grey-darker text-sm">
          {post && new Date(post.updatedAt).toLocaleDateString()}
        </p>
      </header>

      <footer className="flex items-center justify-between leading-none p-2 md:p-4">
        {/* after completing search page complete href */}
        <a className="flex items-center no-underline hover:underline text-black" href={`/serach?category=${post && post.category}`}> 
        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-small rounded-lg text-xs px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{post && post.category}</button>
        </a>
        {/* <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
          <span className="hidden">{}</span>
        </a> */}
      </footer>
    </article>
  </div>
  )
}
