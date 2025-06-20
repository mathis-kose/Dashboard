// tagesbegleiter/src/hooks/useResponsiveGrid.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useResponsiveGrid } from './useResponsiveGrid'; // Assuming columnConfig is not exported anymore

// Default mock implementation (can be overridden in specific tests)
// This will now be primarily handled by the global mock in setupTests.ts,
// but tests can override parts of it if needed.
let mockMatchMedia: jest.Mock;

beforeEach(() => {
  // Use the mock function provided by setupTests.ts
  // We can then control its behavior per test case by changing what jest.fn().mockImplementation returns
  mockMatchMedia = window.matchMedia as jest.Mock;
});

describe('useResponsiveGrid', () => {
  // Helper function to simulate media query changes
  const simulateMediaQueryChange = (matches: { sm: boolean; md: boolean; lg: boolean }) => {
    act(() => {
      mockMatchMedia.mockImplementation(query => {
        let matchResult = false;
        if (query === '(min-width: 1024px)') matchResult = matches.lg;
        else if (query === '(min-width: 768px)') matchResult = matches.md;
        else if (query === '(min-width: 640px)') matchResult = matches.sm;

        // Find the listener for this query and call it
        // This is a simplified way to trigger the 'change' event listeners
        // In a real scenario, you'd need to manage listeners more robustly if testing the event listener system itself
        // For this hook, we care about the result of getColumns after a conceptual change.
        // The global mock in setupTests.ts already returns an object with addEventListener etc.
        // We need to trigger the 'handler' inside the hook.
        // The most straightforward way is to re-render or rely on the hook's internal logic reacting to mock changes.
        // The current mock in setupTests.ts doesn't allow easy triggering of listeners.
        // Let's refine the mock strategy slightly for more control in tests.

        return {
          matches: matchResult,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn((event, callback) => {
            // Store callback to be called manually if needed, or rely on re-render
          }),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      });
      // Dispatch a generic resize or custom event to trigger re-evaluation if necessary,
      // or rely on act() to handle state updates from the hook.
      // The hook's useEffect re-runs getColumns on mount and when listeners fire.
      // We need to make the listeners fire.
      // The listeners are added to the MQL objects.
      // A simple way to force re-evaluation is to call the handler directly,
      // but that's testing implementation details.
      // A better way is to ensure the mock can trigger its own listeners.
      // For now, we'll rely on re-rendering the hook or direct state updates.
      // The current hook structure will call getColumns on each MQL change.
      // We just need to ensure that when matchMedia is called again, it returns the new values.
      // The effect's handler will be called by the MQLs.

      // To properly test the event listener mechanism, the mock needs to be more sophisticated.
      // It should store listeners and allow triggering them.
      // For this iteration, we'll assume the event listeners on MQLs work as expected
      // and focus on the output based on different matchMedia results.
      // We will re-render the hook to simulate a "change" that causes re-evaluation.
    });
  };

  // Revised approach: We will provide a map of listeners to the mock
  // and trigger them.
  const mediaQueryListeners: Record<string, ((event: { matches: boolean }) => void)[]> = {};

  beforeEach(() => {
    // Clear listeners for each test
    for (const key in mediaQueryListeners) {
      delete mediaQueryListeners[key];
    }

    mockMatchMedia.mockImplementation(query => {
      const mql = {
        matches: false, // Default, will be set by test case
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn((event: string, listener: (event: { matches: boolean }) => void) => {
          if (event === 'change') {
            if (!mediaQueryListeners[query]) {
              mediaQueryListeners[query] = [];
            }
            mediaQueryListeners[query].push(listener);
          }
        }),
        removeEventListener: jest.fn((event: string, listener: (event: { matches: boolean }) => void) => {
          if (event === 'change' && mediaQueryListeners[query]) {
            const index = mediaQueryListeners[query].indexOf(listener);
            if (index > -1) {
              mediaQueryListeners[query].splice(index, 1);
            }
          }
        }),
        dispatchEvent: jest.fn(),
      };
      return mql;
    });
  });

  // Helper to trigger listeners
  const triggerListeners = (query: string, matches: boolean) => {
    act(() => {
      if (mediaQueryListeners[query]) {
        mediaQueryListeners[query].forEach(listener => listener({ matches }));
      }
    });
  };


  it('should return default columns initially (no media queries match)', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: false, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn(),
    }));
    const { result } = renderHook(() => useResponsiveGrid());
    expect(result.current).toBe(4); // default columns
  });

  it('should return sm columns when sm query matches', () => {
    const { result, rerender } = renderHook(() => useResponsiveGrid());
    // Initial (default)
    expect(result.current).toBe(4);

    // Simulate SM match
    mockMatchMedia.mockImplementation(query => ({
      matches: query === '(min-width: 640px)', media: query, addEventListener: jest.fn(), removeEventListener: jest.fn(),
    }));
    triggerListeners('(min-width: 640px)', true);
    rerender(); // Rerender to make the hook re-evaluate with new mock state
    expect(result.current).toBe(6); // sm columns
  });

  it('should return md columns when md query matches (and implicitly sm)', () => {
    const { result, rerender } = renderHook(() => useResponsiveGrid());
    expect(result.current).toBe(4);

    // Simulate MD match
    mockMatchMedia.mockImplementation(query => ({
      matches: query === '(min-width: 768px)' || query === '(min-width: 640px)', media: query, addEventListener: jest.fn(), removeEventListener: jest.fn(),
    }));
    triggerListeners('(min-width: 768px)', true); // This also implies sm is true for the hook's logic
    rerender();
    expect(result.current).toBe(8); // md columns
  });

  it('should return lg columns when lg query matches (and implicitly sm, md)', () => {
    const { result, rerender } = renderHook(() => useResponsiveGrid());
    expect(result.current).toBe(4);

    // Simulate LG match
    mockMatchMedia.mockImplementation(query => ({
      matches: query === '(min-width: 1024px)' || query === '(min-width: 768px)' || query === '(min-width: 640px)', media: query, addEventListener: jest.fn(), removeEventListener: jest.fn(),
    }));
    triggerListeners('(min-width: 1024px)', true);
    rerender();
    expect(result.current).toBe(12); // lg columns
  });

  it('should prioritize larger breakpoints (e.g. lg over md)', () => {
    const { result, rerender } = renderHook(() => useResponsiveGrid());
     mockMatchMedia.mockImplementation(query => ({
      // All match, but hook logic should pick LG
      matches: true, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn(),
    }));
    triggerListeners('(min-width: 1024px)', true); // Simulate the largest one changing
    rerender();
    expect(result.current).toBe(12); // lg columns
  });

  it('should clean up event listeners on unmount', () => {
    // This test requires the mock addEventListener and removeEventListener to be more robust
    // to check if the correct listeners were removed from the correct MQLs.
    // The current global mock in setupTests.ts already spies on add/remove.
    // We need to ensure our hook calls them.
    const mockMqlInstance = {
        matches: false,
        media: 'test',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMqlInstance);

    const { unmount } = renderHook(() => useResponsiveGrid());
    unmount();

    // Check that removeEventListener was called on each MQL instance that addEventListener was called on.
    // Since we mock matchMedia to return the same instance 3 times (for lg, md, sm queries in the hook)
    // this test will show 3 calls to addEventListener and 3 to removeEventListener on that single instance.
    expect(mockMqlInstance.addEventListener).toHaveBeenCalledTimes(3); // lg, md, sm
    expect(mockMqlInstance.removeEventListener).toHaveBeenCalledTimes(3);
    expect(mockMqlInstance.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
