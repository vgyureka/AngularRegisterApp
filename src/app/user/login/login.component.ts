import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  formModel = {
    UserName: '',
    Password: '',
  };

  ngOnInit(): void {
    if ((localStorage.getItem('token') != null)) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit(form: NgForm) {
    const a = form.value.UserName;
    const c = form.value.Password;
    this.service.Login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      (err) => {
        if (err.status === 400) {
          this.toastr.error(err.message, 'Authentication failed');
        } else {
          console.log(err);
        }
      }
    );
  }
}
