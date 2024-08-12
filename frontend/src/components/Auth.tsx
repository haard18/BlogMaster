import React, { useState } from 'react';
import { SparklesCore } from './ui/sparkles';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setAlertMessage(''); // Clear alert message on form switch
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = isLogin
            ? 'https://blogmaster-server-83cv.onrender.com/api/user/login'
            : 'https://blogmaster-server-83cv.onrender.com/api/user/signup';

        const payload = isLogin
            ? { email, password }
            : { username, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log(data.token);

            if (response.ok) {
                setAlertMessage(isLogin ? 'Login successful!' : 'Sign-up successful! Welcome!');
                setAlertType('success');
                navigate('/allblogs'); // Additional logic for successful login/signup, e.g., redirecting
                
                // Additional logic for successful login/signup, e.g., redirecting
            } else {
                setAlertMessage(data.message || 'An error occurred.');
                setAlertType('error');
            }
        } catch (error) {
            setAlertMessage('Network error. Please try again later.');
            setAlertType('error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="bg-gray-500 flex flex-col p-20 mt-[10%] rounded-2xl">
                <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
                {alertMessage && (
                    <div
                        className={`mb-4 p-4 rounded ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                    >
                        {alertMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-10">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        <button
                            type="button"
                            onClick={toggleForm}
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
            <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={120}
                className="w-full h-full"
                particleColor="#FFFFFF"
            />
        </div>
    );
};

export default Auth;
