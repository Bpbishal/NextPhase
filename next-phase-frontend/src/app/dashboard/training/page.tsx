'use client'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TrainingPage() {
  const router = useRouter();

  const handleBack = () => router.push('/dashboard');
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const btnClass = 'btn w-full font-bold transition-transform duration-200';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl p-8 flex flex-col gap-8 bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 rounded-2xl shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-4 text-blue-700"
        >
          Training
        </motion.h1>

        <motion.button 
          className={`${btnClass} btn-primary`}
          whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(59 130 246 / 0.15)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/dashboard/training/available')}
        >
          View Available Trainings
        </motion.button>

        <motion.button 
          className={`${btnClass} btn-secondary`}
          whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(34 197 94 / 0.15)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/dashboard/training/my-enrollments')}
        >
          My Enrollments
        </motion.button>

        <motion.button 
          className={`${btnClass} btn-accent`}
          whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(236 72 153 / 0.15)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/dashboard/training/certificate')}
        >
          Certificates
        </motion.button>

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