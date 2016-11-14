export class AuthError extends Error { }

/**
 * Raised when no authentication information is found. E.g., user must login.
 */
export class AuthNotFoundError extends AuthError { }
