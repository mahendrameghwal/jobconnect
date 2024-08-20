import React, { useState } from 'react';

const Suggestion = () => {
  const [formData, setFormData] = useState({
    userId: '',
    featureTitle: '',
    featureDescription: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have an API endpoint to handle the suggestion submission
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatusMessage('Suggestion submitted successfully!');
        setFormData({
          userId: '',
          featureTitle: '',
          featureDescription: '',
        });
      } else {
        setStatusMessage('Failed to submit suggestion.');
      }
    } catch (error) {
      setStatusMessage('An error occurred.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Submit a Feature Suggestion</h2>
      {statusMessage && <p className="mb-4 text-green-600">{statusMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-gray-700 font-medium">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="featureTitle" className="block text-gray-700 font-medium">Feature Title</label>
          <input
            type="text"
            id="featureTitle"
            name="featureTitle"
            value={formData.featureTitle}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="featureDescription" className="block text-gray-700 font-medium">Feature Description</label>
          <textarea
            id="featureDescription"
            name="featureDescription"
            value={formData.featureDescription}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Submit Suggestion
        </button>
      </form>
    </div>
  );
};

export default Suggestion;
