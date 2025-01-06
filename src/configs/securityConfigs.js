/**
 * Security levels for code injection
 * @enum {string}
 */
export const SecurityLevels = {
  STRICT: "STRICT",
  MODERATE: "MODERATE",
  MINIMAL: "MINIMAL",
  NONE: "NONE",
};

/**
 * Get security configuration based on the provided level
 * @param {string} level - The security level
 * @returns {object} The security configuration
 */
export const getSecurityConfig = (level) => {
  switch (level) {
    case SecurityLevels.STRICT:
      return {
        FORBID_SCRIPTS: true,
        FORBID_EVAL: true,
        ALLOWED_TAGS: ["div", "span", "p", "a", "img"],
        ALLOWED_ATTR: ["href", "src", "alt", "class", "id"],
      };
    case SecurityLevels.MODERATE:
      return {
        FORBID_EVAL: true,
        ALLOWED_TAGS: ["div", "span", "p", "a", "img"],
        ALLOWED_ATTR: ["href", "src", "alt", "class", "id", "type"],
      };
    case SecurityLevels.MINIMAL:
      return {
        ALLOWED_TAGS: "*",
        ALLOWED_ATTR: "*",
        FORBID_EVAL: false,
      };
    case SecurityLevels.NONE:
      return {
        USE_PROFILES: { html: true },
        ADD_TAGS: ["*"],
        ADD_ATTR: ["*"],
        FORBID_TAGS: [],
        FORBID_ATTR: [],
      };
    default:
      return {};
  }
};
