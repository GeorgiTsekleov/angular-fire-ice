import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthNavComponent } from './auth-nav';
import { provideMockAuthFacade } from '../../../../core/testing';

describe('AuthNav', () => {
  let component: AuthNavComponent;
  let fixture: ComponentFixture<AuthNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthNavComponent],
      providers: [provideRouter([]), provideMockAuthFacade()],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthNavComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
