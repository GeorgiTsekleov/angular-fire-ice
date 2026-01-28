import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppFeatureState } from '../models';

export const selectAppFeature = createFeatureSelector<AppFeatureState>('app');

export const selectTitle = createSelector(selectAppFeature, (state) => state.title);

export const selectCounter = createSelector(selectAppFeature, (state) => state.counter);
