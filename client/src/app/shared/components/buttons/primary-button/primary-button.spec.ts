import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PrimaryButton } from './primary-button';

describe('PrimaryButton', () => {
  let component: PrimaryButton;
  let fixture: ComponentFixture<PrimaryButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryButton],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryButton);
    fixture.componentRef.setInput('routerLink', '/test');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
