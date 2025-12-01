import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Tractor } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect to toggle background style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-slate-900 shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="bg-emerald-600 p-2 rounded-lg mr-2 group-hover:bg-emerald-500 transition-colors">
              <Tractor className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-100 transition-colors">
              VitalHeard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-8 items-center mr-8">
              <li>
                <Link 
                  to="/" 
                  className="text-sm font-medium text-slate-100 hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium text-slate-100 hover:text-emerald-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/gis" 
                  className="text-sm font-medium text-slate-100 hover:text-emerald-400 transition-colors"
                >
                  GIS
                </Link>
              </li>
              <li>
                <Link 
                  to="/reporting" 
                  className="text-sm font-medium text-slate-100 hover:text-emerald-400 transition-colors"
                >
                  Reporting Portal
                </Link>
              </li>
            </ul>
            
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm shadow-lg shadow-emerald-900/20">
              Get Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 absolute top-full left-0 w-full shadow-lg border-t border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              to="/"
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/gis" 
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              GIS
            </Link>
            <Link
              to="/reporting" 
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Reporting Portal
            </Link>
            
            <div className="pt-4">
              <button className="w-full bg-emerald-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-emerald-500 transition-colors">
                Get Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;