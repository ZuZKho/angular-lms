import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators,  FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { passwordValidator } from 'src/shared/validators/password.validator';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  constructor(
    private firebaseAuth: AuthenticationService, 
    private router: Router
  ) 
  {
    if (firebaseAuth.user) {
      this.router.navigate(['/user']);
    }
  }

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
    registrationInputEmail: new UntypedFormControl(null, [Validators.required, Validators.email]),
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
    if (this.registrationForm.invalid) return;

    this.firebaseAuth.createNewUser(
      this.registrationInputFirstName?.value, 
      this.registrationInputLastName?.value, 
      this.registrationInputLogin?.value, 
      this.registrationInputEmail?.value, 
      this.registrationInputPass?.value).subscribe((message) => {
        if (message === 'OK') {
          this.onLogin = !this.onLogin;
          this.registrationForm.reset();
        } else {
          alert(message);
        } 
      });
  }
// Форма входа
  loginForm = new UntypedFormGroup({
    loginInputEmail: new UntypedFormControl(null, [Validators.required]),
    loginInputPass: new UntypedFormControl(null, [Validators.required]),
  });

  get loginInputEmail() { return this.loginForm.get('loginInputEmail'); }
  get loginInputPass() { return this.loginForm.get('loginInputPass'); }
 

  loginSubmit() {
    if (this.loginForm.invalid) return;

    this.firebaseAuth.signInUser(this.loginInputEmail?.value, this.loginInputPass?.value).subscribe((message) => {
      if (message === 'OK') {
        this.loginForm.reset();
      } else {
        alert(message);
      }
    });
  }

}
