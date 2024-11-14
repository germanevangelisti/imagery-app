import { render, screen } from '@testing-library/react';
import MapDisplay from '../MapDisplay';

test('renders map with correct date', () => {
  const lat = 40.7128;
  const lon = -74.0060;
  const date = '2024-10-15T12:36:34.693551';

  render(<MapDisplay lat={lat} lon={lon} date={date} />);
  
  const dateElement = screen.getByText(/Date: 10\/15\/2024/i);
  expect(dateElement).toBeInTheDocument();
});