// src/components/GridContainer.test.tsx
import { render, screen, act } from '@testing-library/react';
import GridContainer from './GridContainer';
import { GridProvider, useGrid, DEFAULT_GRID_COLUMNS } from '../contexts/GridContext';
import React from 'react'; // For React.ReactElement

// Breakpoints and column config from useResponsiveGrid.ts for consistent testing
const responsiveBreakpoints = {
  lg: '(min-width: 1024px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 640px)',
};

const responsiveColumnConfig = {
  lg: 12,
  md: 8,
  sm: 6,
  default: 4,
};

// Helper to render with provider
const renderWithGridProvider = (
  ui: React.ReactElement
) => {
  return render(
    <GridProvider>
      {ui}
    </GridProvider>
  );
};

// Store original matchMedia
const originalMatchMedia = window.matchMedia;
let mockMatchMediaImplementation: jest.Mock;

beforeEach(() => {
  // Setup a fresh mock implementation for each test
  // The global mock in setupTests.ts provides the structure (addEventListener etc.)
  // Here we control the 'matches' property for specific queries.
  const listeners: Record<string, Array<(e: { matches: boolean }) => void>> = {};

  mockMatchMediaImplementation = jest.fn(query => {
    let currentMatches = false; // Default to false

    // Determine 'matches' based on current test setup (will be controlled by test)
    // This is a placeholder; actual match logic will be set within each test.
    // For example, a test might set window.innerWidth and this mock would derive 'matches'.
    // Or, a test directly sets which query should match.

    return {
      matches: currentMatches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn((event, listener) => {
        if (event === 'change') {
          if (!listeners[query]) {
            listeners[query] = [];
          }
          listeners[query].push(listener as (e: { matches: boolean }) => void);
        }
      }),
      removeEventListener: jest.fn((event, listener) => {
         if (event === 'change' && listeners[query]) {
          const index = listeners[query].indexOf(listener as (e: { matches: boolean }) => void);
          if (index > -1) {
            listeners[query].splice(index, 1);
          }
        }
      }),
      dispatchEvent: jest.fn(), // Not typically used for triggering in tests
      // Helper for tests to trigger listeners
      _triggerChange: (matchesStatus: boolean) => {
        if (listeners[query]) {
          listeners[query].forEach(listener => listener({ matches: matchesStatus }));
        }
      }
    };
  });
  window.matchMedia = mockMatchMediaImplementation;
});

afterEach(() => {
  // Restore original matchMedia to avoid interference between test files
  window.matchMedia = originalMatchMedia;
});


describe('GridContainer', () => {
  it('renders children correctly', () => {
    renderWithGridProvider(<GridContainer><div data-testid="child">Child</div></GridContainer>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('uses default columns from GridContext (before responsive hook kicks in) and default gap prop', () => {
    // Set matchMedia to not match anything initially for this specific test if needed
    mockMatchMediaImplementation.mockImplementation(query => ({
      matches: false, // No media queries match
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    renderWithGridProvider(<GridContainer>Test</GridContainer>);
    const containerElement = screen.getByTestId('grid-container');
    // The GridProvider's useEffect will run, potentially updating columns.
    // To test the *initial* state before the hook fully processes, this is tricky.
    // The hook runs and dispatches quickly.
    // For this test, let's assume the DEFAULT_GRID_COLUMNS is what's briefly there or if all media queries are false.
    // The useResponsiveGrid hook itself defaults to 4 if no queries match.
    // And DEFAULT_GRID_COLUMNS in GridContext is 12.
    // The hook useResponsiveGrid will return 4 if nothing matches. GridProvider will set it to 4.
    expect(containerElement).toHaveStyle(`grid-template-columns: repeat(${responsiveColumnConfig.default}, minmax(0, 1fr))`);
    expect(containerElement).toHaveStyle('gap: 1rem'); // Default gap=4 -> 1rem
  });

  it('applies custom gap from prop', () => {
    renderWithGridProvider(<GridContainer gap={2}>Test</GridContainer>);
    const containerElement = screen.getByTestId('grid-container');
    expect(containerElement).toHaveStyle('gap: 0.5rem'); // Custom gap=2 -> 0.5rem
  });

  // Test component to dispatch actions if needed for GridContainer tests
  // const GridControlTestComponent: React.FC<{ dispatchAction: () => void, buttonText: string }> = ({ dispatchAction, buttonText }) => {
  //   return <button onClick={dispatchAction}>{buttonText}</button>;
  // };

  it('renders debug grid cells when showGridLines is true in context', () => {
    let dispatchForTest: React.Dispatch<any>;

    const TestComponentWithGridAndToggle = () => {
      const { dispatch } = useGrid();
      dispatchForTest = dispatch;
      return <GridContainer>Children</GridContainer>;
    };

    renderWithGridProvider(<TestComponentWithGridAndToggle />);
    expect(screen.queryByTestId(/debug-cell-/)).not.toBeInTheDocument();

    act(() => {
      dispatchForTest({ type: 'TOGGLE_GRID_LINES' });
    });

    // The number of debug cells depends on the current gridColumns.
    // Let's assume default columns (4) if no media queries matched.
    const expectedCols = responsiveColumnConfig.default;
    expect(screen.getByTestId(`grid-cell-1-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`grid-cell-${expectedCols}-1`)).toBeInTheDocument();
  });

  describe('Responsive Column Integration', () => {
    const setupMatchMedia = (matchingQuery: string | null) => {
      mockMatchMediaImplementation.mockImplementation(query => {
        const mql = {
          matches: query === matchingQuery,
          media: query,
          _listeners: [] as Array<(e: { matches: boolean }) => void>,
          addEventListener: jest.fn((event, listener) => {
            if (event === 'change') mql._listeners.push(listener as (e: { matches: boolean }) => void);
          }),
          removeEventListener: jest.fn((event, listener) => {
            if (event === 'change') {
              const index = mql._listeners.indexOf(listener as (e: { matches: boolean }) => void);
              if (index > -1) mql._listeners.splice(index, 1);
            }
          }),
          // Helper to trigger listeners for this specific MQL instance
          _triggerChange: (newMatchesStatus: boolean) => {
            mql.matches = newMatchesStatus; // Update internal matches state
            mql._listeners.forEach(l => l({ matches: newMatchesStatus }));
          }
        };
        return mql;
      });
    };

    // Helper to get the MQL instance and trigger its listeners
    const triggerMediaQueryChange = (query: string, matches: boolean) => {
        const mql = window.matchMedia(query) as any; // Get the mocked MQL
        if (mql && mql._triggerChange) {
            act(() => {
                mql._triggerChange(matches);
            });
        } else {
            // Fallback if MQL doesn't have _triggerChange (e.g. initial setup)
            // This forces a re-render and re-evaluation of the hook by GridProvider
             act(() => {
                window.dispatchEvent(new Event('resize')); // Generic event
             });
        }
    };


    it('updates to sm columns when sm breakpoint is matched', () => {
      setupMatchMedia(responsiveBreakpoints.sm); // Only sm matches
      renderWithGridProvider(<GridContainer>Test</GridContainer>);

      // Trigger the change for sm query
      triggerMediaQueryChange(responsiveBreakpoints.sm, true);
      triggerMediaQueryChange(responsiveBreakpoints.md, false);
      triggerMediaQueryChange(responsiveBreakpoints.lg, false);


      const containerElement = screen.getByTestId('grid-container');
      expect(containerElement).toHaveStyle(`grid-template-columns: repeat(${responsiveColumnConfig.sm}, minmax(0, 1fr))`);
    });

    it('updates to md columns when md breakpoint is matched', () => {
      setupMatchMedia(responsiveBreakpoints.md); // Only md matches (hook logic implies sm also matches)
      renderWithGridProvider(<GridContainer>Test</GridContainer>);

      triggerMediaQueryChange(responsiveBreakpoints.sm, true);
      triggerMediaQueryChange(responsiveBreakpoints.md, true);
      triggerMediaQueryChange(responsiveBreakpoints.lg, false);

      const containerElement = screen.getByTestId('grid-container');
      expect(containerElement).toHaveStyle(`grid-template-columns: repeat(${responsiveColumnConfig.md}, minmax(0, 1fr))`);
    });

    it('updates to lg columns when lg breakpoint is matched', () => {
      setupMatchMedia(responsiveBreakpoints.lg); // Only lg matches (hook logic implies sm, md also match)
      renderWithGridProvider(<GridContainer>Test</GridContainer>);

      triggerMediaQueryChange(responsiveBreakpoints.sm, true);
      triggerMediaQueryChange(responsiveBreakpoints.md, true);
      triggerMediaQueryChange(responsiveBreakpoints.lg, true);

      const containerElement = screen.getByTestId('grid-container');
      expect(containerElement).toHaveStyle(`grid-template-columns: repeat(${responsiveColumnConfig.lg}, minmax(0, 1fr))`);
    });

    it('reverts to default columns when no breakpoint is matched', () => {
      setupMatchMedia(null); // No query matches
      renderWithGridProvider(<GridContainer>Test</GridContainer>);

      triggerMediaQueryChange(responsiveBreakpoints.sm, false);
      triggerMediaQueryChange(responsiveBreakpoints.md, false);
      triggerMediaQueryChange(responsiveBreakpoints.lg, false);

      const containerElement = screen.getByTestId('grid-container');
      expect(containerElement).toHaveStyle(`grid-template-columns: repeat(${responsiveColumnConfig.default}, minmax(0, 1fr))`);
    });
  });
});
