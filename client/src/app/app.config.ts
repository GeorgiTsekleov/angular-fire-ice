import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appFeatureReducer } from './core/state/app.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { booksReducer } from './core/state/books/books.reducer';
import { BooksEffects } from './core/state/books/books.effects';
import { favoritesReducer } from './core/state/favorites/favorites.reducer';
import { favoritesEffects } from './core/state/favorites/favorites.effects';
import { authReducer } from './core/state/auth/auth.reducer';
import { AuthEffects } from './core/state/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({
      app: appFeatureReducer,
      books: booksReducer,
      favorites: favoritesReducer,
      auth: authReducer,
    }),
    provideEffects(BooksEffects, favoritesEffects, AuthEffects),
    provideHttpClient(withFetch()),
  ],
};
