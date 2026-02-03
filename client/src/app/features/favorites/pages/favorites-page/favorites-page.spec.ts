import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideMockBooksFacade, provideMockFavoritesFacade } from '../../../../core/testing';
import { FavoritesPage } from './favorites-page';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPage],
      providers: [provideRouter([]), provideMockBooksFacade(), provideMockFavoritesFacade()],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
