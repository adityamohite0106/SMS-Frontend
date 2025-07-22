import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
            <Link to="/" className="text-xl font-bold text-gray-800">
              Student Management System
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/students"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/students') || isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              All Students
            </Link>
            
            <Link
              to="/students/add"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/students/add')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Student</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
