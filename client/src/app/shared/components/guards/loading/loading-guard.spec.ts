import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGuard } from './loading-guard';

@Component({
  standalone: true,
  imports: [LoadingGuard],
  template:
    '<app-loading-guard [loadingInput]="isLoading"><span data-testid="projected">Projected content</span></app-loading-guard>',
})
class HostComponent {
  isLoading = false;
}

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

  it('should show loading message when loadingInput is true', () => {
    fixture.componentRef.setInput('loadingInput', true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Loading...');
    expect(el.querySelector('[data-testid="projected"]')).toBeNull();
  });

  it('should show projected content when loadingInput is false', () => {
    fixture.componentRef.setInput('loadingInput', false);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Loading...');
    expect(el.textContent?.trim()).toBe('');
  });
});

describe('LoadingGuard (with host)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
  });

  it('when loading is true shows loading message and hides projected content', () => {
    host.isLoading = true;
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Loading...');
    expect(el.querySelector('[data-testid="projected"]')).toBeNull();
  });

  it('when loading is false shows projected content and hides loading message', () => {
    host.isLoading = false;
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Projected content');
    expect(el.textContent).not.toContain('Loading...');
  });

  it('passes children when there is no loading', () => {
    host.isLoading = false;
    fixture.detectChanges();
    const projected = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="projected"]',
    );
    expect(projected).toBeTruthy();
    expect(projected?.textContent).toContain('Projected content');
  });
});
