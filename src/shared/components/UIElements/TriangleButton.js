import React from 'react';
import './TriangleButton.css'; // Import the CSS file with your button styles

const TriangleButton = ({ children, onClick, fontSize, disabled = false }) => {
  return (
    <button
      className="btn-5"
      onClick={onClick}
      disabled={disabled}
      style={{ fontSize }}
    >
      <span>{children}</span>
    </button>
  );
};

export default TriangleButton;
