import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LandingCharacters } from './landing-characters';

describe('LandingCharacters', () => {
  let component: LandingCharacters;
  let fixture: ComponentFixture<LandingCharacters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCharacters],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingCharacters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
