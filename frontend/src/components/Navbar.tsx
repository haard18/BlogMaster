import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from './ui/sparkles';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <>
            <nav className="bg-gray-800 p-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-bold">
                        BlogMaster
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleNavigation('/auth')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => handleNavigation('/auth')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Sign Up
                        </button>
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