import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import ApplicationCard from '../ApplicationCard/ApplicationCard';
import PopoutForm from '../PopoutForm/PopoutForm'
import ApplicationForm from '../ApplicationForm/ApplicationForm';
import * as crudService from '../../services/crudService'


const Board = ({ applications = [], onAddApplication, onDeleteApplication, onUpdateApplication }) => {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)
    const [error, setError] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const profile = await crudService.getProfile();
            setUserProfile(profile);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setError('Failed to load user profile. Some features may be limited.');
        }
    };

    const handleAddApplication = async (newApplication) => {
        try {
            await onAddApplication(newApplication)
            setIsAddFormOpen(false)
            setError(null)
        } catch (error) {
            console.error('Failed to add application:', error)
            setError('Failed to add application. Please try again.')
        }
    }

    const handleGenerateCoverLetter = async (application) => {
        try {
            const data = {
                job_title: application.job_title,
                company: application.company,
                jd_url: application.jd_url,
                professional_bio: userProfile.professional_summary
            };
            const generatedLetter = await crudService.generateCoverLetter(data);
            return generatedLetter;
        } catch (error) {
            console.error('Failed to generate cover letter:', error);
            setError('Failed to generate cover letter. Please try again.');
            throw error;
        }
    };

    // const handleDeleteApplication = async (applicationId) => {
    //     try {
    //         await onDeleteApplication(applicationId)
    //     } catch (error) {
    //         console.error('Failed to delete application:', error)
    //         setError('Failed to delete application. Please try again.')
    //     }
    // }

    const handleUpdateApplication = async (updatedApplication) => {
        try {
            await onUpdateApplication(updatedApplication)
            setError(null)
        } catch (error) {
            console.error('Failed to update application:', error)
            setError('Failed to update application. Please try again.')
        }
    }

    return (
        <main className="flex-1 p-8 overflow-auto">
            <h1 className="text-2xl font-bold mb-4 text-white">Job Applications</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {applications && applications.length > 0 ? (
                    applications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            application={app}
                            onDelete={() => onDeleteApplication(app.id)}
                            onUpdate={handleUpdateApplication}
                            onGenerateCoverLetter={() => handleGenerateCoverLetter(app)}
                            userProfile={userProfile}
                        />
                    ))
                ) : (
                    <p className="text-gray-400 col-span-full">No applications yet. Add your first one!</p>
                )}
                <button
                    onClick={() => setIsAddFormOpen(true)}
                    className="bg-gray-800 p-4 rounded-lg flex items-center justify-center cursor-pointer text-gray-400 hover:text-white"
                >
                    <Plus size={24} className="mr-2" /> Add New Application
                </button>
            </div>
            <PopoutForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} title="Add New Application">
                <ApplicationForm onSubmit={handleAddApplication} onCancel={() => setIsAddFormOpen(false)} />
            </PopoutForm>
        </main>
    )
}

export default Board;