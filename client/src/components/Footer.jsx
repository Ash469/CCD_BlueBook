import React from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
// import { bookOutline } from 'ionicons/icons';

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 text-white py-4">
      <div className="container mx-auto px-6 md:px-8 lg:px-10">
        {/* <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <IonIcon icon={bookOutline} className="h-8 w-8" />
              <h3 className="text-lg font-bold">Bluebook</h3>
            </div>
            <p className="text-blue-200 dark:text-gray-400 text-sm">
              Your guide to placements and internships
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="text-blue-200 dark:text-gray-400 hover:text-white text-lg transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-blue-200 dark:text-gray-400 hover:text-white text-lg transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-blue-200 dark:text-gray-400 hover:text-white text-lg transition-colors">
              Privacy
            </Link>
          </div>
        </div> */}

        {/* Centered copyright notice */}
        <div className="text-blue-200 dark:text-gray-400 text-sm text-center  border-blue-800 dark:border-gray-800">
        © 2025 Bluebook Developed by Technical Team CCD IITG
        </div>
      </div>
    </footer>
  );
};

export default Footer;