import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { ChevronLeft, FileEdit, Send } from "lucide-react";
import axios from 'axios';

const SubmitExperiencePage = () => {
  const [formData, setFormData] = useState({
    name: '',             // Changed from studentName to match MongoDB model
    branch: '',
    cpi: '',
    company: '',
    role: '',
    yearOfIntern: new Date().getFullYear(),
    interviewMode: '',
    interviewDifficulty: '',
    questionsAsked: '',
    experience: '',
    tips: '',
    linkedinProfile: '',
    emailId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Format the data to match your Experience model schema
      const payload = {
        ...formData,
        cpi: parseFloat(formData.cpi),             // Convert to number
        yearOfPlacement: parseInt(formData.yearOfIntern)  // Convert to number
      };
      
      const response = await axios.post(`${backendUrl}/experiences`, payload);
      
      console.log('Experience submitted successfully:', response.data);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',             // Changed from studentName to match MongoDB model
        branch: '',
        cpi: '',
        company: '',
        role: '',
        yearOfIntern: new Date().getFullYear(),
        interviewMode: '',
        interviewDifficulty: '',
        questionsAsked: '',
        experience: '',
        tips: '',
        linkedinProfile: '',
        emailId: '',
      });
    } catch (error) {
      console.error('Error submitting experience:', error);
      
      // Extract error message from response if available
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Failed to submit experience. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300">
      <div className="flex-grow max-w-6xl mx-auto w-full space-y-8 p-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 text-white rounded-lg">
            <FileEdit className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Share Your Experience</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Help other students by sharing details about your placement or internship experience
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Experience Details</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Please provide all relevant information about your interview experience
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="emailId" className="block mb-1 font-medium">Email Address</label>
                  <input
                    id="emailId"
                    name="emailId"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="branch" className="block mb-1 font-medium">Branch *</label>
                  <select
                    id="branch"
                    name="branch"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="DSAI">DSAI</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Chemical Science and Technology">Chemical Science and Technology</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Bioscience">BioScience</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="cpi" className="block mb-1 font-medium">CPI *</label>
                  <input
                    id="cpi"
                    name="cpi"
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.cpi}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="linkedinProfile" className="block mb-1 font-medium">LinkedIn Profile</label>
                  <input
                    id="linkedinProfile"
                    name="linkedinProfile"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
            
            {/* Placement Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Internship Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block mb-1 font-medium">Company Name *</label>
                  <input
                    id="company"
                    name="company"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block mb-1 font-medium">Job Role *</label>
                  <input
                    id="role"
                    name="role"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="yearOfIntern" className="block mb-1 font-medium">Year of Intern *</label>
                  <input
                    id="yearOfIntern"
                    name="yearOfIntern"
                    type="number"
                    min="2000"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.yearOfIntern}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="interviewMode" className="block mb-1 font-medium">Interview Mode *</label>
                  <select
                    id="interviewMode"
                    name="interviewMode"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.interviewMode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="interviewDifficulty" className="block mb-1 font-medium">Interview Difficulty *</label>
                  <select
                    id="interviewDifficulty"
                    name="interviewDifficulty"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                    value={formData.interviewDifficulty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very Hard</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Experience Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Experience Details</h3>
              
              <div>
                <label htmlFor="questionsAsked" className="block mb-1 font-medium">Questions Asked *</label>
                <textarea
                  id="questionsAsked"
                  name="questionsAsked"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                  value={formData.questionsAsked}
                  onChange={handleInputChange}
                  placeholder="List the key questions that were asked during your interview"
                  rows={3}
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="experience" className="block mb-1 font-medium">Detailed Experience *</label>
                <textarea
                  id="experience"
                  name="experience"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Share your complete interview experience, including rounds, process, etc."
                  rows={5}
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="tips" className="block mb-1 font-medium">Tips for Others</label>
                <textarea
                  id="tips"
                  name="tips"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2E30] rounded-md"
                  value={formData.tips}
                  onChange={handleInputChange}
                  placeholder="Share any tips or advice for other students"
                  rows={3}
                ></textarea>
              </div>
            </div>

            {submitError && (
              <div className="p-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">
                <p>{submitError}</p>
              </div>
            )}
            
            {submitSuccess && (
              <div className="p-4 text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                <p>Experience submitted successfully! Thank you for sharing your experience.</p>
              </div>
            )}
            
            <div className="pt-4">
              <button 
                type="submit" 
                className={`w-full text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-300 ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Experience</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitExperiencePage;