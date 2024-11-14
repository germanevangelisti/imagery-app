import { render, screen } from '@testing-library/react';
import ImageryTimeline from '../ImageryTimeline';

test('renders timeline with dates', () => {
  const dates = ['2024-10-15T12:36:34.693551', '2024-09-15T12:36:34.693614'];

  render(<ImageryTimeline dates={dates} onDateChange={() => {}} />);

  expect(screen.getByText(/10\/15\/2024/i)).toBeInTheDocument();
  expect(screen.getByText(/9\/15\/2024/i)).toBeInTheDocument();
});