import moment from 'moment';
import Link from 'next/link';

const PostCard = ({ post }) => {
  console.log(post)
  return (
    <article className="bg-white rounded-lg shadow-lg p-0 lg:p-8 mb-8">
      <div className="relative rounded-lg shadow-md lg:pb-80 mb-4 lg:mb-8">
        <Link href={`/posts/${post.slug}`}>
          <img 
            src={post.featuredImage.url} 
            alt={post.title} 
            className="lg:absolute h-auto lg:h-80 w-full object-cover lg:shadow-lg rounded-t-lg lg:rounded-lg cursor-pointer"
          />
        </Link>  
      </div>
      <div className="text-center p-6 lg:p-0">
        <h2 className="mb-4 text-3xl font-semibold">
          <Link href={`/posts/${post.slug}`}>
            <a className="transition hover:text-pink-700 cursor-pointer">
              {post.title}
            </a>
          </Link>  
        </h2>
        <div className="flex flex-wrap items-center justify-center mb-6">
          <div className="flex items-center justify-center w-auto p-3">
            <img 
              src={post.author.photo.url} 
              alt={post.author.name} 
              className="rounded-full h-8 w-8 object-cover" />
            <p className="text-gray-700 font-medium ml-2 lg:text-lg">
              {post.author.name}
            </p>  
          </div>
          <div className="flex items-center justify-center w-auto p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 ml-2 font-medium lg:text-lg">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <p className="lg:text-lg text-gray-700 font-normal leading-relaxed mb-8">
          {post.excerpt}
        </p>
        <Link href={`/posts/${post.slug}`}>
          <button type="button" className="transition hover:bg-pink-700 inline-block bg-pink-600 text-white text-lg font-medium rounded-full px-8 py-3 cursor-pointer focus:ring-offset-2 focus:ring-2 focus:ring-pink-700/50 mb-4">
            Continue Reading
          </button>
        </Link>
      </div>  
    </article>
  );
};

export default PostCard;