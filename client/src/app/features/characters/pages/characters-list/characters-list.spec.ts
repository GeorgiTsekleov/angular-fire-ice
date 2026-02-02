import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { provideMockBooksFacade } from '../../../../core/testing';
import { CharacterApiService } from '../../../../core/services/api/character-api.service';
import { CharactersList } from './characters-list';

describe('CharactersList', () => {
  let component: CharactersList;
  let fixture: ComponentFixture<CharactersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersList],
      providers: [
        provideRouter([]),
        provideMockBooksFacade(),
        {
          provide: CharacterApiService,
          useValue: { getCharacter: () => of({ url: '', name: '' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
