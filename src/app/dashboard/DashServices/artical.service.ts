import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArtical } from 'src/app/shared/models/artical';

@Injectable({
  providedIn: 'root',
})
export class ArticalService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) {}

  //////////////////////////////////////////////////
  //********************  Artical ***************************/
  //////////////////////////////////////////////////
  getArticals() {
    return this.http.get<IArtical[]>(this.baseUrl + 'article');
  }

  addArtical(val: any) {
    return this.http.post(this.baseUrl + 'article', val);
  }

  editArtical(val: any,atricalId:number) {
    return this.http.post(this.baseUrl + `article/${atricalId}?_method=PUT`, val);
  }

  deleteArtical(id: string) {
    return this.http.delete(this.baseUrl + 'article/' + id);
  }
  

  getSingleArtical(id: number) {
    return this.http.get<IArtical>(this.baseUrl + `article/show/${id}`);
  }
}
