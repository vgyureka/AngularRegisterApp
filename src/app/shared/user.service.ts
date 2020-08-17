import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  readonly BaseURI = 'http://localhost:51763/api';

  formModel = this.fb.group({
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

  // tslint:disable-next-line:typedef
  comparePasswords(group: FormGroup) {
    // CUSTOM VALIDATOR - notSame
    const confirmPwdCtrl = group.get('ConfirmPassword');
    const pass = group.get('Password').value;
    const confirmPass = group.get('ConfirmPassword').value;
    return pass === confirmPass
      ? confirmPwdCtrl.setErrors(null)
      : confirmPwdCtrl.setErrors({ notSame: true });
  }
  // tslint:disable-next-line:typedef
  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
  Login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }
  getUserProfile() {
    // const token = localStorage.getItem('token');
    // const tokenHeader = new HttpHeaders({ Authorization: 'Bearer ' + token });
    // return this.http.get(this.BaseURI + '/UserProfile', {
    //   headers: tokenHeader
    // });
    return this.http.get(this.BaseURI + '/UserProfile');
  }
}
