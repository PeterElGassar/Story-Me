import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../shared/models/User';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  private currentUserSourse = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSourse.asObservable();

  //for Date Of Subscriptions
  private dateNow = new BehaviorSubject<any>(null);
  Now$ = this.dateNow.asObservable();
  //////
  private exDate = new BehaviorSubject<any>(null);
  ExpireDate$ = this.exDate.asObservable();
  dateObj = new Date();
  
  getDateOfNow(){
  let X2 = this.datePipe.transform(this.dateObj,"yyyy-MM-dd");
  this.dateNow.next(X2)
  }

  //properties
  getCurrentUserValue() {
    return this.currentUserSourse.value;
  }

  constructor(private http: HttpClient, private router: Router,private datePipe: DatePipe) {}

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // headers = headers.set('Authorization', 'Bearer ' + token);

    let x = { Authorization: `Bearer ${token}` };

    return this.http.post(this.baseUrl + `me/${token}`,null,{headers}).pipe(
        map((user: any) => {
          if (user && user !== null) {
            this.getDateOfNow();
            this.exDate.next(user.expire)
            // localStorage.setItem('token', user.token);
            this.currentUserSourse.next(user);
            console.log(user);
          }
        })
      );
  }

  CerateNewAccount(val: any) {
    return this.http.post(this.baseUrl + `register`, val).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSourse.next(user);
        }
      })
    );
  }

  //1
  Login(val: any) {
    return this.http.post(this.baseUrl + `login`, val).pipe(
      map((user: any) => {

        if (user) {
          localStorage.setItem('token', user.token.access_token);
          this.currentUserSourse.next(user);
          console.log(user);
        }
      })
    );
  }

  //2
  //في حالة ان الحساب كان الي طالب لا يحتاج الي عمل تسجيل الدخول بعد إنشاء الحساب
  //ويقوم مباشرة بتسجيل token
  CerateNewAccountStudent(val: any) {
    return this.http.post(this.baseUrl + `student`, val).pipe(
      map((user: any) => {
        if (user) {
          console.log(user);
          localStorage.setItem('token', user.token);
          this.currentUserSourse.next(user.user);
        }
      })
    );
  }

  Logout() {
    this.router.navigate(['/']);

    localStorage.removeItem('token');
    this.currentUserSourse.next(null);  
    this.router.navigate(['/']);
    this.router.navigateByUrl['/'];
  }

  checkEmailExist(email: string) {
    return this.http.get(this.baseUrl + `register/${email}`);
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls['password'];
      const confirmPasswordControl = formGroup.controls['confirmPassword'];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return true;
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  checkIfUserSubscriptionEnded(exDate:any ,dateOfNow:any):boolean{
     debugger;
    // Check if the dateOfNow is greater than exDate meaning subscribe is ended
       if (dateOfNow < exDate)
       {
        console.log("الاشتراك خلص")
         return true      
      }
       else
       {
        console.log("الاشتراك مخلصش")
        return false
      
      }
    // Check if the dateOfNow is greater than exDate meaning subscribe is ended
  }
}
