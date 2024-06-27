// src/components/Header.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

test('renders Header component', () => {
  const setUsers = jest.fn();
  render(<Header setUsers={setUsers} />);
  
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
});

test('calls handleSearch on button click', async () => {
  const setUsers = jest.fn();
  render(<Header setUsers={setUsers} />);
  
  fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));
  
  // Add more assertions based on your handleSearch implementation
});
