'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Profile', href: '/dashboard/profile' },
    { label: 'Update Profile', href: '/dashboard/update-profile' },
    { label: 'Colleagues', href: '/dashboard/colleagues' },
    { label: 'Leave Request', href: '/dashboard/leave-request' },
    { label: 'Leave Balance', href: '/dashboard/leave-balance' },
    { label: 'Leave History', href: '/dashboard/leave-history' },
    { label: 'Training', href: '/dashboard/training' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      router.push('/login');
    }, 800);
  };

  return (
    <div className="drawer min-h-screen">
      <Toaster position="top-center" />
      <input id="my-drawer" type="checkbox" className="drawer-toggle peer hidden" />
      <div className="drawer-content flex flex-col">
        
        {/* Navbar  */}
        <div className="navbar bg-gray-200 shadow px-6 h-20">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button transition-transform hover:scale-110"
            >
              ☰
            </label>

            <img
              src="/nplogo.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover"
            />

            <span className="font-bold text-xl text-gray-800">NextPhase Employee OS</span>
          </div>

          <div className="flex-1"></div>

          <div className="flex-none space-x-3">
            <button
              onClick={() => router.push('/')}
              className="btn btn-outline btn-accent transition hover:scale-105"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="btn btn-outline btn-accent transition hover:scale-105"
            >
              Dashboard
            </button>
            <Link href="/about" className="btn btn-outline btn-info transition hover:scale-105">
              About
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error transition hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>

        {/* Footer */}
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Nextphase Company Ltd</p>
  </aside>
</footer>
      </div>

      {/* Animated Sidebar menu with light cyan background */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        
        <ul className="menu bg-gray-200 min-h-full w-64 p-4 space-y-3 shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Navigation</h2>

          {navItems.map(({ label, href }) => (
            <li key={href} className="group">
              <button
                onClick={() => router.push(href)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-between shadow-sm ${
                  pathname === href
                    ? 'bg-primary text-white font-semibold scale-105'
                    : 'hover:bg-primary/20 hover:scale-105'
                }`}
              >
                {label}
                <span className="transition-opacity opacity-0 group-hover:opacity-100 text-xs text-primary">
                  ➤
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
