'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const data = { name, email, password, phone };

        try {
            const res = await axios.post('http://localhost:3100/auth/signup', data);
            toast.success(res.data.message || 'Signup successful');
            console.log('User:', res.data.user);

            setName('');
            setEmail('');
            setPassword('');
            setPhone('');
        } catch (err: any) {
            console.log(err.response?.data);
            toast.error(err.response?.data?.message || 'Signup Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
            <Toaster position="top-center" />
            <div className="flex flex-col gap-6 p-6 max-w-sm w-full bg-base-200 rounded-lg shadow-lg animate-fadeIn">
                <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input input-bordered transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:scale-105 hover:scale-105"
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input input-bordered transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:scale-105 hover:scale-105"
                    />
                    <input
                        type="password"
                        placeholder="Enter Password (Min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input input-bordered transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:scale-105 hover:scale-105"
                    />
                    <input
                        type="text"
                        placeholder="Enter Phone (+880...)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="input input-bordered transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:scale-105 hover:scale-105"
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary transition-all duration-200 hover:scale-105 active:scale-95 font-bold"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </form>

                <p className="text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline transition-colors duration-200">
                        Login
                    </Link>
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