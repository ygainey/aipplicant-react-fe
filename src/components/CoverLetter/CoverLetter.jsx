import { useState, useEffect } from 'react';

const CoverLetter = ({ coverLetter, onClose }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < coverLetter.length) {
        setDisplayedText((prev) => prev + coverLetter.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 20); // Adjust this value to change typing speed

    return () => clearInterval(typingInterval);
  }, [coverLetter]);

  return (
    <div className="mt-4 font-sans"> {/* Applied sans-serif font */}
      <p className="text-sm text-gray-500 mb-4">
        This is an AI-generated cover letter. Please review and modify as needed before using.
      </p>
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <div className="max-h-[60vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed"> {/* Applied sans-serif font and improved line height */}
            {displayedText}
          </pre>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(coverLetter);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" // Added transition
          disabled={!isTypingComplete}
        >
          {isTypingComplete ? 'Copy to Clipboard' : 'Typing...'}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out" // Added transition
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CoverLetter;