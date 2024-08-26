import React from 'react';
import { Home, UserCircle, Send, X, LogOut } from 'lucide-react';

const AuthNavbar = ({ onFilterChange, onSignOut, userName }) => {
  const filters = ['All', 'Applied', 'Interviewing', 'Rejected'];

  return (
    <div className="bg-gray-900 p-4 h-screen flex flex-col">
      <div className="mb-8 text-center">
        <UserCircle size={64} className="mx-auto text-white" />
        <h2 className="text-white mt-2 font-bold">{userName}</h2>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {/* {filters.map((filter) => (
            <li key={filter}>
              <button
                onClick={() => onFilterChange(filter)}
                className="w-full text-left py-2 px-4 rounded text-gray-400 hover:bg-gray-800"
              >
                {filter === 'All' && <Home size={20} className="inline-block mr-2" />}
                {filter === 'Applied' && <Send size={20} className="inline-block mr-2" />}
                {filter === 'Interviewing' && <UserCircle size={20} className="inline-block mr-2" />}
                {filter === 'Rejected' && <X size={20} className="inline-block mr-2" />}
                {filter}
              </button>
            </li>
          ))} */}
        </ul>
      </nav>
      <button onClick={onSignOut} className="text-gray-400 flex items-center mt-8">
        <LogOut size={20} className="mr-2" /> Sign Out
      </button>
    </div>
  );
};

export default AuthNavbar;