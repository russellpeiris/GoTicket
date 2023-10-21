import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddVisa from '../src/screens/AddVisa'; // Import the component to be tested

// mock the necessary dependencies or functions
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('AddVisa', () => {
  it('handles card addition correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<AddVisa />);
    
    // simulate user input
    fireEvent.changeText(getByPlaceholderText('Card Number'), '1234567890123456');
    fireEvent.changeText(getByPlaceholderText('Card Holder'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('MM'), '12');
    fireEvent.changeText(getByPlaceholderText('YY'), '25');
    
    // trigger button click
    fireEvent.press(getByText('Continue'));
    
    // Wait for the asynchronous validation to complete
    await waitFor(() => {
      // Assertions for success scenario
      expect(getByText('Data submitted successfully')).toBeDefined();
    });
  });
});