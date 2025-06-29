'use client'
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_SIZE = 10;

export default function ColleagueListPage() {
  const [colleagues, setColleagues] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<'name'|'email'|'department'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Session expired. Please login again.');
      router.push('/login');
      return;
    }
    axios.get('http://localhost:3100/employee/colleagues', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const data = res.data;
      if (Array.isArray(data)) setColleagues(data);
      else setColleagues(data.colleagues || []);
    })
    .catch(() => {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    });
  }, [router]);
  const departments = useMemo(() => {
    return Array.from(new Set(colleagues.map(c => c.department).filter(Boolean)));
  }, [colleagues]);
  const filteredSorted = useMemo(() => {
    let arr = [...colleagues];
    if (search.trim()) {
      arr = arr.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (departmentFilter) {
      arr = arr.filter(c => c.department === departmentFilter);
    }
    arr.sort((a, b) => {
      const valA = (a[sortKey] ?? '').toLowerCase();
      const valB = (b[sortKey] ?? '').toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return arr;
  }, [colleagues, search, departmentFilter, sortKey, sortAsc]);

  // Pagination
  const pageCount = Math.ceil(filteredSorted.length / PAGE_SIZE);
  const paged = useMemo(
    () => filteredSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredSorted, page]
  );

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc(a => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success('Email copied!');
  };

  const handleBack = () => router.push('/dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 py-10 flex items-center">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl mx-auto space-y-8"
      >
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-br from-blue-50 via-purple-100 to-blue-100 shadow-2xl p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl font-bold mb-6 text-center text-blue-700"
          >
            Colleagues List
          </motion.h1>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search name or email"
              className="input input-bordered w-full md:w-1/3"
              value={search}
              onChange={e => { setPage(1); setSearch(e.target.value); }}
            />
            <select
              className="select select-bordered w-full md:w-1/4"
              value={departmentFilter}
              onChange={e => { setPage(1); setDepartmentFilter(e.target.value); }}
            >
              <option value="">All Departments</option>
              {departments.map(dep => (
                <option value={dep} key={dep}>{dep}</option>
              ))}
            </select>
            <button
              className="btn btn-outline md:ml-auto"
              onClick={() => { setSearch(''); setDepartmentFilter(''); setPage(1); }}
              disabled={!search && !departmentFilter}
            >
              Clear Filters
            </button>
          </div>

          {filteredSorted.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center"
            >
              No colleagues found.
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
                    <th className="py-3 px-3 text-left font-semibold">Profile</th>
                    <th
                      className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                      onClick={() => handleSort('name')}
                    >
                      Name {sortKey === 'name' && (sortAsc ? '▲' : '▼')}
                    </th>
                    <th
                      className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortKey === 'email' && (sortAsc ? '▲' : '▼')}
                    </th>
                    <th
                      className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                      onClick={() => handleSort('department')}
                    >
                      Department {sortKey === 'department' && (sortAsc ? '▲' : '▼')}
                    </th>
                    <th className="py-3 px-3 text-left font-semibold">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paged.map((colleague, index) => (
                      <motion.tr
                        key={colleague.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.13 + index * 0.05, duration: 0.5 }}
                        className={`hover:bg-blue-100/70 transition-colors ${index % 2 === 0 ? 'bg-purple-50/60' : 'bg-white/70'}`}
                      >
                        <td className="py-2 px-3 font-semibold text-blue-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                        <td className="py-2 px-3">
                          {colleague.photoUrl
                            ? <img src={colleague.photoUrl} alt={colleague.name} className="w-10 h-10 rounded-full object-cover border border-blue-300" />
                            : <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-xl font-bold text-blue-700">{colleague.name ? colleague.name[0].toUpperCase() : '?'}</div>
                          }
                        </td>
                        <td className="py-2 px-3">{colleague.name}</td>
                        <td className="py-2 px-3">
                          {colleague.email}
                        </td>
                        <td className="py-2 px-3">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                            {colleague.department}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => handleCopyEmail(colleague.email)}
                            title="Copy email to clipboard"
                          >
                            Copy
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </motion.table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >Prev</button>
            <span className="px-2">Page {page} of {pageCount || 1}</span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setPage(page + 1)}
              disabled={page >= pageCount}
            >Next</button>
          </div>

          <div className="flex justify-center mt-8">
            <motion.button 
              onClick={handleBack} 
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgb(59 130 246 / 0.20)" }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-outline transition-all font-semibold px-8"
            >
              Back to Dashboard
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}