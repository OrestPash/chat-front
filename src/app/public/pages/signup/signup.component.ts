import { SignUpModel } from './../../../core/auth/auth.model';
import { AuthService } from './../../../core/auth/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm: FormGroup;

  constructor(private _router: Router,
              private _auth: AuthService) {
    this.signupForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  get formControls(): any {
    return this.signupForm.controls;
  }

  public signup(): void {
    if (!this.signupForm.invalid) {
      this._auth.signUp(new SignUpModel(this.signupForm.value))
        .subscribe({
          next: () => {
            this._router.navigate(['/login']);
            alert('User successfully added. Use your credentials to login');
          }
        });
    } else {
      this.validateForm();
    }
  }

  public validateForm(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      this.signupForm.controls[key].markAsTouched();
    });
  }
}
