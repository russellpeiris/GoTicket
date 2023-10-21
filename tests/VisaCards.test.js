import { render, fireEvent } from '@testing-library/react-native';
import VisaCards from './VisaCards';
import React from 'react';

test('check if button is rendered correctly', () => {
  const { getByText } = render(<VisaCards />);
  expect(getByText('Add Card')).toBeTruthy();
});

test('renders VisaCards component with cards', () => {
  const visaCardsData = [
    {
      id: '1',
      cardNumber: '1234 5678 9012 3456',
      cardHolderName: 'John Doe',
      expiryMonth: '12',
      expiryYear: '25',
    },
  ];

  const { getByText } = render(<VisaCards />);

  // check if card data is rendered correctly
  visaCardsData.forEach((card) => {
    expect(getByText(card.cardNumber)).toBeTruthy();
    expect(getByText(card.cardHolderName)).toBeTruthy();
    expect(getByText(`${card.expiryMonth}/${card.expiryYear}`)).toBeTruthy();
  });
});

test('calls handleDelete function when delete button is pressed', () => {
  const mockHandleDelete = jest.fn();
  const visaCardData = {
    id: '1',
    cardNumber: '1234 5678 9012 3456',
    cardHolderName: 'John Doe',
    expiryMonth: '12',
    expiryYear: '25',
  };

  const { getByText } = render(
    <VisaCards visaCards={[visaCardData]} handleDelete={mockHandleDelete} />
  );

  // Find and click the delete button
  fireEvent.press(getByText('Delete'));

  // Check if the handleDelete function is called with the correct ID
  expect(mockHandleDelete).toHaveBeenCalledWith('1');
});
