import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExperienceCard from '../components/ExperienceCard';
import FilterPanel from '../components/FilterPanel';
import { Search } from 'lucide-react';

// Helper function to extract unique values for filter dropdowns
const getUniqueValues = (data, key) => {
  return [...new Set(data.filter(item => item[key]).map(item => item[key]))];
};

const ProfilePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [interviewModes, setInterviewModes] = useState([]);
  const [interviewDifficulties, setInterviewDifficulties] = useState([]);
  const [years, setYears] = useState([]);
  
  const [filters, setFilters] = useState({
    company: 'All',
    role: 'All',
    branch: 'All',
    cpiRange: [6.0, 10.0],
    yearOfIntern: 'All',
    interviewDifficulty: 'All',
    interviewMode: 'All',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  // Fetch all experiences from the backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/experiences`);
        
        // Get valid entries that have complete data
        const validData = response.data.data.filter(experience => 
          experience._id && experience.name && experience.company && experience.role
        );
        
        setExperiences(validData);
        
        // Extract filter options from fetched data
        setCompanies(getUniqueValues(validData, 'company'));
        setRoles(getUniqueValues(validData, 'role'));
        setBranches(getUniqueValues(validData, 'branch'));
        setInterviewModes(getUniqueValues(validData, 'interviewMode'));
        setInterviewDifficulties(getUniqueValues(validData, 'interviewDifficulty'));
        setYears(getUniqueValues(validData, 'yearOfIntern'));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experiences');
        setLoading(false);
        console.error('Error fetching experiences:', err);
      }
    };

    fetchExperiences();
  }, [backendUrl]);

  // Apply filters when filters or experiences change
  useEffect(() => {
    if (experiences.length === 0) return;
    
    setLoading(true);
    
    // Add a small delay to improve UX when filtering
    const filterTimer = setTimeout(() => {
      let filtered = [...experiences];
      
      // Apply search term filter
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter(exp => 
          exp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.role?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply all filters
      if (filters.company !== 'All') {
        filtered = filtered.filter(exp => exp.company === filters.company);
      }
      
      if (filters.role !== 'All') {
        filtered = filtered.filter(exp => exp.role === filters.role);
      }
      
      if (filters.branch !== 'All') {
        filtered = filtered.filter(exp => exp.branch === filters.branch);
      }
      
      filtered = filtered.filter(exp => {
        const cpi = parseFloat(exp.cpi || 0);
        return cpi >= filters.cpiRange[0] && cpi <= filters.cpiRange[1];
      });
      
      if (filters.yearOfIntern !== 'All') {
        filtered = filtered.filter(exp => String(exp.yearOfIntern) === String(filters.yearOfIntern));
      }
      
      if (filters.interviewDifficulty !== 'All') {
        filtered = filtered.filter(exp => exp.interviewDifficulty === filters.interviewDifficulty);
      }
      
      if (filters.interviewMode !== 'All') {
        filtered = filtered.filter(exp => exp.interviewMode === filters.interviewMode);
      }
      
      setFilteredExperiences(filtered);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(filterTimer);
  }, [filters, searchTerm, experiences]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Interview Experiences</h1>
          
          {/* Search bar */}
          <div className="relative mt-4 md:mt-0 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              className="w-full bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-700 dark:text-gray-300"
              placeholder="Search by name, company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar with filters */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start">
            <FilterPanel 
              companies={companies}
              roles={roles}
              branches={branches}
              interviewModes={interviewModes}
              interviewDifficulties={interviewDifficulties}
              years={years}
              filters={filters}
              onFilterChange={setFilters}
            />
            
            {/* Results counter */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg mt-4 p-4">
              <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Results</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredExperiences.length} of {experiences.length} experiences
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                CPI Range: {filters.cpiRange[0].toFixed(1)} - {filters.cpiRange[1].toFixed(1)}
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Search: "{searchTerm}"
                </div>
              )}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard 
                    key={experience._id} 
                    experience={{
                      ...experience,
                      id: experience._id // Ensure compatibility with ExperienceCard component
                    }} 
                    isCompact={true} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">No experiences found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your filters or search term to see more results.
                </p>
                <button 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-md transition-colors"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      company: 'All',
                      role: 'All',
                      branch: 'All',
                      cpiRange: [6.0, 10.0],
                      yearOfPlacement: 'All',
                      interviewDifficulty: 'All',
                      interviewMode: 'All',
                    });
                  }}
                >
                  Reset All
                </button>
              </div>
            )}

            {filteredExperiences.length > 8 && (
              <div className="mt-6 text-center">
                <button className="px-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;