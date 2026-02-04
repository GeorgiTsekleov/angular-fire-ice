import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { BookDetail } from './book-detail';
import {
  createMockBookDetailFacade,
  provideMockBookDetailFacade,
  provideMockFavoritesFacade,
} from '../../../../core/testing';
import { Book } from '../../../../core/models/book.model';

const VALID_ID = '1';

const mockBook: Book = {
  url: `https://example.com/books/${VALID_ID}`,
  name: 'A Game of Thrones',
  isbn: '0-553-10354-7',
  authors: ['George R. R. Martin'],
  numberOfPages: 694,
  publisher: 'Bantam Books',
  country: 'United States',
  mediaType: 'Hardcover',
  released: '1996-08-01T00:00:00',
  characters: [],
  povCharacters: [],
};

describe('BookDetail', () => {
  let component: BookDetail;
  let fixture: ComponentFixture<BookDetail>;
  let mockFacade: ReturnType<typeof createMockBookDetailFacade>;

  beforeEach(async () => {
    mockFacade = createMockBookDetailFacade({ book: signal(mockBook), characters: signal([]) });
    await TestBed.configureTestingModule({
      imports: [BookDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'id' ? VALID_ID : null),
            }),
          },
        },
        provideMockBookDetailFacade(mockFacade),
        provideMockFavoritesFacade(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade.load with bookId on init', () => {
    expect(mockFacade.load).toHaveBeenCalledWith(VALID_ID);
  });
});
