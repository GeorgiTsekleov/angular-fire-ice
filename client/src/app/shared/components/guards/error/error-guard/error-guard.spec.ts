
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGuard } from './error-guard';

@Component({
  standalone: true,
  imports: [ErrorGuard],
  template:
    '<app-error-guard [errorInput]="errorMessage"><span data-testid="projected">Projected content</span></app-error-guard>',
})
class HostComponent {
  errorMessage: string | null = null;
}

describe('ErrorGuard', () => {
  let component: ErrorGuard;
  let fixture: ComponentFixture<ErrorGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGuard],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when errorInput is set', () => {
    fixture.componentRef.setInput('errorInput', 'Something went wrong');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Error:');
    expect(el.textContent).toContain('Something went wrong');
  });

  it('should not show error when errorInput is null', () => {
    fixture.componentRef.setInput('errorInput', null);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Error:');
  });
});

describe('ErrorGuard (with host)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
  });

  it('when error is set shows error message and hides projected content', () => {
    host.errorMessage = 'Network failure';
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Error:');
    expect(el.textContent).toContain('Network failure');
    expect(el.querySelector('[data-testid="projected"]')).toBeNull();
  });

  it('when error is null shows projected content and hides error message', () => {
    host.errorMessage = null;
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Projected content');
    expect(el.textContent).not.toContain('Error:');
  });

  it('passes children when there is no error', () => {
    host.errorMessage = null;
    fixture.detectChanges();
    const projected = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="projected"]',
    );
    expect(projected).toBeTruthy();
    expect(projected?.textContent).toContain('Projected content');
  });
});
