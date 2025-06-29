'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function UpdateProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState<number | ''>('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

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
    }).then(res => {
      setProfile(res.data);
      setDepartment(res.data.department);
      setSalary(res.data.salary);
    }).catch(() => {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    });
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.patch('http://localhost:3100/employee/me', 
        { department, salary },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Profile updated successfully');
      router.push('/dashboard');
    } catch {
      toast.error('Update failed. Please try again.');
    }
  };

  const sendOtp = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoadingOtp(true);
    try {
      await axios.post('http://localhost:3100/employee/send-otp', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOtpSent(true);
      toast.success('OTP sent to your registered phone/email');
    } catch {
      toast.error('Failed to send OTP');
    } finally {
      setLoadingOtp(false);
    }
  };

  const updatePassword = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!otp || !newPassword) {
      toast.error('Please enter both OTP and new password');
      return;
    }

    setUpdatingPassword(true);
    try {
      await axios.post('http://localhost:3100/employee/update-password', 
        { otp, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password updated successfully');
      setShowPasswordModal(false);
      setOtp('');
      setNewPassword('');
      setOtpSent(false);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update password. Check OTP and try again.';
      toast.error(message);
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (!profile)
    return (
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 shadow-2xl p-8 space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-2xl font-bold mb-4 text-center text-blue-700"
          >
            Update Your Profile
          </motion.h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <motion.input 
              type="text"
              value={profile.user.name}
              disabled
              className="input input-bordered bg-gray-100 w-full cursor-not-allowed"
              placeholder="Name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            />
            <motion.input 
              type="email"
              value={profile.user.email}
              disabled
              className="input input-bordered bg-gray-100 w-full cursor-not-allowed"
              placeholder="Email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
            />
            <motion.input 
              type="text"
              value={profile.user.phone}
              disabled
              className="input input-bordered bg-gray-100 w-full cursor-not-allowed"
              placeholder="Phone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.21 }}
            />
            <motion.input 
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Department"
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
            />
            <motion.input 
              type="number"
              value={salary}
              onChange={e => setSalary(Number(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Salary"
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.27 }}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-full font-bold transition-all"
            >
              Update Profile
            </motion.button>
          </form>

          <motion.button 
            onClick={() => setShowPasswordModal(true)} 
            whileHover={{ scale: 1.04, backgroundColor: "#6366f1" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-secondary w-full mt-2 font-semibold transition-all"
          >
            Change Password
          </motion.button>

          <motion.button 
            onClick={() => router.push('/dashboard')} 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline w-full mt-2 font-semibold transition-all"
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-base-100 p-8 rounded-2xl w-full max-w-sm space-y-4 shadow-xl relative"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-center mb-2 text-blue-700">Update Password</h3>

              {!otpSent ? (
                <motion.button 
                  onClick={sendOtp} 
                  disabled={loadingOtp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-primary w-full"
                >
                  {loadingOtp ? 'Sending OTP...' : 'Send OTP'}
                </motion.button>
              ) : (
                <>
                  <motion.input 
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="input input-bordered w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                  <motion.input 
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="input input-bordered w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.14 }}
                  />
                  <motion.button 
                    onClick={updatePassword}
                    disabled={updatingPassword}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary w-full"
                  >
                    {updatingPassword ? 'Updating...' : 'Update Password'}
                  </motion.button>
                </>
              )}

              <motion.button 
                onClick={() => setShowPasswordModal(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-outline w-full"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}