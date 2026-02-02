import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLibraryApiService } from '../../../../core/services/api/book-cover-api.service';
import { BookCover } from './book-cover';

describe('BookCover', () => {
  let component: BookCover;
  let fixture: ComponentFixture<BookCover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCover],
      providers: [
        {
          provide: OpenLibraryApiService,
          useValue: { getCoverUrl: () => 'https://covers.openlibrary.org/b/isbn/0-L.jpg' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCover);
    fixture.componentRef.setInput('isbn', '0-00-000000-0');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
