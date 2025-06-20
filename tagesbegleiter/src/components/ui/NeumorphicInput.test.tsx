// src/components/ui/NeumorphicInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import NeumorphicInput from './NeumorphicInput';

describe('NeumorphicInput', () => {
  it('renders correctly with default props', () => {
    render(<NeumorphicInput data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('bg-[var(--color-bg-light)]');
    expect(inputElement).toHaveClass('rounded-[var(--border-radius-base)]');
    expect(inputElement).toHaveClass('px-4 py-3'); // Default padding
    expect(inputElement).toHaveClass('shadow-[var(--shadow-light-inset)]'); // Default shadow
  });

  it('applies custom className', () => {
    render(<NeumorphicInput data-testid="test-input" className="custom-input-class" />);
    expect(screen.getByTestId('test-input')).toHaveClass('custom-input-class');
  });

  it('applies custom padding', () => {
    render(<NeumorphicInput data-testid="test-input" padding="px-5 py-4" />);
    expect(screen.getByTestId('test-input')).toHaveClass('px-5 py-4');
  });

  it('handles value changes', () => {
    render(<NeumorphicInput data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(inputElement.value).toBe('Hello');
  });

  it('applies disabled styles and attribute', () => {
    render(<NeumorphicInput data-testid="test-input" disabled />);
    const inputElement = screen.getByTestId('test-input') as HTMLInputElement;
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass('opacity-60');
    expect(inputElement).toHaveClass('cursor-not-allowed');
    // expect(inputElement).toHaveClass('shadow-[var(--shadow-light-outset-soft)]'); // Disabled style
  });

  // Testing focus style changes can be complex as it depends on CSS pseudo-classes.
  // We test that the base style for non-disabled inputs is the inset shadow.
  // The focus:shadow-[...] class is applied by Tailwind based on the focus pseudo-class.
  it('has inset shadow by default and expects focus style to be handled by CSS', () => {
    render(<NeumorphicInput data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toHaveClass('shadow-[var(--shadow-light-inset)]');
    // We trust Tailwind to apply 'focus:shadow-[var(--shadow-light-outset-soft)]'
  });
});
