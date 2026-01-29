import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGuard } from './error-guard';

describe('ErrorGuard', () => {
  let component: ErrorGuard;
  let fixture: ComponentFixture<ErrorGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorGuard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
