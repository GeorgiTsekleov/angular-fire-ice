import { createAction, props } from '@ngrx/store';

export const setTitle = createAction('[App] Set Title', props<{ title: string }>());

export const incrementCounter = createAction('[App] Increment Counter');
export const decrementCounter = createAction('[App] Decrement Counter');
export const resetCounter = createAction('[App] Reset Counter');
