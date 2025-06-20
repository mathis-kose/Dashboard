// src/components/ui/NeumorphicCard.test.tsx
import { render, screen } from '@testing-library/react';
import NeumorphicCard from './NeumorphicCard';

describe('NeumorphicCard', () => {
  it('renders children correctly', () => {
    render(<NeumorphicCard>Test Child</NeumorphicCard>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(<NeumorphicCard>Test</NeumorphicCard>);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-[var(--color-bg-light)]');
    expect(cardElement).toHaveClass('rounded-[var(--border-radius-base)]');
    expect(cardElement).toHaveClass('shadow-[var(--shadow-light-outset-strong)]');
    expect(cardElement).toHaveClass('p-6'); // Default padding
  });

  it('applies custom className', () => {
    const { container } = render(<NeumorphicCard className="custom-class">Test</NeumorphicCard>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom padding', () => {
    const { container } = render(<NeumorphicCard padding="p-8">Test</NeumorphicCard>);
    expect(container.firstChild).toHaveClass('p-8');
  });

  it('renders as a different element type', () => {
    const { container } = render(<NeumorphicCard elementType="article">Test</NeumorphicCard>);
    expect(container.querySelector('article')).toBeInTheDocument();
  });
});
