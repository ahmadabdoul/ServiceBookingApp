import { ProviderWithCategory } from '@/types';
import { render } from '@testing-library/react-native';
import React from 'react';
import ProviderCard from './ProviderCard';


jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ProviderCard', () => {
  const mockProvider: ProviderWithCategory = {
    id: 1,
    name: 'John Smith',
    categoryId: 1,
    rating: 4.7,
    pricePerHour: 35,
    experienceYears: 6,
    location: {
      lat: 6.524379,
      lng: 3.379206,
      city: 'Lagos',
    },
    description: 'Experienced plumber.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    gallery: [],
    categoryName: 'Plumbing',
  };

  it('renders the provider\'s name, category, and rating', () => {
    const { getByText } = render(<ProviderCard provider={mockProvider} />);

    expect(getByText('John Smith')).toBeTruthy();
    expect(getByText('Plumbing')).toBeTruthy();
    expect(getByText('4.7')).toBeTruthy();
  });
});
