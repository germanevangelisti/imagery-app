import { render, screen } from '@testing-library/react';
import FutureOpportunities from '../FutureOpportunities';
import { getFutureOpportunities } from '../../services/apiService';

jest.mock('../../services/apiService');
jest.mock('axios');

test('renders future opportunities', async () => {
  const mockOpportunities = [
    { opportunityId: 'OP123', estimatedCaptureDate: '2024-11-15T12:36:34.693551', confidence: 'High' },
  ];

  getFutureOpportunities.mockResolvedValueOnce(mockOpportunities);

  render(<FutureOpportunities lat={0} lon={0} onOpportunitiesFetched={() => {}} />);

  expect(await screen.findByText(/Opportunity ID: OP123/i)).toBeInTheDocument();
  expect(await screen.findByText(/Estimated Capture Date: 11\/15\/2024/i)).toBeInTheDocument();
  expect(await screen.findByText(/Confidence: High/i)).toBeInTheDocument();
});