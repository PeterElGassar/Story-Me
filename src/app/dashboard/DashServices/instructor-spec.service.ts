import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInstructorSpec } from 'src/app/shared/models/instructorSpec';

@Injectable({
  providedIn: 'root'
})
export class InstructorSpecService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }


  //////////////////////////////////////////////////
  //********************Instructor Specialzation***************************/
  //////////////////////////////////////////////////
  getInstructorSpec() {
    return this.http.get<IInstructorSpec[]>(this.baseUrl + 'lecturers_specialty');
  }

  addInstructorSpec(val: any) {
    return this.http.post(this.baseUrl + 'lecturers_specialty', val);
  }

  editInstructorSpec(val: any, specId: number) {
    debugger;
    return this.http.post(this.baseUrl + `lecturers_specialty/${specId}?_method=PUT`, val);
  }

  deleteInstructorSpec(id: string) {
    return this.http.delete(this.baseUrl + 'lecturers_specialty/' + id);
  }

}
