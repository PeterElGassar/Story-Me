import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from '../auth.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showInvalidMessage: boolean = false;
  returnUrl: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get formStatus() {
    return this.loginForm.valid;
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private userServe: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    console.log(this.formStatus);
  }

  submitForm(): void {
    debugger;
    this.userServe.Login(this.loginForm.getRawValue()).subscribe(
      () => {
        debugger;
        console.log('User logged in');
        this.router.navigateByUrl(this.returnUrl);
      },
      (error: any) => {
        debugger;
        if (error.status === 401) {
          debugger;

          alert('حسابك لم يتم تفعيه بعد');
        } else {
          debugger;

          console.log(error);
          this.showInvalidMessage = true;
        }
      }
    );
  }
  
}
