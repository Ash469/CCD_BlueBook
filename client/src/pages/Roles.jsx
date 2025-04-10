import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { Briefcase, Search } from "lucide-react";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/experiences`);
        
        // Filter out any invalid entries
        const validData = response.data.data.filter(experience => 
          experience._id && experience.name && experience.company && experience.role
        );
        
        setExperiences(validData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [backendUrl]);

  // Calculate role counts from experiences data
  const roleCounts = useMemo(() => {
    return experiences.reduce((acc, person) => {
      if (person.role) {
        acc[person.role] = (acc[person.role] || 0) + 1;
      }
      return acc;
    }, {});
  }, [experiences]);

  const roles = useMemo(() => Object.keys(roleCounts), [roleCounts]);
  
  // Filter roles based on search term
  const filteredRoles = useMemo(() => {
    if (!searchTerm) return roles;
    
    return roles.filter(role => 
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
      <div className="flex-grow max-w-6xl mx-auto w-full space-y-8 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="h-7 w-7" /> Job Roles
          </h1>
        </div>
        
        <div className="max-w-md mb-6 relative">
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2D2E30] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role, index) => (
            <Link
              key={index}
              to={`/role/${encodeURIComponent(role)}`}
              className="transition-all hover:scale-[1.02]"
            >
              <div className="h-full rounded-lg border-2 border-transparent hover:border-blue-200 bg-white dark:bg-[#2D2E30] shadow hover:shadow-md transition-all p-4">
                <div className="pb-2">
                  <h3 className="text-xl font-bold">{role}</h3>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{roleCounts[role]}</span> experience{roleCounts[role] !== 1 ? 's' : ''} shared
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">No roles found matching "{searchTerm}"</h3>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Roles;
