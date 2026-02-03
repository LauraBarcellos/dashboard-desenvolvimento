// Auth Types - Login & Password Recovery
// Generated from specs: 01-login, 02-recuperacao-senha

/**
 * Login Credentials Entity
 */
export interface Credentials {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  loginAttempts: number;
  isFirstAccess: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Password Recovery Entity
 */
export interface PasswordRecovery {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Login Form Data (subset of Credentials)
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Password Recovery Request Form Data
 */
export interface PasswordRecoveryRequestData {
  email: string;
}

/**
 * Password Reset Form Data (with token)
 */
export interface PasswordResetFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Auth Response (for Server Actions)
 */
export interface AuthResponse {
  success: boolean;
  data?: {
    user?: Partial<Credentials>;
    token?: string;
    message?: string;
  };
  error?: string;
  fieldErrors?: {
    [key: string]: string[];
  };
}

/**
 * Password Recovery Response
 */
export interface PasswordRecoveryResponse {
  success: boolean;
  data?: {
    message: string;
    expiresAt?: Date;
  };
  error?: string;
  fieldErrors?: {
    [key: string]: string[];
  };
}

/**
 * Current logged-in user (simplified)
 */
export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}
