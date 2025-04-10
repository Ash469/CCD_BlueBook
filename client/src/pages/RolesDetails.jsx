import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { Briefcase, ChevronLeft, Building, ArrowRight } from "lucide-react";

const RolesDetails = () => {
  const { roleName } = useParams();
  const decodedRoleName = roleName ? decodeURIComponent(roleName) : '';
  
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  // Fetch experiences from the backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/experiences`);
        
        // Filter experiences by role
        const roleExperiences = response.data.data.filter(
          (experience) => experience.role === decodedRoleName
        );
        
        setExperiences(roleExperiences);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [backendUrl, decodedRoleName]);

  // Group experiences by company
  const experiencesByCompany = useMemo(() => {
    const grouped = experiences.reduce((acc, review) => {
      const company = review.company || "Not Specified";
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(review);
      return acc;
    }, {});
    
    return Object.entries(grouped);
  }, [experiences]);

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
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300 p-6">
        <div className="text-center py-12 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {error}
          </p>
          <Link to="/roles">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Back to Roles
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
          <h2 className="text-2xl font-bold mb-2">Role Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            No experiences found for "{decodedRoleName}" role.
          </p>
          <Link to="/roles">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Browse All Roles
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
          <Link to="/roles" className="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            <ChevronLeft className="h-4 w-4" /> Back to Roles
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 text-white rounded-lg">
            <Briefcase className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{decodedRoleName}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {experiences.length} experience{experiences.length !== 1 ? 's' : ''} shared across {experiencesByCompany.length} compan{experiencesByCompany.length !== 1 ? 'ies' : 'y'}
            </p>
          </div>
        </div>
        
        {experiencesByCompany.map(([company, companyExperiences]) => (
          <div key={company} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building className="h-5 w-5" /> {company}
              <span className="text-gray-500 dark:text-gray-400 font-normal text-base">
                ({companyExperiences.length} experience{companyExperiences.length !== 1 ? 's' : ''})
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyExperiences.map(review => (
                <Link 
                  key={review._id} 
                  to={`/experience/${review._id}`}
                  className="bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
                >
                  <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{review.company || "No company specified"}</p>
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

export default RolesDetails;

