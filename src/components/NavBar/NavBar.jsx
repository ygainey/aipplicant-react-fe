import React from 'react';

const NavBar = ({ onSignInClick, onSignUpClick }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/api/placeholder/32/32" alt="Logo" />
            </div>
            
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button onClick={onSignInClick} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign In</button>
            <button onClick={onSignUpClick} className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;