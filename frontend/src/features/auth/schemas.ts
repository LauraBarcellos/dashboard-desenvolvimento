// Zod Validation Schemas - Auth (PROTOTYPE MODE - NO VALIDATIONS)
import { z } from 'zod';

/**
 * Login Form Schema - PROTOTYPE: Aceita qualquer valor, inclusive vazio
 */
export const loginFormSchema = z.object({
  email: z.string().min(0),
  password: z.string().min(0),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * Password Recovery Request Schema - PROTOTYPE: Aceita qualquer email
 */
export const passwordRecoveryRequestSchema = z.object({
  email: z.string().min(0),
});

export type PasswordRecoveryRequestData = z.infer<
  typeof passwordRecoveryRequestSchema
>;

/**
 * Password Reset Schema - PROTOTYPE: Aceita qualquer senha, sem confirmação
 */
export const passwordResetSchema = z.object({
  token: z.string().min(0),
  password: z.string().min(0),
  confirmPassword: z.string().min(0),
});

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
