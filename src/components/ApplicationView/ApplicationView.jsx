

const ApplicationView = ({ application }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Job Title</h3>
        <p className="mt-1 text-sm text-gray-600">{application.job_title}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Company</h3>
        <p className="mt-1 text-sm text-gray-600">{application.company}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Job Description URL</h3>
        <a href={application.jd_url} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-blue-600 hover:underline break-words overflow-hidden">
          {application.jd_url}
        </a>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Application Date</h3>
        <p className="mt-1 text-sm text-gray-600">{new Date(application.application_date).toLocaleDateString()}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Status</h3>
        <p className="mt-1 text-sm text-gray-600">{application.status}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Salary</h3>
        <p className="mt-1 text-sm text-gray-600">{application.salary ? `£${application.salary.toLocaleString()}` : 'Not specified'}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
        <p className="mt-1 text-sm text-gray-600">{application.notes || 'No notes'}</p>
      </div>
    </div>
  );
};

export default ApplicationView;