import React, { useState, useEffect } from 'react';
import { SparklesCore } from './ui/sparkles';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirecting

import AppNavbar from './AppNavbar';

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');

    const navigate = useNavigate(); // Initialize the navigate function

    // Use effect to check the token on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn("No token found, redirecting to the auth page."); // Optional warning for debugging
            navigate('/auth'); // Redirect to the authentication page if no token is found
        }
    }, [navigate]); // Ensure that navigate is included in the dependency array

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Fetch token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Cannot submit blog: Token not found."); // Log error if the token is missing
            return; // Exit the function if the token does not exist
        }

        try {
            // Example POST request with token
            const response = await fetch('http://localhost:5000/api/post/addblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${token}`, // Attach token to the Authorization header
                },
                body: JSON.stringify({ title, description, tag }),
            });

            if (!response.ok) {
                console.error('Failed to create blog.'); // Log error if the request fails
                return;
            }

            const data = await response.json();
            console.log('Blog created:', data); // Log success message
            navigate('/allblogs'); // Optionally redirect to the blogs list or another page after successful submission
        } catch (error) {
            console.error('Error creating blog:', error); // Log any other errors
        }
    };

    return (
        <>
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden ">
                <AppNavbar/>
            </div>
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden mt-[5%]">
                <div className="bg-gray-500 flex flex-col p-20 mt-[5%] rounded-2xl w-[80%] max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter blog title"
                                required // Make the field required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter blog description"
                                required // Make the field required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                                Tag
                            </label>
                            <input
                                type="text"
                                id="tag"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter blog tag"
                                required // Make the field required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
        </>
    );
};

export default CreateBlog;
