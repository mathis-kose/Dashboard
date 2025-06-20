// src/components/ui/NeumorphicButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import NeumorphicButton from './NeumorphicButton';

describe('NeumorphicButton', () => {
  it('renders children correctly', () => {
    render(<NeumorphicButton>Click Me</NeumorphicButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies default styles and padding', () => {
    const { container } = render(<NeumorphicButton>Test</NeumorphicButton>);
    const buttonElement = container.firstChild as HTMLElement;
    expect(buttonElement).toHaveClass('bg-[var(--color-bg-light)]');
    expect(buttonElement).toHaveClass('rounded-[var(--border-radius-base)]');
    expect(buttonElement).toHaveClass('px-6 py-3'); // Default padding
    // Default interactive style (not pressed, not disabled)
    expect(buttonElement).toHaveClass('shadow-[var(--shadow-light-outset-soft)]');
  });

  it('applies custom className', () => {
    render(<NeumorphicButton className="custom-btn">Test</NeumorphicButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-btn');
  });

  it('applies custom padding', () => {
    render(<NeumorphicButton padding="px-8 py-4">Test</NeumorphicButton>);
    expect(screen.getByRole('button')).toHaveClass('px-8 py-4');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<NeumorphicButton onClick={handleClick}>Click</NeumorphicButton>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled styles and attribute', () => {
    render(<NeumorphicButton disabled>Disabled</NeumorphicButton>);
    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50');
    expect(buttonElement).toHaveClass('cursor-not-allowed');
    expect(buttonElement).toHaveClass('shadow-[var(--shadow-light-inset)]'); // Disabled has inset shadow
  });

  it('applies pressed styles when isPressed prop is true', () => {
    render(<NeumorphicButton isPressed>Pressed</NeumorphicButton>);
    expect(screen.getByRole('button')).toHaveClass('shadow-[var(--shadow-light-inset)]');
  });

  // Note: Testing actual hover and active states via fireEvent can be tricky for shadow changes
  // as it depends on CSS pseudo-classes. We primarily test the class application logic
  // based on props like `isPressed` and `disabled`.
  // For `active:` and `hover:` Tailwind classes, visual regression or E2E tests are more reliable.
  // However, we can check if the base interactive style is applied correctly.
  it('applies interactive styles when not pressed and not disabled', () => {
    render(<NeumorphicButton>Interactive</NeumorphicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('shadow-[var(--shadow-light-outset-soft)]');
    // Actual hover/active classes from Tailwind like `hover:shadow-[var(--shadow-light-outset-strong)]`
    // are harder to assert directly in unit tests without simulating CSS engine behavior.
    // We trust Tailwind applies them if the base class is correct.
  });
});
