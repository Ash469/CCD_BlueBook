import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import axios from 'axios'; 


const Home = () => {
  // State for experiences data
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const startIndex = (currentPage-1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = experiences && experiences.length > 0 ? experiences.slice(startIndex, endIndex) : [];
  const totalPages = Math.ceil((experiences?.length || 0) / itemsPerPage);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        // Adjust the URL to your API endpoint
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

  const uniqueCompanies = experiences && experiences.length > 0 
    ? [...new Set(experiences.map(item => item.company))]
    : [];
    
  const uniqueRoles = experiences && experiences.length > 0
    ? [...new Set(experiences.map(item => item.role).filter(Boolean))]
    : [];
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 space-y-12">
        
        <section className="w-full max-w-6xl text-center p-8 sm:p-10 md:p-12 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white rounded-xl shadow-lg">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Bluebook-IITG</h1>
          <p className="text-lg sm:text-xl max-w-4xl mx-auto mb-10 opacity-90">
            Welcome to the Bluebook of IITG, created by Team CCD! Bluebook is designed to compile internship interview experiences to help you better prepare for your internship interviews and assessments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/submit">
              <button className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto">
                Share Your Experience
              </button>
            </Link>
            <Link to="/profiles">
              <button className="border-2 border-white text-white hover:bg-blue-800 px-6 py-3 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto">
                Browse Experiences
              </button>
            </Link>
          </div>
        </section>

        
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <StatCard 
            icon="🏢" 
            title="Companies" 
            value={loading ? "..." : uniqueCompanies.length} 
            linkTo="/companies"
          />
          <StatCard 
            icon="👨‍💻" 
            title="Roles" 
            value={loading ? "..." : uniqueRoles.length} 
            linkTo="/roles"
          />
          <StatCard 
            icon="👥" 
            title="Experiences" 
            value={loading ? "..." : experiences.length} 
            linkTo="/search"
          />
        </section>
        
        
        <section className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              📖 Recent Experiences
            </h3>
            <Link to="/profiles">
              <button className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                View All
              </button>
            </Link>
          </div>
          
       
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
         
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {displayedData.length > 0 ? displayedData.map((person) => (
                <div key={person._id} className="rounded-xl shadow-md bg-gray-50 dark:bg-[#2E2E33] hover:shadow-lg transition-all h-full flex flex-col border border-gray-200 dark:border-gray-800">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <Link to={`/experience/${person._id}`} className="text-xl font-semibold hover:underline line-clamp-1 text-blue-900 dark:text-blue-400">
                        {person.name}
                      </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-medium">
                        {person.company}
                      </span>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full font-medium">
                        {person.role}
                      </span>
                    </div>
                    <p className="text-sm flex-grow line-clamp-3 text-gray-600 dark:text-gray-400 mb-4">
                      {person.experience}
                    </p>
                  </div>
                </div> 
              )) : (
                <div className="col-span-3 text-center py-10 text-gray-500">
                  No experiences found. Be the first to share your experience!
                </div>
              )}
            </div>
          )}
          
          
          {!loading && !error && experiences.length > 0 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-5 text-sm py-2 rounded-lg flex items-center ${currentPage === 1 ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" : "dark:bg-blue-800 bg-blue-700 text-white dark:text-gray-100 hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"}`}
              >
                <span className="mr-1">←</span> Previous
              </button>

              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-full text-gray-700 dark:text-gray-300">
                <span className="text-sm font-medium">
                  {currentPage} of {totalPages}
                </span>
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-5 text-sm py-2 rounded-lg flex items-center ${currentPage === totalPages ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" : "dark:bg-blue-800 bg-blue-700 text-white dark:text-gray-100 hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"}`}
              >
                Next <span className="ml-1">→</span>
              </button>
            </div>
          )}
        </section>

        
        <section className="w-full max-w-6xl bg-gray-50 dark:bg-[#292A2D] py-12 px-8 rounded-xl shadow-sm">
          <h2 className="text-3xl font-bold text-center mb-10">How Bluebook Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              step="1"
              title="Share Your Experience"
              description="Fill out our comprehensive form about your placement or internship experience."
            />
            <FeatureCard
              step="2"
              title="Browse Experiences"
              description="Search and filter experiences by company, role, and more."
            />
            <FeatureCard
              step="3"
              title="Prepare Better"
              description="Learn from others' journeys to better prepare for your own interviews."
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};


const StatCard = ({ icon, title, value, linkTo }) => (
  <Link to={linkTo} className="block">
    <div className="p-6 bg-gray-50 dark:bg-[#2E2E33] rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-2xl shadow-sm">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  </Link>
);


const FeatureCard = ({ step, title, description }) => (
  <div className="text-center space-y-3 p-6 bg-white dark:bg-[#262629] rounded-lg shadow-sm">
    <div className="h-12 w-12 bg-blue-700 dark:bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-md">
      {step}
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default Home;
