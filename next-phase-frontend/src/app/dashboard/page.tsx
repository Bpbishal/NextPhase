'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const images = [
  '/fornxtps.jpg',
  '/pic.jpeg',
];

const greetings = [
  "Welcome Back",
  "Great to See You",
  "Let's Make Today Productive",
  "You're Awesome",
  "Back to Business",
];

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const cardVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [greeting, setGreeting] = useState(greetings[0]);
  const router = useRouter();

  const [stats, setStats] = useState({ totalEmployees: 0, totalLeaves: 0, trainingEnrollments: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:3100/employee/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        router.push('/login');
      });

    setStats({
      totalEmployees: Math.floor(Math.random() * 50) + 10,
      totalLeaves: Math.floor(Math.random() * 20) + 5,
      trainingEnrollments: Math.floor(Math.random() * 10) + 2,
    });
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: 'Jan', leaves: 2 },
    { name: 'Feb', leaves: 5 },
    { name: 'Mar', leaves: 1 },
    { name: 'Apr', leaves: 4 },
    { name: 'May', leaves: 3 },
    { name: 'Jun', leaves: 6 },
  ];

  if (!user)
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-xl text-primary font-bold"
        >
          Loading your dashboard...
        </motion.div>
      </div>
    );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
      className="max-w-4xl mx-auto space-y-12 p-4"
    >
      {/* Image Slider Section */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg border border-blue-100 bg-gradient-to-br from-purple-100 to-blue-50"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImage]}
            src={images[currentImage]}
            alt="Slider Image"
            className="w-full h-full object-cover absolute"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-end pb-8 pl-8"
        >
          <span className="bg-black/60 px-4 py-2 rounded-lg text-white text-lg md:text-2xl font-bold tracking-tight shadow-2xl mb-1">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              key={greeting}
            >
              {greeting}, {user.name}!
            </motion.span>
          </span>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <motion.div
          whileHover={{ scale: 1.09, boxShadow: "0 8px 40px 0 rgb(59 130 246 / 0.22)" }}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.12 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow relative overflow-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0.3 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.2 }}
            transition={{ delay: 0.15, duration: 0.7, type: "spring" }}
            className="absolute right-2 top-2 text-5xl pointer-events-none select-none"
          >
            👨‍💼
          </motion.div>
          <p className="text-base font-semibold tracking-wide">Total Employees</p>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="text-3xl font-extrabold mt-2"
          >
            {stats.totalEmployees}
          </motion.h2>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.09, boxShadow: "0 8px 40px 0 rgb(16 185 129 / 0.22)" }}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-br from-teal-400 to-green-400 text-white p-6 rounded-xl shadow relative overflow-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0.3 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.2 }}
            transition={{ delay: 0.18, duration: 0.7, type: "spring" }}
            className="absolute right-2 top-2 text-5xl pointer-events-none select-none"
          >
            🌴
          </motion.div>
          <p className="text-base font-semibold tracking-wide">Leaves Requested</p>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-extrabold mt-2"
          >
            {stats.totalLeaves}
          </motion.h2>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.09, boxShadow: "0 8px 40px 0 rgb(168 85 247 / 0.22)" }}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.18 }}
          className="bg-gradient-to-br from-purple-500 to-pink-400 text-white p-6 rounded-xl shadow relative overflow-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0.3 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.2 }}
            transition={{ delay: 0.21, duration: 0.7, type: "spring" }}
            className="absolute right-2 top-2 text-5xl pointer-events-none select-none"
          >
            🎓
          </motion.div>
          <p className="text-base font-semibold tracking-wide">Training Enrollments</p>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.5 }}
            className="text-3xl font-extrabold mt-2"
          >
            {stats.trainingEnrollments}
          </motion.h2>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-base-200 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4 text-primary">Leave Requests by Month</h2>
        <ResponsiveContainer width="100%" height={270}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                border: "none",
              }}
              cursor={{ fill: "rgba(59,130,246,0.07)" }}
            />
            <Bar dataKey="leaves" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Personal Touch */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-10"
      >
        <motion.p className="text-lg text-gray-600">
          </motion.p>
      </motion.div>
    </motion.div>
  );
}