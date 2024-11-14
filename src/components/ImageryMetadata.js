import React from 'react';
import './ImageryMetadata.css';

function ImageryMetadata({ imageData }) {
  return (
    <div className="metadata-card">
      <h3>Imagery Metadata</h3>
      <p>Capture Date: {new Date(imageData.captureDate).toLocaleDateString()}</p>
      <p>Resolution: {imageData.resolution}</p>
      <p>Additional Metadata: {imageData.metadata}</p>
    </div>
  );
}

export default ImageryMetadata;