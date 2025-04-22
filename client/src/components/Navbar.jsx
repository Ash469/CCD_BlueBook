import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { sunnyOutline, moonOutline, menuOutline, closeOutline } from 'ionicons/icons';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Function to determine if link is active
    const isActive = (path) => location.pathname === path;
    
    // Toggle menu function
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    return (
        <nav className="bg-blue-800 dark:bg-gray-900 text-white shadow-md transition-all duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-2">
                        <img 
                            src="iitg_logo.png" 
                            alt="IITG Logo" 
                            className="h-8 w-8"
                        />
                        <Link to="/" className="text-xl font-bold">Bluebook</Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1">
                        <NavLink to="/" active={isActive('/')}>Home</NavLink>
                        <NavLink to="/companies" active={isActive('/companies')}>Companies</NavLink>
                        <NavLink to="/roles" active={isActive('/roles')}>Roles</NavLink>
                        <NavLink to="/profiles" active={isActive('/profiles')}>Profiles</NavLink>
                        <NavLink to="/team" active={isActive('/team')}>Our Team</NavLink>
                        <NavLink to="/submit" active={isActive('/submit')}>
                            <button className="bg-white text-blue-800 dark:bg-blue-200 dark:text-gray-900 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-300 transition-colors">
                                Submit Experience
                            </button>
                        </NavLink>
                        <button 
                            onClick={toggleDarkMode}
                            className="ml-2 p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-800 transition-all duration-200"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <IonIcon 
                                className="text-[18px] text-white" 
                                icon={darkMode ? sunnyOutline : moonOutline}
                            />
                        </button>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className="p-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <IonIcon 
                                className="h-6 w-6 text-white" 
                                icon={isMenuOpen ? closeOutline : menuOutline} 
                            />
                        </button>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-3 px-2 border-t border-blue-700 dark:border-gray-800">
                        <div className="flex flex-col space-y-2">
                            <MobileNavLink to="/" active={isActive('/')}>Home</MobileNavLink>
                            <MobileNavLink to="/companies" active={isActive('/companies')}>Companies</MobileNavLink>
                            <MobileNavLink to="/profiles" active={isActive('/profiles')}>Profiles</MobileNavLink>
                            <MobileNavLink to="/team" active={isActive('/team')}>Our Team</MobileNavLink>
                            <MobileNavLink to="/search" active={isActive('/search')}>Search</MobileNavLink>
                            <MobileNavLink to="/submit" active={isActive('/submit')}>
                                <span className="flex items-center">
                                    <span className="mr-2">Submit Experience</span>
                                    <span className="bg-white text-blue-800 dark:bg-blue-200 dark:text-gray-900 px-2 py-0.5 text-xs rounded">New</span>
                                </span>
                            </MobileNavLink>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-blue-700 dark:border-gray-800 mt-2">
                                <span className="text-sm">Toggle theme</span>
                                <button 
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-800"
                                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    <IonIcon 
                                        className="text-[18px] text-white" 
                                        icon={darkMode ? sunnyOutline : moonOutline}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// NavLink component for desktop navigation
const NavLink = ({ to, active, children }) => (
    <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            active 
                ? 'bg-blue-700 dark:bg-gray-800 text-white' 
                : 'text-blue-100 dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-gray-800 hover:text-white'
        }`}
    >
        {children}
    </Link>
);

// NavLink component for mobile navigation
const MobileNavLink = ({ to, active, children }) => (
    <Link
        to={to}
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
            active 
                ? 'bg-blue-700 dark:bg-gray-800 text-white' 
                : 'text-blue-100 dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-gray-800 hover:text-white'
        }`}
        onClick={() => window.scrollTo(0, 0)}
    >
        {children}
    </Link>
);

export default Navbar;