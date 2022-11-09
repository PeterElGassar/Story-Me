import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IContactUs } from '../shared/models/contact-us';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';
  
  // readonly baseUrl: string = 'http://127.0.0.1:8000/api/';
  //  readonly ImageUrl = "http://psychiatry.ajathy.com/public/uploads/sections_Coursess/"

  constructor(private http: HttpClient) {}

  

  totalAmountStudent() {
    return this.http.get<IContactUs>(this.baseUrl + 'totalAmountStudent');
  }

  totalAmount() {
    return this.http.get<IContactUs>(this.baseUrl + 'totalAmount');
  }


  totalAmount2(val: any) {
     this.http.get<IContactUs>(this.baseUrl + 'totalAmount').pipe(
      map((user: any) => {

        if (user) {
          return user.totalAmount
        }
      })
    );
  }
    //////////////////////////////////////////////////
  //********************Contact us***************************/
  //////////////////////////////////////////////////
  getSingleContactUs() {
    return this.http.get<IContactUs>(this.baseUrl + 'contact/show/1');
  }

  editContactUs(val: any) {
    debugger;
     return this.http.post(this.baseUrl + `contact/1?_method=PUT`, val);
   }
   
}
