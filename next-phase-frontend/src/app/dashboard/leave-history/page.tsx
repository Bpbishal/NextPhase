'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeaveHistoryPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const router = useRouter();

  const fetchLeaves = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('http://localhost:3100/leave/my-leaves', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setLeaves(res.data))
    .catch(() => {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleDelete = (id: number) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to delete this pending leave request?</p>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-error"
            onClick={async () => {
              toast.dismiss(t.id);
              const token = localStorage.getItem('token');
              if (!token) return;

              try {
                await axios.delete(`http://localhost:3100/leave/${id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Leave request deleted');
                fetchLeaves();
              } catch {
                toast.error('Failed to delete leave request');
              }
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-center',
    });
  };

  const handleBack = () => router.push('/dashboard');

  const formatDate = (date: string) => date.split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl p-8 bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 rounded-2xl shadow-2xl flex flex-col gap-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-center text-blue-700"
        >
          Leave History
        </motion.h1>

        {leaves.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600"
          >
            No leave records found.
          </motion.p>
        ) : (
          <div className="overflow-x-auto">
            <motion.table
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="table w-full border border-blue-100 rounded-xl shadow-md bg-white/90"
            >
              <thead>
                <tr className="bg-gradient-to-r from-blue-200 via-purple-100 to-blue-100 text-blue-800">
                  <th className="py-3 px-3 text-left font-semibold rounded-tl-xl">#</th>
                  <th className="py-3 px-3 text-left font-semibold">Type</th>
                  <th className="py-3 px-3 text-left font-semibold">From</th>
                  <th className="py-3 px-3 text-left font-semibold">To</th>
                  <th className="py-3 px-3 text-left font-semibold">Status</th>
                  <th className="py-3 px-3 text-left font-semibold">Requested At</th>
                  <th className="py-3 px-3 text-left font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {leaves.map((leave, index) => (
                    <motion.tr
                      key={leave.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.13 + index * 0.05, duration: 0.5 }}
                      className={`hover:bg-blue-100/70 transition-colors ${index % 2 === 0 ? 'bg-purple-50/60' : 'bg-white/70'}`}
                    >
                      <td className="py-2 px-3 font-semibold text-blue-500">{index + 1}</td>
                      <td className="py-2 px-3">{leave.type}</td>
                      <td className="py-2 px-3">{formatDate(leave.fromDate)}</td>
                      <td className="py-2 px-3">{formatDate(leave.toDate)}</td>
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold
                          ${
                            leave.status === 'APPROVED'
                              ? 'bg-green-100 text-green-700'
                              : leave.status === 'REJECTED'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }
                        `}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="py-2 px-3">{formatDate(leave.requestedAt)}</td>
                      <td className="py-2 px-3">
                        {leave.status === 'PENDING' ? (
                          <motion.button
                            onClick={() => handleDelete(leave.id)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            className="btn btn-sm btn-error transition-transform"
                          >
                            Delete
                          </motion.button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </div>
        )}

        <div className="flex justify-center mt-2">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 16px 0 rgb(59 130 246 / 0.10)" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline font-semibold px-10 transition-all"
          >
            Back to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}