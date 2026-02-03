import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
    title: 'Home of Ice and Fire',
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./features/books/pages/books-list/books-list').then((m) => m.BooksList),
    title: 'Books of Ice and Fire',
  },
  {
    path: 'books/characters',
    loadComponent: () =>
      import('./features/characters/pages/characters-list/characters-list').then(
        (m) => m.CharactersList
      ),
    title: 'Chapters of Ice and Fire',
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./features/books/pages/book-detail/book-detail').then((m) => m.BookDetail),
    title: 'Book Detail of Ice and Fire',
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/pages/favorites-page/favorites-page').then(
        (m) => m.FavoritesPage
      ),
    title: 'Favorites of Ice and Fire',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register-page/register-page').then(
        (m) => m.RegisterPage
      ),
    title: 'Register - Ice and Fire',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login-page/login-page').then((m) => m.LoginPage),
    title: 'Log in - Ice and Fire',
  },
  {
    path: 'books/:id/characters/:characterId',
    loadComponent: () =>
      import('./features/characters/pages/characters-details/characters-detail').then(
        (m) => m.CharactersDetail
      ),
    title: 'Chapter Detail of Ice and Fire',
  },
];
