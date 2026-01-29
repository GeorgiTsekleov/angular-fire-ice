import { signal, Signal } from '@angular/core';
import { AppFacade } from '../services/app.facade';
import { vi } from 'vitest';

export function createMockAppFacade(overrides?: Partial<AppFacade>): AppFacade {
  const defaultTitle = signal('Ice & Fire');
  const defaultCounter = signal(0);

  return {
    title: (overrides?.title as Signal<string>) ?? defaultTitle,
    counter: (overrides?.counter as Signal<number>) ?? defaultCounter,
    setTitle: vi.fn(),
    incrementCounter: vi.fn(),
    decrementCounter: vi.fn(),
    resetCounter: vi.fn(),
    ...overrides,
  } as AppFacade;
}

export function provideMockAppFacade(overrides?: Partial<AppFacade>) {
  return {
    provide: AppFacade,
    useValue: createMockAppFacade(overrides),
  };
}
