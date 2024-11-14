import { render, screen } from '@testing-library/react';
import ImageryMetadata from '../ImageryMetadata';

test('renders metadata correctly', () => {
  const imageData = {
    captureDate: '2024-10-15T12:36:34.693551',
    resolution: '30m',
    metadata: 'Sample metadata',
  };

  render(<ImageryMetadata imageData={imageData} />);
  
  expect(screen.getByText(/Capture Date: 10\/15\/2024/i)).toBeInTheDocument();
  expect(screen.getByText(/Resolution: 30m/i)).toBeInTheDocument();
  expect(screen.getByText(/Additional Metadata: Sample metadata/i)).toBeInTheDocument();
});