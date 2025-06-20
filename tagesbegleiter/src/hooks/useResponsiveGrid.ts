// tagesbegleiter/src/hooks/useResponsiveGrid.ts
import { useState, useEffect, useCallback } from 'react';

// Define typical breakpoints and corresponding column counts
// These should ideally align with your design system (e.g., Tailwind's sm, md, lg)
// Order matters: from largest to smallest or smallest to largest, ensure logic handles it.
// Here, we define them such that we can check from largest to smallest.
const breakpoints = {
  lg: '(min-width: 1024px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 640px)',
};

const columnConfig = {
  lg: 12, // Max columns from context is 12
  md: 8,
  sm: 6,
  default: 4, // Columns for smallest screens (less than sm)
};

export const useResponsiveGrid = (): number => {
  const getColumns = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia(breakpoints.lg).matches) {
        return columnConfig.lg;
      }
      if (window.matchMedia(breakpoints.md).matches) {
        return columnConfig.md;
      }
      if (window.matchMedia(breakpoints.sm).matches) {
        return columnConfig.sm;
      }
    }
    return columnConfig.default;
  }, []); // No dependencies, as breakpoints and config are constant

  const [columns, setColumns] = useState<number>(getColumns());

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return; // Should not happen in browser, but good for SSR safety if ever used there
    }

    const handler = () => {
      setColumns(getColumns());
    };

    // Create a list of MediaQueryList objects
    const mediaQueryLists = [
      window.matchMedia(breakpoints.lg),
      window.matchMedia(breakpoints.md),
      window.matchMedia(breakpoints.sm),
    ];

    // Add event listeners
    mediaQueryLists.forEach(mql => mql.addEventListener('change', handler));

    // Initial check (in case the state changed between initial render and effect setup)
    // handler(); // Re-evaluating getColumns and setting state. useState already calls getColumns.

    // Cleanup function
    return () => {
      mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler));
    };
  }, [getColumns]); // getColumns is memoized by useCallback

  return columns;
};

export default useResponsiveGrid;
