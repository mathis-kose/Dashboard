// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';
import { jest } from '@jest/globals'; // For mocking

// Mock any functions passed as props if necessary, e.g. alert
global.alert = jest.fn();

describe('App Component', () => {
  it('renders the main demo page heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /Tagesbegleiter - Neumorphic Demo/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders NeumorphicCard components', () => {
    render(<App />);
    // Check for a heading within one of the cards to confirm they render
    expect(screen.getByRole('heading', { name: /Neumorphic Card/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Neumorphic Buttons/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Neumorphic Input/i })).toBeInTheDocument();
  });

  // Add more specific tests for interactions if desired,
  // but the main goal here is a visual demo page setup.
});
