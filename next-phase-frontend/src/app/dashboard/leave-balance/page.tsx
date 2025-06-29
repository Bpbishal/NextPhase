'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function LeaveBalancePage() {
  const [balance, setBalance] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('http://localhost:3100/leave/balance', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBalance(res.data))
    .catch(() => {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    });
  }, [router]);

  const handleBack = () => router.push('/dashboard');
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!balance) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
      <motion.p
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="text-center text-lg"
      >
        Loading...
      </motion.p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md p-8 bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 rounded-2xl shadow-2xl flex flex-col gap-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold mb-2 text-center text-blue-700"
        >
          Leave Balance
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="border border-blue-200 p-8 rounded-xl shadow-lg bg-white/90 space-y-4 text-lg"
        >
          <p>
            <span className="font-semibold text-blue-700">Total Allowed:</span>
            <span className="ml-2 text-blue-900">{balance.totalAllowed}</span>
          </p>
          <p>
            <span className="font-semibold text-purple-700">Used:</span>
            <span className="ml-2 text-purple-900">{balance.used}</span>
          </p>
          <p>
            <span className="font-semibold text-green-700">Remaining:</span>
            <span className="ml-2 text-green-900">{balance.remaining}</span>
          </p>
        </motion.div>

        <div className="flex justify-center mt-2">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(59 130 246 / 0.20)" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline transition-all font-semibold px-10"
          >
            Back to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}