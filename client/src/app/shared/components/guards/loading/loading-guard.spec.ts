import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGuard } from './loading-guard';

describe('LoadingGuard', () => {
  let component: LoadingGuard;
  let fixture: ComponentFixture<LoadingGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingGuard],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingGuard);
    fixture.componentRef.setInput('loadingInput', false);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
