import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { CharacterDetailFacade } from '../../../../core/services/character-detail.facade';
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
          provide: CharacterDetailFacade,
          useValue: {
            load: () => {},
            character: signal(null),
            books: signal([]),
            loading: signal(false),
            error: signal(null),
            getCharacterDisplayName: () => '',
            getMetaRows: () => [],
            getBookId: () => '',
          },
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
