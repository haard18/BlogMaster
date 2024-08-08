import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from './ui/sparkles';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    // Function to check if auth token is present
    const isAuthenticated = !!localStorage.getItem('token');

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect to homepage or login page after logout
        navigate('/auth');
    };

    return (
        <>
            <nav className="bg-gray-800 p-4 w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="text-white text-lg font-bold">
                        BlogMaster
                    </div>
                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <>

                                <button
                                    onClick={() => handleNavigation('/auth')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={200}
                className="w-full h-full"
                particleColor="#FFFFFF"
            />
        </>
    );
};

export default Navbar;
