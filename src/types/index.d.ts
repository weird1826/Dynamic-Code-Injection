import { Config as DOMPurifyConfig } from "dompurify";

export type SecurityLevel = "STRICT" | "MODERATE" | "MINIMAL" | "NONE";

interface CodeInjectorProps {
  codeId: string;
  enabled: boolean;
  onFetch: (codeId: string) => Promise<string>;
  onError?: (error: Error) => void;
  loadingComponent?: React.ReactElement;
  errorComponent?: React.ReactElement;
  securityLevel?: SecurityLevel;
  customSecurityConfig?: DOMPurifyConfig;
}

interface InjectionHookResult {
  isInjected: boolean;
  isInjectionTarget: string | null;
  inject: (targetId: string) => void;
  eject: () => void;
}

export interface SecurityConfig extends DOMPurifyConfig {
  FORBID_SCRIPTS?: boolean;
  FORBID_EVAL?: boolean;
  FORBID_TAGS?: string[];
  FORBID_ATTR?: string[];
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  USE_PROFILES?: { html: boolean };
  ADD_TAGS?: string[];
  ADD_ATTR?: string[];
  FORBID_TAGS?: string[];
  FORBID_ATTR?: string[];
}
