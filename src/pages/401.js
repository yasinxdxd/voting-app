import React from 'react';
import { Link } from 'react-router-dom'; // Use this if you're using react-router

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">401</h1>
        <p className="text-lg text-gray-700 mb-6">
          Unauthorized! You don't have permission to access this page.
        </p>
        <Link
          to="/signin"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;