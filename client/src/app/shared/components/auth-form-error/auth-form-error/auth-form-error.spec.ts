import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFormError } from './auth-form-error';

describe('AuthFormError', () => {
  let component: AuthFormError;
  let fixture: ComponentFixture<AuthFormError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormError],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
