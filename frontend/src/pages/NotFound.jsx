import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/outline'; // Ensure heroicons is installed

function NotFound() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/'); // Redirect to main home page or login
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
                <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-5xl font-bold mb-2 text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Oops! The page you are looking for does not exist.
                </p>
                <button
                    onClick={handleRedirect}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}

export default NotFound;
