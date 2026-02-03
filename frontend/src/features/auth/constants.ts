// Auth Constants - PROTOTYPE MODE (Limites desabilitados)

/**
 * Maximum login attempts before account lock
 * PROTOTYPE: Definido como 999999 para nunca bloquear
 */
export const MAX_LOGIN_ATTEMPTS = 999999;

/**
 * Password recovery token expiration time (in hours)
 * PROTOTYPE: Definido como 999999 para nunca expirar
 */
export const TOKEN_EXPIRATION_HOURS = 999999;

/**
 * Password requirements
 * PROTOTYPE: Todos os requisitos desabilitados
 */
export const PASSWORD_REQUIREMENTS = {
  minLength: 0,
  maxLength: 999999,
  requireUppercase: false,
  requireLowercase: false,
  requireNumbers: false,
  requireSpecialChars: false,
} as const;

/**
 * Email validation pattern
 * PROTOTYPE: Regex que aceita qualquer string
 */
export const EMAIL_PATTERN = /.*/;

/**
 * Auth error messages
 */
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'E-mail ou senha inválidos',
  ACCOUNT_LOCKED: 'Conta bloqueada por excesso de tentativas. Entre em contato com o administrador.',
  ACCOUNT_INACTIVE: 'Conta inativa. Entre em contato com o administrador.',
  INVALID_TOKEN: 'Token inválido ou expirado',
  TOKEN_EXPIRED: 'O link de recuperação expirou. Solicite um novo.',
  TOKEN_ALREADY_USED: 'Este link já foi utilizado. Solicite um novo se necessário.',
  EMAIL_NOT_FOUND: 'E-mail não encontrado no sistema',
  PASSWORD_MISMATCH: 'As senhas não coincidem',
  WEAK_PASSWORD: 'A senha não atende aos requisitos de segurança',
} as const;

/**
 * Auth success messages
 */
export const AUTH_SUCCESS = {
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  RECOVERY_EMAIL_SENT: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.',
  PASSWORD_RESET_SUCCESS: 'Senha redefinida com sucesso! Faça login com sua nova senha.',
  FIRST_ACCESS_DETECTED: 'Primeiro acesso detectado. Por favor, altere sua senha.',
} as const;

/**
 * Account status colors (using semantic tokens)
 */
export const ACCOUNT_STATUS_COLORS: Record<string, string> = {
  active: 'text-success',
  inactive: 'text-destructive',
  locked: 'text-warning',
} as const;

/**
 * Account status labels
 */
export const ACCOUNT_STATUS_LABELS: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  locked: 'Bloqueado',
} as const;
