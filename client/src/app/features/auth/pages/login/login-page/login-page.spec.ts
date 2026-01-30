import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginPage } from './login-page';
import { provideMockAuthFacade } from '../../../../../core/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([]), provideMockAuthFacade()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
