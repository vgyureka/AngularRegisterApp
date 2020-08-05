import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ReadKeyExpr } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  constructor(public service: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {}
  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.fomModel.reset();
          this.toastr.success('New user created', 'Registration');
        } else {
          this.toastr.error('error', 'Registration');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
