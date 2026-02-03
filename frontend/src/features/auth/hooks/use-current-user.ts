'use client';

import { useMemo } from 'react';
import type { CurrentUser } from '../types';

/**
 * Hook to get current logged-in user
 * PROTOTYPE MODE: Always returns user-1 (João Silva)
 *
 * In production, this would:
 * - Read from session/cookie
 * - Call auth API
 * - Handle loading/error states
 */
export function useCurrentUser(): CurrentUser {
  const currentUser = useMemo<CurrentUser>(() => {
    // PROTOTYPE: Always return user-1
    // In production, this would come from session/context/API
    return {
      id: 'user-1',
      email: 'joao.silva@devio.com.br',
      name: 'João Silva',
      isActive: true,
    };
  }, []);

  return currentUser;
}
