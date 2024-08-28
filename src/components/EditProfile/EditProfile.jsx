import { useState, useEffect } from 'react'
import * as crudService from '../../services/crudService'

const EditProfile = ({ onClose }) => {
    const [profile, setProfile] = useState({
      first_name: '',
      last_name: '',
      email: '',
      professional_summary: ''
    })
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await crudService.getProfile()
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            professional_summary: data.professional_summary || ''
          })
        } catch (error) {
          console.error('Failed to fetch profile:', error)
          setError('Failed to load profile. Please try again.')
        }
      };
  
      fetchProfile();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setProfile(prev => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await crudService.updateProfile(profile);
        onClose()
      } catch (error) {
        console.error('Failed to update profile:', error)
        setError('Failed to update profile. Please try again.')
      }
    }
  
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="professional_summary" className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <textarea
            id="professional_summary"
            name="professional_summary"
            value={profile.professional_summary}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Update Profile
          </button>
        </div>
      </form>
    )
  }
  
  export default EditProfile;