import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Building, Briefcase, Calendar, User, BookOpen, Mail, MessageSquare, HelpCircle, ChevronLeft, LightbulbIcon } from 'lucide-react';

const ResponseDetail = () => {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${backendUrl}/experiences/${id}`);
        setResponse(result.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError('Failed to load experience details');
        setLoading(false);
      }
    };
    
    fetchExperience();
  }, [id, backendUrl]);

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

  if (error || !response) {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Response Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {error || "The experience you're looking for doesn't exist or has been removed."}
            </p>
            <Link to="/">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Browse All Experiences
              </button>
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm my-6">
          <div className="p-6">
            <div className="mb-6">
              <Link to="/">
                <button className="flex items-center gap-1 px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  <ChevronLeft className="h-4 w-4" /> Back to Home
                </button>
              </Link>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{response.name}'s Experience</h1>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center">
                    <Building className="h-3 w-3 mr-1" /> {response.company}
                  </span>
                  <span className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded-full flex items-center">
                    <Briefcase className="h-3 w-3 mr-1" /> {response.role}
                  </span>
                  <span className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded-full flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> {response.yearOfIntern}
                  </span>
                  {response.interviewDifficulty && (
                    <span
                      className={`px-3 py-1 text-sm rounded-full flex border items-center
                        ${
                          response.interviewDifficulty === 'Easy'
                          ? 'bg-green-100 text-green-800 border-green-800'
                          : response.interviewDifficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-800'
                          : response.interviewDifficulty === 'Hard'
                          ? 'bg-orange-100 text-orange-800 border-orange-800'
                          : 'bg-red-100 text-red-800 border-red-800'
                        }
                      `}
                    >
                      <HelpCircle className="h-3 w-3 mr-1" /> 
                      {response.interviewDifficulty}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1.5 h-fit bg-gray-50 dark:bg-[#1D1E20] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4"> Profile</h3>
                  <div className="space-y-4">
                    <ProfileItem 
                      icon={<User className="h-5 w-5" />} 
                      label="Name" 
                      value={response.name} 
                    />
                    <ProfileItem 
                      icon={<Building className="h-5 w-5" />} 
                      label="Company" 
                      value={response.company} 
                    />
                    <ProfileItem 
                      icon={<Briefcase className="h-5 w-5" />} 
                      label="Role" 
                      value={response.role} 
                    />
                    <ProfileItem 
                      icon={<BookOpen className="h-5 w-5" />} 
                      label="Branch" 
                      value={response.branch} 
                    />
                    <ProfileItem 
                      icon={<User className="h-5 w-5" />} 
                      label="CPI" 
                      value={response.cpi ? response.cpi.toString() : "N/A"} 
                    />
                    {response.emailId && (
                      <ProfileItem 
                        icon={<Mail className="h-5 w-5" />} 
                        label="Email" 
                        value={
                          <a href={`mailto:${response.emailId}`} className="text-blue-600 hover:underline">
                            {response.emailId}
                          </a>
                        } 
                      />
                    )}
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-6">
                  <div className="bg-white dark:bg-[#1D1E20] border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" /> Experience Details
                    </h3>
                    <p className="whitespace-pre-line">{response.experience}</p>
                  </div>
                  
                  {response.questionsAsked && (
                    <div className="bg-white dark:bg-[#1D1E20] border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" /> Questions Asked
                      </h3>
                      <p className="whitespace-pre-line">{response.questionsAsked}</p>
                    </div>
                  )}
                  
                  {response.tips && (
                    <div className="bg-white dark:bg-[#1D1E20] border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LightbulbIcon className="h-5 w-5" /> Tips for Others
                      </h3>
                      <p className="whitespace-pre-line">{response.tips}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Link to="/profiles">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    Back to Search
                  </button>
                </Link>
                <Link to={`/companies/${encodeURIComponent(response.company)}`}>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    More from {response.company}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-full mr-3">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

export default ResponseDetail;