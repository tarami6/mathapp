import React from 'react';

const Feedback = ({ message }) => (
  <div className="h-12 flex items-center justify-center text-3xl transition-opacity duration-300">
    {message}
  </div>
);

export default Feedback;