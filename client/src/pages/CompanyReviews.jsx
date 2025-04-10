import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Building, Briefcase, ChevronLeft, ArrowRight } from "lucide-react";
import axios from "axios";

const CompanyReviews = () => {
  const { companyName } = useParams();
  const decodedCompanyName = companyName ? decodeURIComponent(companyName) : '';
  
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/experiences`);
        
        // Filter experiences by company name
        const companyExperiences = response.data.data.filter(
          (experience) => experience.company === decodedCompanyName
        );
        
        setExperiences(companyExperiences);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experiences');
        setLoading(false);
        console.error('Error fetching experiences:', err);
      }
    };

    fetchExperiences();
  }, [backendUrl, decodedCompanyName]);

  // Group experiences by role
  const experiencesByRole = useMemo(() => {
    const grouped = experiences.reduce((acc, review) => {
      const role = review.role || "Not Specified";
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(review);
      return acc;
    }, {});
    
    return Object.entries(grouped);
  }, [experiences]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300 p-6">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300 p-6">
        <div className="text-center py-12 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {error}
          </p>
          <Link to="/companies">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Back to Companies
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300 p-6">
        <div className="text-center py-12 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2">Company Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            No experiences found for "{decodedCompanyName}".
          </p>
          <Link to="/companies">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Browse All Companies
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
      <div className="flex-grow max-w-6xl mx-auto w-full space-y-8 p-6">
        <div className="mb-6">
          <Link to="/companies" className="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            <ChevronLeft className="h-4 w-4" /> Back to Companies
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 text-white rounded-lg">
            <Building className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{decodedCompanyName}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {experiences.length} experience{experiences.length !== 1 ? 's' : ''} shared across {experiencesByRole.length} role{experiencesByRole.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {experiencesByRole.map(([role, roleExperiences]) => (
          <div key={role} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> {role}
              <span className="text-gray-500 dark:text-gray-400 font-normal text-base">
                ({roleExperiences.length} experience{roleExperiences.length !== 1 ? 's' : ''})
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roleExperiences.map(review => (
                <Link 
                  key={review._id} 
                  to={`/experience/${review._id}`}
                  className="bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
                >
                  <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{review.role || "No role specified"}</p>
                  <p className="text-gray-800 dark:text-gray-200 mb-3 line-clamp-3">{review.experience}</p>
                  
                  <div className="text-blue-600 dark:text-blue-400 text-sm hover:underline self-end mt-auto inline-flex items-center group">
                    View details <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyReviews;
