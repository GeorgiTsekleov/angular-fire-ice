import { signal, type Signal } from '@angular/core';
import { AuthFacade } from '../services/auth/auth.facade';
import { vi } from 'vitest';

export function createMockAuthFacade(overrides?: Partial<AuthFacade>): AuthFacade {
  const user = overrides?.user ?? signal(null);
  const status = overrides?.status ?? signal('idle');
  const error = overrides?.error ?? signal(null);

  return {
    user,
    status,
    error,
    register: vi.fn(),
    checkAuth: vi.fn(),
    ...overrides,
  } as AuthFacade;
}

export function provideMockAuthFacade(overrides?: Partial<AuthFacade>) {
  return {
    provide: AuthFacade,
    useValue: createMockAuthFacade(overrides),
  };
}
