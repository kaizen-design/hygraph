import moment from 'moment';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getRecentPosts, getRelatedPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then(result => setPosts(result))
    } else {
      getRecentPosts().then(result => setPosts(result))
    }
  }, [categories, slug]);

  return (    
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h3 className="text-lg font-semibold border-b pb-4 mb-8">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>      
      {posts.map((post) => (
        <div key={post.id} className="flex items-center w-full mb-4">
          <Link href={`/posts/${post.slug}`}>     
            <img 
              src={post.featuredImage.url} 
              alt={post.title} 
              className="rounded-full w-16 h-16 flex-none object-cover cursor-pointer hover:ring-offset-1 hover:ring-2 hover:ring-pink-700/50 transition" 
            />  
          </Link>              
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs mb-1">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/posts/${post.slug}`}>
              <a className="text-md font-medium leading-tight transition hover:text-pink-700">
                {post.title}
              </a>
            </Link>            
          </div>
        </div>
      ))}      
    </div>       
  );
};

export default PostWidget;