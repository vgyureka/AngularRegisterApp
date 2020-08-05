import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  fomModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });

  comparePasswords(group: FormGroup) {
    // CUSTOM VALIDATOR - notSame
    const confirmPwdCtrl = group.get('ConfirmPassword');
    const pass = group.get('Password').value;
    const confirmPass = group.get('ConfirmPassword').value;
    return pass === confirmPass
      ? confirmPwdCtrl.setErrors(null)
      : confirmPwdCtrl.setErrors({ notSame: true });
  }
  register() {
    var body = {
      UserName: this.fomModel.value.UserName,
      Email: this.fomModel.value.Email,
      FullName: this.fomModel.value.FullName,
      Password: this.fomModel.value.Passwords.Password,
    };
    return this.http.post('http://localhost:51763/api/ApplicationUser/Register', body);
  }
}
