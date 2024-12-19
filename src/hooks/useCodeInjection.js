// useCodeInjection.js - Custom Hook
import { useEffect, useState } from 'react';

export const useCodeInjection = () => {
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
    return () => {
      if(isInjected) {
        eject();
      }
    };
  }, [isInjected]);

  const inject = () => {
    setIsInjected(true);
  };

  const eject = () => {
    setIsInjected(false);
  };

  return { isInjected, inject, eject };
};