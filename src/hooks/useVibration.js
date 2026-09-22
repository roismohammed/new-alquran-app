export function useVibration() {
  const vibrate = (pattern = 15) => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore vibration errors
    }
  };

  return { vibrate };
}
