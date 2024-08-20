import React from 'react'

const generatePDF = ({generatePDF}) => {
  return (
    <div className="flex justify-end">
    <button
      onClick={generatePDF}
      className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Download PDF
    </button>
    </div>
  )
}

export default generatePDF