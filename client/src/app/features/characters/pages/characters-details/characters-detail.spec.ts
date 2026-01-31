import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersDetail } from './characters-detail';

describe('CharactersDetail', () => {
  let component: CharactersDetail;
  let fixture: ComponentFixture<CharactersDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
