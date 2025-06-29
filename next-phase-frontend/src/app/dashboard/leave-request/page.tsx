'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function LeaveRequestPage() {
  const [type, setType] = useState('VACATION');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to submit leave request.');
      router.push('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3100/leave',
        { type, fromDate, toDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Leave request submitted successfully');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err.response?.data);
      toast.error('Failed to submit leave request');
    }
  };

  const handleBack = () => router.push('/dashboard');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg p-8 bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 rounded-2xl shadow-2xl flex flex-col gap-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold mb-2 text-center text-blue-700"
        >
          Request Leave
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="select select-bordered"
            required
            whileFocus={{ scale: 1.03 }}
          >
            <option value="VACATION">Vacation</option>
            <option value="SICK">Sick</option>
            <option value="EMERGENCY">Emergency</option>
          </motion.select>

          <motion.input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
            className="input input-bordered"
            placeholder="From Date"
            whileFocus={{ scale: 1.03 }}
          />

          <motion.input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
            className="input input-bordered"
            placeholder="To Date"
            whileFocus={{ scale: 1.03 }}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(59 130 246 / 0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary font-semibold transition-all"
          >
            Submit Request
          </motion.button>
        </motion.form>

        <div className="flex justify-center mt-2">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 16px 0 rgb(59 130 246 / 0.10)" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline font-semibold px-8 transition-all"
          >
            Back to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}