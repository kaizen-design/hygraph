import React from 'react';
import moment from 'moment';
// import Image from 'next/image';

const PostDetails = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg lg:p-8 mb-8">
      <div className="relative rounded-lg shadow-md mb-4 lg:mb-8">        
        <img 
          src={post.featuredImage.url} 
          alt={post.title} 
          className="h-full w-full object-cover lg:shadow-lg rounded-t-lg lg:rounded-lg"
        />        
      </div>
      <div className="p-6 lg:p-0">
        <div className="flex flex-wrap items-center justify-start mb-4">
          <div className="flex items-center justify-center w-auto p-3 pl-0">
            <img 
              src={post.author.photo.url} 
              alt={post.author.name} 
              className="rounded-full h-8 w-8 object-cover" />
            <p className="text-gray-700 font-medium ml-2 lg:text-lg">
              {post.author.name}
            </p>  
          </div>
          <div className="flex items-center justify-center w-auto p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 ml-2 font-medium lg:text-lg">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">       
          {post.title}       
        </h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div> 
    </div>
  );
};

export default PostDetails;

const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = (<b key={index}>{text}</b>);
    }

    if (obj.italic) {
      modifiedText = (<em key={index}>{text}</em>);
    }

    if (obj.underline) {
      modifiedText = (<u key={index}>{text}</u>);
    }
  }  

  switch (type) {
    case 'heading-three':
      return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
    case 'heading-four':
      return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;  
    case 'paragraph':
      return <p key={index} className="mb-6 leading-relaxed">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;    
    case 'block-quote':
      return <blockquote key={index} className="p-4 my-8 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800"><p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p></blockquote>
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      );
    default:
      return modifiedText;
  }
};