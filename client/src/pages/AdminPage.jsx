import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

const handleReview = async (id, approve) => {
    try {
      await axios.post(`${backendUrl}/experiences/review/${id}`, {
        approve,
      });
    } catch (err) {
      console.error(err);
    }
  };
const AdminPage = () => {

    const [unreviewedExperiences, setUnreviewedExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUnreviewed = async () => {
            try {
              const res = await axios.get(`${backendUrl}/experiences/unreviewed-experiences`);
              const data = res.data;
              setUnreviewedExperiences(data);
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
      
          fetchUnreviewed();
    },[]);  

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
        <div className="flex-grow flex flex-col items-center justify-start px-4 md:px-8 py-12 space-y-8">

            {/* Header */}
            <section className="w-full max-w-6xl text-center p-8 sm:p-10 md:p-12 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white rounded-xl shadow-lg">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Admin Portal</h1>
            <p className="text-lg opacity-90">Review and manage submitted experiences.</p>
            </section>

            {/* List of unreviewed experiences */}
            <section className="w-full max-w-6xl">
                <h2 className="text-2xl font-semibold mb-6">Unreviewed Experiences</h2>

                {loading ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
                ) : unreviewedExperiences.count === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        All experiences have been reviewed!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(unreviewedExperiences.data).map((exp) => (
                        <div
                        key={exp.id}
                        className="bg-gray-50 dark:bg-[#2E2E33] border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col justify-between"
                        >
                        <div>
                            <Link
                            to={`/experiences/unreviewed-experiences/${exp._id}`}
                            className="text-xl font-semibold text-blue-900 dark:text-blue-400 hover:underline line-clamp-1"
                            >
                            {exp.name}
                            </Link>
                            <div className="flex flex-wrap gap-2 mt-2 mb-4">
                            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-medium">
                                {exp.company}
                            </span>
                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full font-medium">
                                {exp.role}
                            </span>
                            </div>
                            <p className="text-sm line-clamp-3 text-gray-600 dark:text-gray-400">{exp.experience}</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={()=>handleReview(exp._id, true)} className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                            Approve
                            </button>
                            <button onClick={()=>handleReview(exp._id, false)} className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                            Reject
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
            </section>
        </div>

        <Footer />
        </div>
    );
};

export default AdminPage;
