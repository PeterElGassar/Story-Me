import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/shared/models/Course';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { IInstructor } from 'src/app/shared/models/instructor';

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }


  //////////////////////////////////////////////////
  //********************Course-Category***************************/
  //////////////////////////////////////////////////
  getDeploma() {
    debugger
    return this.http.get<IDiploma[]>(this.baseUrl + 'diploma');
  }

  getBestSellerDeploma() {
    debugger
    return this.http.get<IDiploma[]>(this.baseUrl + 'getBestSellerOfDiploma');
  }

  addDeploma(val: any) {
    return this.http.post(this.baseUrl + 'diploma', val);
  }

  editDeploma(val: any, catId: number) {
    debugger;
    return this.http.post(this.baseUrl + `diploma/${catId}?_method=PUT`, val);
  }

  deleteDeploma(id: string) {
    return this.http.delete(this.baseUrl + 'diploma/' + id);
  }


  //for fill dropdown
  getAllCourses() {
    return this.http.get<any>(this.baseUrl + 'courses');
  };

  getAllInstructor() {
    return this.http.get<IInstructor[]>(this.baseUrl + 'courses/instructor');
  };


  //for mark dropdown
  getDiplomaCourses(id: string) {
    return this.http.get<ICourse[]>(this.baseUrl + `diplomaCourses/${id}`);
  };

  getDiplomaInstructor(id: string) {
    debugger;
    return this.http.get<IInstructor[]>(this.baseUrl + `diplomaInstructor/${id}`);
  };

  getSingleDiploma(id: number) {
    return this.http.get<ICourse>(this.baseUrl + `diploma/show/${id}`);
  }

  getBestSellerOfDiploma() {
    return this.http.get(this.baseUrl + `getBestSellerOfDiploma`);
  }
  
  getLessSellerOfDiploma() {
    return this.http.get(this.baseUrl + `getLessSellerOfDiploma`);
  }
  getSellerOfDiplomaDetails(diplomaId:number) {
    return this.http.get<ICourse[]>(this.baseUrl + `getSellerOfDiplomaDetails/${diplomaId}`);
  }



}
