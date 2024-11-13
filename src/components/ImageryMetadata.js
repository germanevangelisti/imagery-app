import React from 'react';

function ImageryMetadata({ imageData }) {
  return (
    <div>
      <h3>Imagery Metadata</h3>
      <p>Capture Date: {imageData.captureDate}</p>
      <p>Resolution: {imageData.resolution}</p>
      <p>Additional Metadata: {imageData.metadata}</p>
    </div>
  );
}

export default ImageryMetadata;