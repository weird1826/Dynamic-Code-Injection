// code-injector-lib/src/components/CodeInjector.jsx

import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCodeInjection } from "../hooks/useCodeInjection";
import DOMPurify from "dompurify";
import { getSecurityConfig, SecurityLevels } from "../configs/securityConfigs";

export const CodeInjector = ({
  codeId,
  enabled,
  onFetch,
  onError,
  loadingComponent,
  errorComponent,
  securityLevel,
  customSecurityConfig,
}) => {
  const containerRef = useRef(null);
  const { isInjected, inject, eject } = useCodeInjection();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const injectCode = async () => {
      setIsLoading(true);
      if (enabled && containerRef.current && !isInjected) {
        try {
          const code = await onFetch(codeId);
          const sanitizedCode = customSecurityConfig
            ? DOMPurify.sanitize(code, customSecurityConfig)
            : DOMPurify.sanitize(code, getSecurityConfig(securityLevel));
          containerRef.current.innerHTML = sanitizedCode;
          inject(codeId);
        } catch (error) {
          setError(error);
          onError?.(error);
          // console.error("Error fetching code:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (!enabled && isInjected) {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        eject();
      }
    };

    injectCode();
  }, [
    enabled,
    codeId,
    isInjected,
    inject,
    eject,
    onFetch,
    securityLevel,
    customSecurityConfig,
  ]);

  if (error) {
    return (
      <div className="error-container">{errorComponent || error.message}</div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-code-block">
        {loadingComponent || "Loading..."}
      </div>
    );
  }
  return <div ref={containerRef} />;
};

CodeInjector.propTypes = {
  codeId: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onFetch: PropTypes.func.isRequired,
  onError: PropTypes.func,
  loadingComponent: PropTypes.element,
  errorComponent: PropTypes.element,
  securityLevel: PropTypes.oneOf(Object.values(SecurityLevels)),
  customSecurityConfig: PropTypes.object,
};

CodeInjector.defaultProps = {
  onError: undefined,
  loadingComponent: <div>Loading...</div>,
  errorComponent: <div>Error loading code</div>,
  securityLevel: SecurityLevels.STRICT,
  customSecurityConfig: null,
};
