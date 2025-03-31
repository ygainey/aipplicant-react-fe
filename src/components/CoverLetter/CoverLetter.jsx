import { useState, useEffect } from 'react'

const CoverLetter = ({ coverLetter, onClose, isLoading = false }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    // Only start the typewriter effect when coverLetter is available
    if (!isLoading && coverLetter) {
      let index = 0
      setDisplayedText('') // Reset displayed text when new letter arrives
      setIsTypingComplete(false)
      
      const typingInterval = setInterval(() => {
        if (index < coverLetter.length) {
          setDisplayedText((prev) => prev + coverLetter.charAt(index))
          index++
        } else {
          clearInterval(typingInterval)
          setIsTypingComplete(true)
        }
      }, 20)

      return () => clearInterval(typingInterval)
    }
  }, [coverLetter, isLoading])

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="mt-4 font-sans">
        <div className="bg-gray-100 p-8 rounded-md shadow flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700">Generating your cover letter...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 font-sans"> 
      <p className="text-sm text-gray-500 mb-4">
        This is an AI-generated cover letter. Please review and modify as needed before using.
      </p>
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <div className="max-h-[60vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
            {displayedText}
          </pre>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" 
          disabled={!isTypingComplete}
        >
          {isCopied ? 'Copied!' : isTypingComplete ? 'Copy to Clipboard' : 'Typing...'}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out" 
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default CoverLetter