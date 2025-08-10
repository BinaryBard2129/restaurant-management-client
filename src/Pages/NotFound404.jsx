import React from 'react';
import { useNavigate } from 'react-router';

const NotFound404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-red-100 via-red-200 to-red-300 px-6">
      <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
      <p className="text-2xl font-semibold text-red-800 mb-4">Oops! Page Not Found</p>
      <p className="text-red-700 mb-8 max-w-md text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
        aria-label="Go back to home page"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound404;
