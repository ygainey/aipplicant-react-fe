const CoverLetter = ({ coverLetter, onClose }) => {
    return (
        <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4">
                This is an AI-generated cover letter. Please review and modify as needed before using.
            </p>
            <div className="bg-white p-4 rounded-md shadow">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {coverLetter}
                </pre>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(coverLetter);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Copy to Clipboard
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default CoverLetter;