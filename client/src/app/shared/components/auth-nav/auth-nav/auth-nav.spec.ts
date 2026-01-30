import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthNavComponent } from './auth-nav';

describe('AuthNav', () => {
  let component: AuthNavComponent;
  let fixture: ComponentFixture<AuthNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthNavComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
