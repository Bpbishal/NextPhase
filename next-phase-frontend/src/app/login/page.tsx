'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3100/auth/login', { email, password });
            toast.success('Login Successful');
            localStorage.setItem('token', res.data.access_token);
            console.log('User:', res.data.user);

            setEmail('');
            setPassword('');

            router.push('/dashboard');
        } catch (err: any) {
            console.log(err.response?.data);
            toast.error('Login Failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        router.push('/signup');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
            <Toaster position="top-center" />
            <div className="flex flex-col gap-6 p-6 max-w-sm w-full bg-base-200 rounded-lg shadow-lg animate-fadeIn">
                <h1 className="text-2xl font-bold text-center mb-4">Employee Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input input-bordered transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:scale-105 hover:scale-105"
                    />
                    <input 
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input input-bordered transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:scale-105 hover:scale-105"
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary transition-all duration-200 hover:scale-105 active:scale-95 font-bold"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center">
                    Don't have an account?{' '}
                    <button 
                        onClick={handleSignup} 
                        className="text-blue-600 hover:underline transition-colors duration-200"
                    >
                        Sign Up
                    </button>
                </p>
                <p className="text-center mt-4">
                    {" "}
                    <button
                        onClick={() => router.push('/forgot-password')}
                        className="text-blue-500 hover:underline transition-colors duration-200"
                    >Forgot your password?
                    </button>
                </p>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.9s cubic-bezier(.4,0,.2,1);
                }
            `}</style>
        </div>
    );
}