import { useState, useEffect } from 'react'

const ApplicationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    job_title: '',
    company: '',
    jd_url: '',
    application_date: new Date().toISOString().split('T')[0],
    status: 'applied',
    salary: '',
    notes: ''
  })
  const [showLoginWarning, setShowLoginWarning] = useState(false)
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        application_date: initialData.application_date.split('T')[0],
        salary: initialData.salary || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if URL is likely from LinkedIn or other login-protected sites
    if (name === 'jd_url' && value) {
      const loginProtectedDomains = ['linkedin.com', 'glassdoor.com'];
      const isLoginProtected = loginProtectedDomains.some(domain => value.includes(domain));
      setShowLoginWarning(isLoginProtected);
    }
    
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'salary' ? (value === '' ? '' : parseInt(value, 10)) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showLoginWarning && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Note about login-protected URLs</p>
          <p>It looks like you entered a URL that might be behind a login wall (like LinkedIn or Glassdoor).</p>
          <p>Please copy the Job Description directly from their careers page as it required to generate a cover letter.</p>
        </div>
      )}
      
      <div>
        <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          id="job_title"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="jd_url" className="block text-sm font-medium text-gray-700">Job Description URL</label>
        <input
          type="url"
          id="jd_url"
          name="jd_url"
          value={formData.jd_url}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="application_date" className="block text-sm font-medium text-gray-700">Application Date</label>
        <input
          type="date"
          id="application_date"
          name="application_date"
          value={formData.application_date}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className={inputClasses}
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {isEditing ? 'Update Application' : 'Add Application'}
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm