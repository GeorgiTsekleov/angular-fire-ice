import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFooterLink } from './auth-footer-link';

describe('AuthFooterLink', () => {
  let component: AuthFooterLink;
  let fixture: ComponentFixture<AuthFooterLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFooterLink, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFooterLink);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', "Don't have an account?");
    fixture.componentRef.setInput('linkText', 'Register');
    fixture.componentRef.setInput('link', '/register');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
