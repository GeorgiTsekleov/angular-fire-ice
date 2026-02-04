import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthSubmitButton } from './auth-submit-button';

describe('AuthSubmitButton', () => {
  let component: AuthSubmitButton;
  let fixture: ComponentFixture<AuthSubmitButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubmitButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthSubmitButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Log in');
    fixture.componentRef.setInput('loadingLabel', 'Signing in...');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
