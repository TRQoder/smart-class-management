
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Make sure heroicons is installed

function UnauthPage() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/auth/login'); // redirect to login or dashboard as needed
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
                <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You do not have permission to view this page.
                </p>
                <button
                    onClick={handleRedirect}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}

export default UnauthPage;
