import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthFormField } from './auth-form-field';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, AuthFormField],
  template: `
    <form [formGroup]="form">
      <app-auth-form-field
        label="Email"
        controlName="email"
        [control]="$any(form.controls['email'])"
        errorMessage="Valid email is required"
      />
    </form>
  `,
})
class TestHost {
  form = new FormGroup({ email: new FormControl('') });
}

describe('AuthFormField', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
