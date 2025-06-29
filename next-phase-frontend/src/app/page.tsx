'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Countdown hook (SSR-safe)
function useCountdown(targetDate: Date | null) {
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    if (!targetDate) return;
    function update() {
      if (!targetDate) return;
      setCountDown(Math.max(0, targetDate.getTime() - Date.now()));
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: countDown === 0 };
}


const THEMES = ['light', 'synthwave'];

export default function Home() {
  const [deadline, setDeadline] = useState<Date | null>(null);
  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 10);
    setDeadline(d);
  }, []);
  const { days, hours, minutes, seconds, expired } = useCountdown(deadline);

  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const baseBtn =
    'transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ring-opacity-30 shadow-md';
  const animatedPrimary =
    `${baseBtn} bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:from-purple-500 hover:to-blue-500 hover:bg-gradient-to-l`;
  const animatedOutline =
    `${baseBtn} border-2 border-blue-500 text-blue-700 bg-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 hover:text-white hover:border-blue-700`;
  const animatedDemo =
    `${baseBtn} border-2 border-purple-500 text-purple-700 bg-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-500 hover:text-white hover:border-purple-700`;
  const animatedFooter =
    `${baseBtn} bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-400 hover:text-white`;

  if (!deadline) return null;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg p-3 sticky top-0 z-50">
        <div className="flex-1 items-center gap-3">
          <img src="/nplogo.jpg" alt="NextPhase Logo" width={40} height={40} className="rounded-full" />
          <span className="font-bold text-xl tracking-wide text-white drop-shadow-lg">NextPhase Employee OS</span>
        </div>
        <div className="flex-none gap-3 items-center flex">
          <input type="text" placeholder="Search..." className="input input-bordered input-sm w-32 md:w-auto" />
          <Link href="/about" className={animatedOutline}>
            About Us
          </Link>
          <Link href="/login" className={animatedPrimary}>
            Log In
          </Link>
          {/* Theme Switcher */}
          <button
            type="button"
            aria-label="Toggle theme"
            className="swap swap-rotate ml-2 bg-transparent border-none cursor-pointer"
            onClick={() => setTheme(theme === "light" ? "synthwave" : "light")}
          >
            {/* Sun Icon */}
            <svg
              className={`swap-off h-7 w-7 fill-current ${theme === "light" ? "opacity-100" : "opacity-20"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,5.64,17ZM12,5A1,1,0,0,0,12,3a1,1,0,0,0,0,2ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Z" />
            </svg>
            {/* Moon Icon */}
            <svg
              className={`swap-on h-7 w-7 fill-current ${theme === "synthwave" ? "opacity-100" : "opacity-20"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14A8.05,8.05,0,0,1,12,5,8.59,8.59,0,0,1,12.14,19.73,8.14,8.14,0,0,1,21.64,13Z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-[65vh] bg-gradient-to-r from-blue-100 to-purple-100 flex items-center relative">
        <div className="hero-content flex-col lg:flex-row-reverse justify-center gap-12 w-full">
          <img src="/office-people.jpg" alt="Workforce" width={350} height={350} className="rounded-xl shadow-2xl hidden md:block" />
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-purple-700 drop-shadow-lg">
              Your Workforce, Upgraded.
            </h1>
            <p className="mb-6 text-lg text-gray-800 font-medium">
              Smarter employee management, automated leave tracking, and easy training assignments—All in one platform.
            </p>
            <div className="flex gap-4">
              <button className={animatedPrimary}>Get Started</button>
              <Link href="/demo" className={animatedDemo}>Live Demo</Link>
            </div>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 bg-purple-200 rounded-full w-20 h-20 blur-2xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 bg-blue-200 rounded-full w-32 h-32 blur-2xl opacity-40 pointer-events-none"></div>
      </section>

      {/* Countdown for Internship Opportunity */}
      <section className="text-center my-10 space-y-4">
        <h2 className="text-3xl font-bold text-red-500 animate-pulse">Hurry Up! Internship Application Closing In:</h2>
        {!expired ? (
          <div className="flex justify-center gap-8 text-2xl">
            <div>
              <span className="font-mono text-4xl">{days.toString().padStart(2, '0')}</span>
              <div className="text-sm">days</div>
            </div>
            <div>
              <span className="font-mono text-4xl">{hours.toString().padStart(2, '0')}</span>
              <div className="text-sm">hours</div>
            </div>
            <div>
              <span className="font-mono text-4xl">{minutes.toString().padStart(2, '0')}</span>
              <div className="text-sm">mins</div>
            </div>
            <div>
              <span className="font-mono text-4xl">{seconds.toString().padStart(2, '0')}</span>
              <div className="text-sm">secs</div>
            </div>
          </div>
        ) : (
          <div className="text-xl font-semibold text-red-600">Applications are now closed!</div>
        )}
        <p className="badge badge-error p-3 mt-2">Apply Now to Kickstart Your Career with NextPhase</p>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14 px-3">
        <div className="card bg-white shadow-xl hover:scale-105 transition-transform duration-200">
          <div className="card-body items-center text-center">
            <img src="/employee.jpg" alt="Employee" width={80} height={80} />
            <h3 className="card-title text-lg font-bold">Employee Directory</h3>
            <p>Find, onboard, and manage your entire workforce with clarity and ease.</p>
          </div>
        </div>
        <div className="card bg-white shadow-xl hover:scale-105 transition-transform duration-200">
          <div className="card-body items-center text-center">
            <img src="/leave.jpg" alt="Leave" width={80} height={80} />
            <h3 className="card-title text-lg font-bold">Leave Automation</h3>
            <p>Fully automated leave approvals and tracking, including notifications.</p>
          </div>
        </div>
        <div className="card bg-white shadow-xl hover:scale-105 transition-transform duration-200">
          <div className="card-body items-center text-center">
            <img src="/training.jpg" alt="Training" width={80} height={80} />
            <h3 className="card-title text-lg font-bold">Training Management</h3>
            <p>Assign, track, and analyze employee training and upskilling in one place.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats shadow mt-10 max-w-4xl mx-auto mb-14">
        <div className="stat">
          <div className="stat-title">Total Employees Managed</div>
          <div className="stat-value text-primary">1200+</div>
          <div className="stat-desc">Growing Every Day</div>
        </div>
        <div className="stat">
          <div className="stat-title">Leave Requests Processed</div>
          <div className="stat-value text-secondary">35K+</div>
          <div className="stat-desc">Automated Leave Workflow</div>
        </div>
        <div className="stat">
          <div className="stat-title">Training Enrollments</div>
          <div className="stat-value">5K+</div>
          <div className="stat-desc">Upskilling Across Departments</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-purple-100 to-blue-100 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-4xl mx-auto px-3">
          <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 flex flex-col items-center">
            <img src="/avatar1.png" alt="User 1" width={60} height={60} className="rounded-full mb-2" />
            <p className="italic text-gray-700">"NextPhase made leave approvals and employee management effortless. Our HR loves it!"</p>
            <span className="mt-2 font-semibold text-blue-700">— R. Sharma, HR Lead</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 flex flex-col items-center">
            <img src="/avatar2.jpg" alt="User 2" width={60} height={60} className="rounded-full mb-2" />
            <p className="italic text-gray-700">"The training tracking dashboard helped boost our upskilling programs company-wide."</p>
            <span className="mt-2 font-semibold text-purple-700">— Eren, L&D Manager</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 flex flex-col items-center">
            <img src="/avatar3.png" alt="User 3" width={60} height={60} className="rounded-full mb-2" />
            <p className="italic text-gray-700">"Best investment for our growing team. Employees are more engaged than ever."</p>
            <span className="mt-2 font-semibold text-pink-700">— Yeagar, CEO</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center my-16">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your employee experience?</h2>
        <button className={animatedPrimary}>
          <Link href="/signup" className="block w-full h-full">Sign Up for Free</Link>
        </button>
      </section>

      {/* Footer */}
      <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className={animatedFooter}>About us</a>
          <a className={animatedFooter}>Contact</a>
          <a className={animatedFooter}>Jobs</a>
          <a className={animatedFooter}>Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Nextphase Company LTD</p>
        </aside>
      </footer>
      <style>{`
        /* Animate all <a> and <button> in hero/cta/navbar */
        a, button {
          transition: all 0.3s cubic-bezier(.4,0,.2,1);
        }
        a:active, button:active {
          transform: scale(0.97);
        }
        button > a {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}