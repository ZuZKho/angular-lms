import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators,  FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { passwordValidator } from 'src/shared/validators/password.validator';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']})
export class AuthenticationComponent {

  constructor(
    private authService: AuthenticationService, 
    private router: Router
  ) 
  {
    if (authService.userInfo) {
      this.router.navigate(['/user']);
    }
  }

  loginOnSubmit: boolean = false;
  registrationOnSubmit: boolean = false;
  onLogin: boolean = true;

  toLogin() {
    this.onLogin = true;
  }

  toRegistration() {
    this.onLogin = false;
  }

// Форма регистрации
  registrationForm = new UntypedFormGroup({
    registrationInputFirstName: new UntypedFormControl(null, [Validators.required]),
    registrationInputLastName: new UntypedFormControl(null, [Validators.required]),
    registrationInputLogin: new UntypedFormControl(null, [Validators.required]),
    registrationInputEmail: new UntypedFormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
    registrationInputPass: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]), // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a  , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!$#_+-])[A-Za-z\\d!$#_+-]{5,}$')]
    registrationInputConfirm: new UntypedFormControl(null),
    registrationInputCheck: new UntypedFormControl(null, [Validators.requiredTrue])
  },
    {
      validators: passwordValidator
    }
  );

  get registrationInputFirstName() { return this.registrationForm.get('registrationInputFirstName'); }
  get registrationInputLastName() { return this.registrationForm.get('registrationInputLastName'); }
  get registrationInputLogin() { return this.registrationForm.get('registrationInputLogin'); }
  get registrationInputEmail() { return this.registrationForm.get('registrationInputEmail'); }
  get registrationInputPass() { return this.registrationForm.get('registrationInputPass'); }
  get registrationInputConfirm() { return this.registrationForm.get('registrationInputConfirm'); }
  get registrationInputCheck() { return this.registrationForm.get('registrationInputCheck'); }

  registrationSubmit() {
    this.registrationOnSubmit = true;
    if (this.registrationForm.invalid) return;

    this.authService.createNewUser(
      this.registrationInputFirstName?.value, 
      this.registrationInputLastName?.value, 
      this.registrationInputLogin?.value, 
      this.registrationInputEmail?.value, 
      this.registrationInputPass?.value);
  }

// Форма входа
  loginForm = new UntypedFormGroup({
    loginInputEmail: new UntypedFormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
    loginInputPass: new UntypedFormControl(null, [Validators.required]),
  });

  get loginInputEmail() { return this.loginForm.get('loginInputEmail'); }
  get loginInputPass() { return this.loginForm.get('loginInputPass'); }
 

  loginSubmit() {
    this.loginOnSubmit = true;
    if (this.loginForm.invalid) return;

    this.authService.signInUser(this.loginInputEmail?.value, this.loginInputPass?.value);
  }

}
