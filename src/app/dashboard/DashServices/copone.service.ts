import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICopone } from 'src/app/shared/models/copone';

@Injectable({
  providedIn: 'root'
})
export class CoponeService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http :HttpClient) { }

   //////////////////////////////////////////////////
  //********************Course-Category***************************/
  //////////////////////////////////////////////////
  getCopone() {
    return this.http.get<ICopone[]>(this.baseUrl + 'copons');
  }

  addCopone(val: any) {
    return this.http.post(this.baseUrl + 'copons', val);
  }

  editCopone(val: any, catId: number) {
    debugger;
    return this.http.post(this.baseUrl + `copons/${catId}?_method=PUT`, val);
  }

  deleteCopone(id: string) {
    return this.http.delete(this.baseUrl + 'copons/' + id);
  }
}
