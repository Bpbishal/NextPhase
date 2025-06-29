'use client'
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Training {
  id: number;
  name: string;
  department: string;
  totalSeats: number;
  availableSeats: number;
  startDate: string;
  endDate: string;
}

const PAGE_SIZE = 8;

export default function AvailableTrainingPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sortKey, setSortKey] = useState<'name'|'department'|'totalSeats'|'availableSeats'|'startDate'|'endDate'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const router = useRouter();

  const fetchTrainings = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    axios.get('http://localhost:3100/training', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTrainings(res.data))
    .catch(() => {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      router.push('/login');
    });
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleEnroll = async (trainingId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      await axios.post('http://localhost:3100/training/enroll', 
        { trainingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Enrolled successfully!');
      fetchTrainings();  // Refresh table to update seats
    } catch {
      toast.error('Enrollment failed.');
    }
  };

  const handleBack = () => router.push('/dashboard/training');

  // Get a list of unique departments for the filter dropdown
  const departments = useMemo(
    () => Array.from(new Set(trainings.map(t => t.department).filter(Boolean))),
    [trainings]
  );

  // Client-side filtering, searching, and sorting
  const filteredSorted = useMemo(() => {
    let arr = [...trainings];
    if (search.trim())
      arr = arr.filter(
        t =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.department.toLowerCase().includes(search.toLowerCase())
      );
    if (departmentFilter)
      arr = arr.filter(t => t.department === departmentFilter);
    arr.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return arr;
  }, [trainings, search, departmentFilter, sortKey, sortAsc]);

  // Pagination
  const pageCount = Math.ceil(filteredSorted.length / PAGE_SIZE);
  const paged = useMemo(
    () => filteredSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredSorted, page]
  );

  const formatDate = (date: string) => date.split('T')[0];

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc(a => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

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
          Available Trainings
        </motion.h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name or department"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 py-10"
          >
            <img src="/empty.svg" alt="No data" className="mx-auto w-32 h-32 mb-3 opacity-70" />
            <div>No trainings found.</div>
          </motion.div>
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
                  <th
                    className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortKey === 'name' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th
                    className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('department')}
                  >
                    Department {sortKey === 'department' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th
                    className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('totalSeats')}
                  >
                    Total Seats
                  </th>
                  <th
                    className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('availableSeats')}
                  >
                    Available {sortKey === 'availableSeats' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th
                    className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('startDate')}
                  >
                    Start {sortKey === 'startDate' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th
                    className="py-3 px-3 text-left font-semibold cursor-pointer select-none"
                    onClick={() => handleSort('endDate')}
                  >
                    End {sortKey === 'endDate' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="py-3 px-3 text-left font-semibold rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paged.map((t, i) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.13 + i * 0.045, duration: 0.5 }}
                      className={`hover:bg-blue-100/70 transition-colors ${i % 2 === 0 ? 'bg-purple-50/60' : 'bg-white/70'}`}
                    >
                      <td className="py-2 px-3">{t.id}</td>
                      <td className="py-2 px-3">{t.name}</td>
                      <td className="py-2 px-3">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                          {t.department}
                        </span>
                      </td>
                      <td className="py-2 px-3">{t.totalSeats}</td>
                      <td className={`py-2 px-3 font-bold ${t.availableSeats === 0 ? 'text-red-500' : 'text-green-600'}`}>{t.availableSeats}</td>
                      <td className="py-2 px-3">{formatDate(t.startDate)}</td>
                      <td className="py-2 px-3">{formatDate(t.endDate)}</td>
                      <td className="py-2 px-3">
                        <motion.button 
                          whileHover={{ scale: t.availableSeats === 0 ? 1 : 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-sm btn-primary transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleEnroll(t.id)}
                          disabled={t.availableSeats === 0}
                        >
                          Enroll
                        </motion.button>
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
            className="btn btn-outline font-semibold px-10 transition-all"
          >
            Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}