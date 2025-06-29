'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ViewProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Session expired. Please login again.');
            router.push('/login');
            return;
        }

        axios.get('http://localhost:3100/employee/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setProfile(res.data);
            })
            .catch(() => {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('token');
                router.push('/login');
            });
    }, [router]);

    const handleBack = () => router.push('/dashboard');

    if (!profile) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
            <p className="text-center text-lg animate-pulse">Loading profile...</p>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
            <div className="max-w-md w-full">
                <div className="card bg-base-200 shadow-xl p-6 space-y-4 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-center mb-4">Your Profile Details</h2>

                    <div className="space-y-2 text-base">
                        <div className="flex justify-between">
                            <span className="font-semibold">Name:</span>
                            <span>{profile.user.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Email:</span>
                            <span>{profile.user.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Phone:</span>
                            <span>{profile.user.phone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Department:</span>
                            <span>{profile.department}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Salary:</span>
                            <span>{profile.salary}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button 
                            onClick={handleBack} 
                            className="btn btn-primary w-full transition-all duration-200 hover:scale-105 active:scale-95 font-bold"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
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