import { render, screen, fireEvent } from '@testing-library/react';
import LocationSearchBar from '../LocationSearchBar';

test('renders search bar and handles input', () => {
  const setQuery = jest.fn();
  const onSearch = jest.fn();

  render(<LocationSearchBar query="" setQuery={setQuery} onSearch={onSearch} />);
  
  const input = screen.getByPlaceholderText(/Enter location/i);
  fireEvent.change(input, { target: { value: 'New York' } });
  expect(setQuery).toHaveBeenCalledWith('New York');

  const button = screen.getByText(/Search/i);
  fireEvent.click(button);
  expect(onSearch).toHaveBeenCalled();
});