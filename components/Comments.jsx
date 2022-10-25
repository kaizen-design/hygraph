import { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);
  console.log(comments);
  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h4 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comment{comments.length > 1 ? 's' : ''}
          </h4>
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 mb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span>
                {' '} 
                on 
                {' '} 
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>        
      )}
    </>
  );
};

export default Comments;