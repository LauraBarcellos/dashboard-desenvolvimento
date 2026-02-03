// Mock Data - Auth (Realistic data for development)
import { Credentials, PasswordRecovery } from '../types';

/**
 * Mock Credentials (5 realistic users)
 */
export const MOCK_CREDENTIALS: Credentials[] = [
  {
    id: '1',
    email: 'marco.silva@devio.com.br',
    password: 'hashed_password_1', // In real app, this would be hashed
    isActive: true,
    loginAttempts: 0,
    isFirstAccess: false,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-12-20T15:45:00'),
  },
  {
    id: '2',
    email: 'ana.costa@devio.com.br',
    password: 'hashed_password_2',
    isActive: true,
    loginAttempts: 1,
    isFirstAccess: false,
    createdAt: new Date('2024-02-10T09:00:00'),
    updatedAt: new Date('2024-12-22T11:20:00'),
  },
  {
    id: '3',
    email: 'pedro.santos@devio.com.br',
    password: 'hashed_password_3',
    isActive: true,
    loginAttempts: 0,
    isFirstAccess: true,
    createdAt: new Date('2024-12-01T14:00:00'),
    updatedAt: new Date('2024-12-01T14:00:00'),
  },
  {
    id: '4',
    email: 'julia.oliveira@devio.com.br',
    password: 'hashed_password_4',
    isActive: false,
    loginAttempts: 5,
    isFirstAccess: false,
    createdAt: new Date('2024-03-20T16:30:00'),
    updatedAt: new Date('2024-11-15T10:10:00'),
  },
  {
    id: '5',
    email: 'carlos.mendes@devio.com.br',
    password: 'hashed_password_5',
    isActive: true,
    loginAttempts: 2,
    isFirstAccess: false,
    createdAt: new Date('2024-05-05T11:45:00'),
    updatedAt: new Date('2024-12-18T09:30:00'),
  },
];

/**
 * Mock Password Recovery Requests (5 realistic tokens)
 */
export const MOCK_PASSWORD_RECOVERIES: PasswordRecovery[] = [
  {
    id: '1',
    email: 'marco.silva@devio.com.br',
    token: 'abc123def456ghi789',
    expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    used: false,
    createdAt: new Date('2024-12-23T10:00:00'),
    updatedAt: new Date('2024-12-23T10:00:00'),
  },
  {
    id: '2',
    email: 'ana.costa@devio.com.br',
    token: 'xyz987uvw654rst321',
    expiresAt: new Date('2024-12-22T15:00:00'), // Expired
    used: true,
    createdAt: new Date('2024-12-22T14:00:00'),
    updatedAt: new Date('2024-12-22T14:30:00'),
  },
  {
    id: '3',
    email: 'pedro.santos@devio.com.br',
    token: 'lmn456opq789tuv012',
    expiresAt: new Date(Date.now() + 1800000), // 30 minutes from now
    used: false,
    createdAt: new Date('2024-12-23T11:30:00'),
    updatedAt: new Date('2024-12-23T11:30:00'),
  },
  {
    id: '4',
    email: 'julia.oliveira@devio.com.br',
    token: 'jkl321mno654pqr987',
    expiresAt: new Date('2024-12-20T10:00:00'), // Expired
    used: false,
    createdAt: new Date('2024-12-20T09:00:00'),
    updatedAt: new Date('2024-12-20T09:00:00'),
  },
  {
    id: '5',
    email: 'carlos.mendes@devio.com.br',
    token: 'stu654vwx987yza012',
    expiresAt: new Date(Date.now() + 7200000), // 2 hours from now
    used: false,
    createdAt: new Date('2024-12-23T09:00:00'),
    updatedAt: new Date('2024-12-23T09:00:00'),
  },
];

/**
 * Helper function to find user by email (for mock authentication)
 * PROTOTYPE: Sempre retorna o primeiro usuário se email vazio
 */
export function findUserByEmail(email: string): Credentials | undefined {
  if (!email) {
    return MOCK_CREDENTIALS[0]; // Retorna primeiro usuário se vazio
  }
  return MOCK_CREDENTIALS.find((cred) => cred.email === email) || MOCK_CREDENTIALS[0];
}

/**
 * Helper function to validate password (mock implementation)
 * PROTOTYPE: SEMPRE aceita qualquer senha, inclusive vazia
 */
export function validatePassword(
  email: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password: string
): Credentials | null {
  // PROTOTYPE MODE: Sempre retorna usuário válido, ignorando senha
  const user = findUserByEmail(email);
  return user || MOCK_CREDENTIALS[0]; // Sempre retorna um usuário
}

/**
 * Helper function to find recovery token
 * PROTOTYPE: Aceita qualquer token
 */
export function findRecoveryToken(token: string): PasswordRecovery | undefined {
  if (!token) {
    return MOCK_PASSWORD_RECOVERIES[0]; // Retorna primeiro token se vazio
  }
  return MOCK_PASSWORD_RECOVERIES.find((recovery) => recovery.token === token) || MOCK_PASSWORD_RECOVERIES[0];
}

/**
 * Helper function to validate recovery token
 * PROTOTYPE: SEMPRE retorna true, aceita qualquer token
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateRecoveryToken(token: string): boolean {
  // PROTOTYPE MODE: Sempre válido
  return true;
}
