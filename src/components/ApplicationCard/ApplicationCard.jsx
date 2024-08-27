import { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import ApplicationView from '../ApplicationView/ApplicationView'
import PopoutForm from '../PopoutForm/PopoutForm'
import ApplicationForm from '../ApplicationForm/ApplicationForm';

const ApplicationCard = ({ application, onDelete, onUpdate }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (updatedApplication) => {
    onUpdate(updatedApplication);
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3
          className="text-white font-bold cursor-pointer hover:text-blue-400"
          onClick={() => setIsViewOpen(true)}
        >
          {application.job_title}
        </h3>
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
        <div className="flex justify-end mt-2 space-x-2">
          <button onClick={() => setIsEditOpen(true)} className="text-gray-400 hover:text-white">
            <Edit size={16} />
          </button>
          <button onClick={onDelete} className="text-gray-400 hover:text-white">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <PopoutForm 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        title={`View Application: ${application.job_title}`}
      >
        <ApplicationView application={application} />
      </PopoutForm>

      <PopoutForm 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        title={`Edit Application: ${application.job_title}`}
      >
        <ApplicationForm 
          initialData={application} 
          onSubmit={handleEdit} 
          onCancel={() => setIsEditOpen(false)}
        />
      </PopoutForm>
    </>
  );
};

export default ApplicationCard;