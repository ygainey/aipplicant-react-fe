import { Plus } from 'lucide-react';
import ApplicationCard from '../ApplicationCard/ApplicationCard';

const Board = ({ applications, onAddApplication, onDeleteApplication }) => {
    return (
        <main className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-4 text-white">Job Applications</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* {applications.map(app => {
                    return (
                        <ApplicationCard key={app.id} application={app} onDelete={onDeleteApplication} />
                    );
                })} */}
                <button
                    onClick={onAddApplication}
                    className="bg-gray-800 p-4 rounded-lg flex items-center justify-center cursor-pointer text-gray-400 hover:text-white"
                >
                    <Plus size={24} className="mr-2" /> Add New Application
                </button>
            </div>
        </main>
    );
};

export default Board