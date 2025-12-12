import React from 'react'

const Loader = () => {
  return (
        <div className="flex items-center justify-center">
          <div
            role="status"
            aria-label="Loading"
            className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
          ></div>
        </div>
  )
}

export default Loader