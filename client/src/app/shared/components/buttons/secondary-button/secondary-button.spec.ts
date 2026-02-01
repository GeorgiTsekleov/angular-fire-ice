import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SecondaryButton } from './secondary-button';

describe('SecondaryButton', () => {
  let component: SecondaryButton;
  let fixture: ComponentFixture<SecondaryButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryButton],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryButton);
    fixture.componentRef.setInput('routerLink', '/test');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
