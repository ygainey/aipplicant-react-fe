import { useState } from 'react'
import { UserCircle, LogOut, ChevronDown } from 'lucide-react'
import PopoutForm from '../PopoutForm/PopoutForm'
import ViewProfile from '../ViewProfile/ViewProfile'
import EditProfile from '../EditProfile/EditProfile'

const AuthNavbar = ({ onFilterChange, onSignOut, userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  const filters = ['All', 'Applied', 'Interviewing', 'Rejected']

  return (
    <div className="bg-gray-900 p-4 h-screen flex flex-col">
      <div className="mb-8 text-center relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-full text-white focus:outline-none"
        >
          <UserCircle size={64} className="mx-auto text-white" />
          <ChevronDown size={20} className="ml-2" />
        </button>
        <h2 className="text-white mt-2 font-bold">{userName}</h2>

        {isDropdownOpen && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 rounded-md shadow-lg">
            <button
              onClick={() => { setIsViewProfileOpen(true); setIsDropdownOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              View Profile
            </button>
            <button
              onClick={() => { setIsEditProfileOpen(true); setIsDropdownOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Edit Profile
            </button>
          </div>
        )}
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
      <PopoutForm
        isOpen={isViewProfileOpen}
        onClose={() => setIsViewProfileOpen(false)}
        title="View Profile"
      >
        <ViewProfile />
      </PopoutForm>

      <PopoutForm
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Profile"
      >
        <EditProfile onClose={() => setIsEditProfileOpen(false)} />
      </PopoutForm>
    </div>
  )
}

export default AuthNavbar;