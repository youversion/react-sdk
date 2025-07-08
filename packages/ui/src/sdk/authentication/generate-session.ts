export const generateSession = (): string => {
  // Use crypto.randomUUID() for cryptographically secure session generation
  // Falls back to crypto.getRandomValues() if randomUUID is not available
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // Generate 16 random bytes and convert to hex string
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  // Fallback for environments without crypto API (should be rare in modern browsers)
  console.warn("Using insecure session generation - crypto API not available");
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
