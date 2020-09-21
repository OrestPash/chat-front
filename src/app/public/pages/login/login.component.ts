import { LogInModel } from './../../../core/auth/auth.model';
import { AuthService } from './../../../core/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private _router: Router,
              private _auth: AuthService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(8)]),
    });
  }

  get formControls(): any {
    return this.loginForm.controls;
  }

  public login(): void {
    if (!this.loginForm.invalid) {
      this._auth.login(new LogInModel(this.loginForm.value)).subscribe(
        () => this._router.navigate(['/chat'])
      );
    } else {
      this.validateForm();
    }
  }

  public validateForm(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.controls[key].markAsTouched();
    });
  }
}
