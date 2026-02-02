import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { WikipediaApiService } from '../../../../core/services/api/wikipedia-api.service';
import { CharactersCard } from './characters-card';

describe('CharactersCard', () => {
  let component: CharactersCard;
  let fixture: ComponentFixture<CharactersCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersCard],
      providers: [
        provideRouter([]),
        {
          provide: WikipediaApiService,
          useValue: { getSummary: () => of(null) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersCard);
    fixture.componentRef.setInput('characterName', 'Test');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
