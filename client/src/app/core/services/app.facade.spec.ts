import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppFacade } from './app.facade';
import * as AppActions from '../state/app.actions';
import { selectCounter, selectTitle } from '../state/app.selectors';
import { signal } from '@angular/core';
import { vi } from 'vitest';

describe('AppFacade', () => {
  let facade: AppFacade;
  let mockSelectSignal: ReturnType<typeof vi.fn>;
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const mockTitleSignal = signal('Test Title');
    const mockCounterSignal = signal(5);

    mockSelectSignal = vi.fn((selector) => {
      if (selector === selectTitle) {
        return mockTitleSignal;
      }
      if (selector === selectCounter) {
        return mockCounterSignal;
      }
      return signal(null);
    });

    mockDispatch = vi.fn();

    const mockStore = {
      selectSignal: mockSelectSignal,
      dispatch: mockDispatch,
      select: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppFacade,
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    });

    facade = TestBed.inject(AppFacade);
  });

  describe('State Selectors', () => {
    it('should expose title signal', () => {
      expect(facade.title).toBeDefined();
      expect(facade.title()).toBe('Test Title');
      expect(mockSelectSignal).toHaveBeenCalledWith(selectTitle);
    });

    it('should expose counter signal', () => {
      expect(facade.counter).toBeDefined();
      expect(facade.counter()).toBe(5);
      expect(mockSelectSignal).toHaveBeenCalledWith(selectCounter);
    });
  });

  describe('Actions', () => {
    it('should dispatch setTitle action', () => {
      const newTitle = 'New Title';
      facade.setTitle(newTitle);

      expect(mockDispatch).toHaveBeenCalledWith(AppActions.setTitle({ title: newTitle }));
    });

    it('should dispatch incrementCounter action', () => {
      facade.incrementCounter();

      expect(mockDispatch).toHaveBeenCalledWith(AppActions.incrementCounter());
    });

    it('should dispatch decrementCounter action', () => {
      facade.decrementCounter();

      expect(mockDispatch).toHaveBeenCalledWith(AppActions.decrementCounter());
    });

    it('should dispatch resetCounter action', () => {
      facade.resetCounter();

      expect(mockDispatch).toHaveBeenCalledWith(AppActions.resetCounter());
    });
  });
});
