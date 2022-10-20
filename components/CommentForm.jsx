import { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000);
    });

  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8">
      <h3 className="text-xl font-semibold border-b pb-4 mb-8">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentEl} 
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Comment"
          name="comment"
          rows="4"
          required
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input 
          type="text"
          ref={nameEl} 
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Name"
          name="name"
          required
        />
        <input 
          type="email"
          ref={emailEl} 
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
          placeholder="Email"
          name="email"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex items-center">
          <input 
            ref={storeDataEl} 
            type="checkbox" 
            name="storeData"
            id="storeData"
          />
          <label className="text-gray-500 cursor-pointer ml-2 text-sm" htmlFor="storeData">Save my name and email for the next time I comment.</label>
        </div>
      </div>      
      <div className="mt-8">
        <button 
          type="button" 
          className="transition hover:bg-pink-700 inline-block bg-pink-600 text-white text-lg font-medium rounded-full px-8 py-3 cursor-pointer focus:ring-offset-2 focus:ring-2 focus:ring-pink-700/50"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {error && <p className="text-xl float-right mt-3 font-semibold text-red-500">All fields are required.</p>}
        {showSuccessMessage && <p className="text-xl float-right mt-3 font-semibold text-green-500">Comment submitted for review.</p>}
      </div>
    </div>
  );
};

export default CommentForm;