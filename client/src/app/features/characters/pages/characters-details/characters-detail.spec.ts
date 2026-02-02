import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CharacterApiService } from '../../../../core/services/api/character-api.service';
import { CharactersDetail } from './characters-detail';

describe('CharactersDetail', () => {
  let component: CharactersDetail;
  let fixture: ComponentFixture<CharactersDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersDetail],
      providers: [
        provideRouter([]),
        {
          provide: CharacterApiService,
          useValue: { getCharacter: () => of({ url: '', name: '' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
