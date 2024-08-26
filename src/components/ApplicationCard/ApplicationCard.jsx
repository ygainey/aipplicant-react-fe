import { X } from 'lucide-react';

const ApplicationCard = ({ application, onDelete }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white font-bold">{application.position}</h3>
        <p className="text-gray-400">{application.company}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-400">{new Date(application.application_date).toLocaleDateString()}</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            application.status === 'applied' ? 'bg-yellow-500' :
            application.status === 'interviewing' ? 'bg-blue-500' :
            application.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
          } text-white`}>
            {application.status}
          </span>
        </div>
        <div className="flex justify-end mt-2">
          <button onClick={() => onDelete(application.id)} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  };

export default ApplicationCard