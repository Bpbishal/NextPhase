'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Enrollment {
  id: number;
  training: {
    id: number;
    name: string;
    department: string;
  };
  status: string;
  certificateRequested: boolean;
}

export default function CertificatesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const router = useRouter();

  const fetchEnrollments = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('http://localhost:3100/training/my-enrollments', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEnrollments(res.data))
    .catch(() => {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    });
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleRequestCertificate = async (enrollmentId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      setLoadingId(enrollmentId);
      await axios.post(`http://localhost:3100/training/request-certificate/${enrollmentId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Certificate requested successfully!');
      fetchEnrollments();
    } catch {
      toast.error('Failed to request certificate.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleBack = () => router.push('/dashboard/training');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl p-8 bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 rounded-2xl shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-center text-blue-700"
        >
          Certificate Requests
        </motion.h1>

        {enrollments.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600"
          >
            No enrollments found.
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
                  <th className="py-3 px-3 text-left font-semibold rounded-tl-xl">ID</th>
                  <th className="py-3 px-3 text-left font-semibold">Training Name</th>
                  <th className="py-3 px-3 text-left font-semibold">Department</th>
                  <th className="py-3 px-3 text-left font-semibold">Status</th>
                  <th className="py-3 px-3 text-left font-semibold">Certificate Requested</th>
                  <th className="py-3 px-3 text-left font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {enrollments.map((e, i) => (
                    <motion.tr
                      key={e.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.13 + i * 0.045, duration: 0.5 }}
                      className={`hover:bg-blue-100/70 transition-colors ${i % 2 === 0 ? 'bg-purple-50/60' : 'bg-white/70'}`}
                    >
                      <td className="py-2 px-3">{e.id}</td>
                      <td className="py-2 px-3">{e.training.name}</td>
                      <td className="py-2 px-3">{e.training.department}</td>
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold
                          ${
                            e.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-700'
                              : e.status === 'IN PROGRESS'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                          }
                        `}>
                          {e.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        {e.certificateRequested ? (
                          <span className="text-green-700 font-bold">Yes</span>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <motion.button
                          whileHover={{ scale: e.certificateRequested || e.status !== 'COMPLETED' ? 1 : 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-sm btn-primary transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={e.certificateRequested || e.status !== 'COMPLETED' || loadingId === e.id}
                          onClick={() => handleRequestCertificate(e.id)}
                        >
                          {loadingId === e.id ? 'Processing...' : 'Request Certificate'}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <motion.button 
            onClick={handleBack} 
            whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(59 130 246 / 0.20)" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline font-semibold px-10 transition-all"
          >
            Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}