import { createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';
import { setTitle, incrementCounter, decrementCounter, resetCounter } from './app.actions';

export const appFeatureReducer = createReducer(
  initialState,
  on(setTitle, (state, { title }) => ({
    ...state,
    title,
  })),
  on(incrementCounter, (state) => ({
    ...state,
    counter: state.counter + 1,
  })),
  on(decrementCounter, (state) => ({
    ...state,
    counter: state.counter - 1,
  })),
  on(resetCounter, (state) => ({
    ...state,
    counter: 0,
  })),
);
