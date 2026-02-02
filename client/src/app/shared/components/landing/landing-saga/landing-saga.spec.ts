import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideMockBooksFacade } from '../../../../core/testing';
import { LandingSaga } from './landing-saga';

describe('LandingSaga', () => {
  let component: LandingSaga;
  let fixture: ComponentFixture<LandingSaga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingSaga],
      providers: [provideRouter([]), provideMockBooksFacade()],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingSaga);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
