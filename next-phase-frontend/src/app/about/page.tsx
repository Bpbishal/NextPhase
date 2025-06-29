'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

// Team Data
const team = [
  { name: "Bishal", role: "CEO", img: "/ceo.jpg" },
  { name: "Tony Stark", role: "CTO", img: "/cto.jpg" },
  { name: "Steve Rogers", role: "HR Lead", img: "/hr.jpg" },
];

// Milestones Data
const milestones = [
  { year: "2021", event: "NextPhase Founded" },
  { year: "2022", event: "Launched Employee OS" },
  { year: "2023", event: "100+ Employees Achieved" },
  { year: "2024", event: "Awarded HR Tech Innovator" },
];

// Employee Growth Data
const data = [
  { name: 'Jan', Employees: 30 },
  { name: 'Feb', Employees: 40 },
  { name: 'Mar', Employees: 35 },
  { name: 'Apr', Employees: 50 },
  { name: 'May', Employees: 55 },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto p-4 space-y-10"
      >
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8 text-blue-700 drop-shadow"
        >
          About NextPhase
        </motion.h1>

        {/* Animated Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="flex flex-wrap justify-center gap-10 mb-6"
        >
          <div className="bg-white/80 rounded-xl shadow-md p-6 text-center min-w-[150px]">
            <div className="text-4xl font-bold text-blue-700">
              <CountUp end={120} duration={2} />+
            </div>
            <div className="text-lg mt-1">Employees</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow-md p-6 text-center min-w-[150px]">
            <div className="text-4xl font-bold text-green-600">
              <CountUp end={20} duration={2} />+
            </div>
            <div className="text-lg mt-1">Clients</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow-md p-6 text-center min-w-[150px]">
            <div className="text-4xl font-bold text-purple-700">
              <CountUp end={5} duration={2} />
            </div>
            <div className="text-lg mt-1">Years in Business</div>
          </div>
        </motion.section>

        {/* Company Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-3"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Company Overview</h2>
          <p>
            NextPhase Employee OS provides modern employee management, leave tracking, and training automation
            solutions. Our mission is to streamline HR processes and empower employees with easy-to-use tools.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Mission & Vision</h2>
          <p>
            <span className="font-bold text-blue-800">Mission:</span> To empower organizations and people with seamless, modern and agile HR solutions.
          </p>
          <p>
            <span className="font-bold text-blue-800">Vision:</span> To be the leading HR technology partner for innovative businesses across the globe.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="bg-blue-200/70 text-blue-900 font-semibold rounded px-3 py-1">Innovation</span>
            <span className="bg-green-200/60 text-green-800 font-semibold rounded px-3 py-1">Integrity</span>
            <span className="bg-purple-200/60 text-purple-800 font-semibold rounded px-3 py-1">Collaboration</span>
            <span className="bg-yellow-100/80 text-yellow-800 font-semibold rounded px-3 py-1">Growth</span>
          </div>
        </motion.section>

        {/* Milestones Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Journey</h2>
          <div className="relative border-l-4 border-blue-300 ml-4 pl-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16 + i * 0.07 }}
                className="mb-6"
              >
                <div className="absolute -left-7 top-1.5 bg-blue-500 rounded-full w-4 h-4 border-2 border-white" />
                <div className="text-blue-800 font-bold">{m.year}</div>
                <div className="ml-1 text-blue-700">{m.event}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-6"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="rounded-xl shadow-lg bg-white/90 p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.06 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-24 h-24 mx-auto mb-3 object-cover"
                />
                <div className="font-bold">{member.name}</div>
                <div className="text-blue-500">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="bg-white/80 p-4 rounded-lg shadow flex flex-col">
              <span className="text-lg italic">"NextPhase has transformed how our HR works. The leave and training modules are a joy to use."</span>
              <span className="mt-2 font-semibold text-blue-700">— Fatema Begum, HR at TechNova</span>
            </blockquote>
            <blockquote className="bg-white/80 p-4 rounded-lg shadow flex flex-col">
              <span className="text-lg italic">"We scaled from 10 to 100 employees with NextPhase. Highly recommended!"</span>
              <span className="mt-2 font-semibold text-blue-700">— Sazzad Karim, COO at DataCraft</span>
            </blockquote>
          </div>
        </motion.section>

        {/* Team Stats Graph */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Employee Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Employees" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.section>

        {/* Contact Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-3"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Contact Information</h2>
          <p><strong>Email:</strong> <a href="mailto:support@nextphase.com" className="text-blue-600 underline">support@nextphase.com</a></p>
          <p><strong>Phone:</strong> +880 123 456 7890</p>
          <p><strong>Office Hours:</strong> Sunday - Thursday, 9 AM - 6 PM</p>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
              <img src="/facebook.jpg" alt="Facebook" className="w-7 h-7 hover:scale-110 transition" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <img src="/linkedin.png" alt="LinkedIn" className="w-7 h-7 hover:scale-110 transition" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter">
              <img src="/twitter.jpg" alt="Twitter" className="w-7 h-7 hover:scale-110 transition" />
            </a>
          </div>
        </motion.section>

        {/* HR Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.23 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-3"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Human Resources</h2>
          <p>
            Our HR department is dedicated to supporting employees with onboarding, training, and welfare. If you
            have questions regarding policies or employee benefits, contact <a href="mailto:hr@nextphase.com" className="text-blue-600 underline">hr@nextphase.com</a>.
          </p>
        </motion.section>

        {/* Location & Pictures */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Our Location</h2>
          <p>NextPhase Headquarters, Dhaka, Bangladesh.</p>
          {/* Map - You can replace the src below with your actual address for a real embed */}
          <div className="rounded-xl shadow-lg overflow-hidden my-4">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.375,23.780,90.410,23.800&layer=mapnik"
              width="100%"
              height="220"
              className="w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="NextPhase Map"
            ></iframe>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <motion.img
              src="/office1.jpg"
              alt="Office View 1"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover h-[200px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.27 }}
            />
            <motion.img
              src="/office2.jpg"
              alt="Office View 2"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover h-[200px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.29 }}
            />
            <motion.img
              src="/office3.jpg"
              alt="Office View 3"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover h-[200px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.31 }}
            />
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.27 }}
          className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">FAQs</h2>
          <div className="space-y-3">
            <details className="bg-white/70 rounded px-4 py-2 shadow cursor-pointer">
              <summary className="font-semibold">How can I reset my password?</summary>
              <div className="pl-2 mt-1">Go to the login page and click "Forgot Password". Follow the instructions to receive an OTP and reset your password.</div>
            </details>
            <details className="bg-white/70 rounded px-4 py-2 shadow cursor-pointer">
              <summary className="font-semibold">How do I request leave?</summary>
              <div className="pl-2 mt-1">Navigate to "Request Leave" in your dashboard, select type and dates, and submit your request.</div>
            </details>
            <details className="bg-white/70 rounded px-4 py-2 shadow cursor-pointer">
              <summary className="font-semibold">Who do I contact for payroll issues?</summary>
              <div className="pl-2 mt-1">Contact HR at <a href="mailto:hr@nextphase.com" className="text-blue-600 underline">hr@nextphase.com</a> for any payroll-related concerns.</div>
            </details>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}