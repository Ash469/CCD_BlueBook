import React, { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Building, Search } from "lucide-react";
import axios from 'axios';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/experiences`);
        setExperiences(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experiences');
        setLoading(false);
        console.error('Error fetching experiences:', err);
      }
    };

    fetchExperiences();
  }, [backendUrl]);

  // Calculate company counts and roles
  const companyStats = useMemo(() => {
    return experiences.reduce((acc, person) => {
      if (!acc[person.company]) {
        acc[person.company] = {
          name: person.company,
          count: 0,
          roles: new Set(),
        };
      }
      acc[person.company].count += 1;
      if (person.role) {
        acc[person.company].roles.add(person.role);
      }
      return acc;
    }, {});
  }, [experiences]);

  // Convert to array and filter based on search
  const filteredCompanies = useMemo(() => {
    const companiesArray = Object.values(companyStats);
    
    if (!searchTerm) return companiesArray;
    
    return companiesArray.filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companyStats, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1D1E20]">
      {/* Main content section */}
      <div className="flex-grow flex justify-center p-6">
        <div className="w-full max-w-6xl space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-center flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <Building className="h-7 w-7" /> Companies
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Select a company to see interview experiences
            </p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                className="w-full bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-700 dark:text-gray-300"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {filteredCompanies.map((company) => (
                <Link
                  key={company.name}
                  to={`/companies/${encodeURIComponent(company.name)}`}
                  className="flex flex-col bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 p-5 rounded-lg shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 h-full"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-md">
                      <Building className="h-5 w-5" />
                    </div>
                    <div className="font-medium text-lg text-gray-700 dark:text-gray-300">{company.name}</div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p>
                      <span className="font-medium">{company.count}</span> experience{company.count !== 1 ? 's' : ''} shared
                    </p>
                    {company.roles && company.roles.size > 0 && (
                      <p>
                        <span className="font-medium">{company.roles.size}</span> different role{company.roles.size !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {!loading && !error && filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                No companies found matching "{searchTerm}"
              </h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Companies;
