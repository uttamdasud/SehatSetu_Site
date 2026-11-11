import { useEffect } from 'react';

/**
 * Custom hook that listens for the 'Escape' key and triggers a callback.
 * Used across application modals to ensure keyboard accessibility (WCAG 2.1).
 *
 * @param onEscape - Function to execute when Escape key is pressed
 * @param isEnabled - Whether the listener is currently active (defaults to true)
 */
export function useEscapeKey(onEscape: () => void, isEnabled: boolean = true): void {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape, isEnabled]);
}
