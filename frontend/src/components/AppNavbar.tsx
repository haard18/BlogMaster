import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from './ui/sparkles';

const AppNavbar: React.FC = () => {
    const navigate = useNavigate();

    // Function to check if auth token is present
    const isAuthenticated = !!localStorage.getItem('token');

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect to homepage or login page after logout
        navigate('/');
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
                            <>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md relative z-20"
                                    onClick={() => handleNavigation('/createblog')}
                                >
                                    Create Blog
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md relative z-20"
                                    onClick={() => handleNavigation('/allblogs')}
                                >
                                    Read All Blogs
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => handleNavigation('/auth')}
                            >
                                Login
                            </button>
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

export default AppNavbar;