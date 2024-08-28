import { useState, useEffect } from 'react'
import * as crudService from '../../services/crudService'

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await crudService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">First Name</h3>
        <p className="mt-1 text-sm text-gray-600">{profile.first_name}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Last Name</h3>
        <p className="mt-1 text-sm text-gray-600">{profile.last_name}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Email</h3>
        <p className="mt-1 text-sm text-gray-600">{profile.email}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
        <p className="mt-1 text-sm text-gray-600">{profile.professional_summary || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default ViewProfile;