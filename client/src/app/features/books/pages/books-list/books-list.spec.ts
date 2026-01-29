import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksList } from './books-list';
import { provideMockBooksFacade, provideMockFavoritesFacade } from '../../../../core/testing';

describe('BooksList', () => {
  let component: BooksList;
  let fixture: ComponentFixture<BooksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksList],
      providers: [provideMockBooksFacade(), provideMockFavoritesFacade()],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
