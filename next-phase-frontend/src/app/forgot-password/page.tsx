"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3100/employee/send-otp", { email });
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch {
      toast.error("Failed to send OTP");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3100/employee/update-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password updated successfully");
      router.push("/login");
    } catch {
      toast.error("Invalid OTP or error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm space-y-6 p-8 shadow-2xl rounded-2xl bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl font-bold text-center text-blue-700"
        >
          Reset Password with OTP
        </motion.h2>

        <motion.input
          type="email"
          placeholder="Enter your registered email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
        />

        <AnimatePresence>
          {!otpSent ? (
            <motion.button
              key="otp"
              className="btn btn-primary w-full font-semibold"
              onClick={handleSendOtp}
              disabled={loading || !email}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </motion.button>
          ) : (
            <>
              <motion.input
                key="otpinput"
                type="text"
                placeholder="Enter OTP"
                className="input input-bordered w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              <motion.input
                key="pwinput"
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              />
              <motion.button
                key="pwbtn"
                className="btn btn-success w-full font-semibold"
                onClick={handleResetPassword}
                disabled={loading || !otp || !newPassword}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? "Processing..." : "Reset Password"}
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}