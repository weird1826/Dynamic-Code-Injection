// useCodeInjection.js - Custom Hook
import { useEffect, useState } from 'react';

/**
 * Custom hook for managing code injection state
 * @returns {Object} The injection state and control fucntions.
 */
export const useCodeInjection = () => {
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
    return () => {
      if(isInjected) {
        eject();
      }
    };
  }, [isInjected]);

  /**
   * Inject Code.
   */
  const inject = () => {
    setIsInjected(true);
  };

  /**
   * Eject Code
   */
  const eject = () => {
    setIsInjected(false);
  };

  return { isInjected, inject, eject };
};