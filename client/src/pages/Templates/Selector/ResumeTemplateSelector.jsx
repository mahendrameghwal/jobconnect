import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import template from "../../../assets/templates/Templates";

const { t1, t2, t3, t4, t5, t6 } = template;
const templates = [
  { id: 1., name: 'Professional', image: t4 },
  { id: 2, name: 'Classic', image: t1 },
  { id: 3, name: 'Elegant', image: t5 },
  { id: 4, name: 'Minimalist', image: t6 },

 
];

const ResumeTemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateResume = () => {
    if (selectedTemplate) {
      navigate(`/resume/${selectedTemplate}`); // Navigate to the selected resume
    }
  };

  return (
    <motion.div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl max-md:text-2xl mb-2 font-semibold bg-gradient-to-t text-center text-transparent dark:text-blue-500   from-green-700 via-blue-700 to-purple-700 bg-clip-text">Choose Your resume Template</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-md:gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white rounded-sm shadow-md border overflow-hidden cursor-pointer ${
              selectedTemplate === template.id ? 'ring-2 ring-[#1E90FF]' : ''
            }`}
            
            
            onClick={() => setSelectedTemplate(template.id)}
          >
            <img src={template.image} alt={template.name} className="w-full object-contain" />
            <div className="p-1 ">
              <h2 className="text-base font-medium tracking-wide">{template.name}</h2>
            </div>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <motion.div className="mt-8 text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 max-md:py-1 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleCreateResume} // Attach handler to button click
          >
            Create Resume
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeTemplateSelector;
