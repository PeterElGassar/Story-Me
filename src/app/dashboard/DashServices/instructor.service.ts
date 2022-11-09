import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/shared/models/Course';
import { IInstructor } from 'src/app/shared/models/instructor';
import { IInstructorSpec } from 'src/app/shared/models/instructorSpec';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }
  //////////////////////////////////////////////////
  //********************Instructor***************************/
  //////////////////////////////////////////////////
  getInstructors() {
    return this.http.get<IInstructor[]>(this.baseUrl + 'instractor');
  }
  
  getBestSellerOfInstructorCourses() {
    return this.http.get<any>(this.baseUrl + 'getBestSellerOfInstructorCourses');
  }

  getLessSellerOfInstructorCourses() {
    return this.http.get<any>(this.baseUrl + 'getLessSellerOfInstructorCourses');
  }

  getِِApprovedInstructors() {
    return this.http.get<IInstructor[]>(this.baseUrl + 'approved');
  }

  getRejectedInstructors() {
    return this.http.get<IInstructor[]>(this.baseUrl + 'NotApproved');
  }

 InstructorRejectedApproved(val:any,instructorId:number) {
   debugger
    return this.http.post(this.baseUrl + `approved/${instructorId}?_method=PUT`,val);
  }

  addInstructor(val: any) {
    return this.http.post(this.baseUrl + 'instractor', val);
  }

  editInstructor(val: any, instructorId: number) {
    debugger;
    return this.http.post(this.baseUrl + `instractor/${instructorId}?_method=PUT`, val);
  }

  deleteInstructor(id: string) {
    return this.http.delete(this.baseUrl + 'instractor/' + id);
  }

  getInstructorSpec() {
    return this.http.get<IInstructorSpec[]>(this.baseUrl + 'lecturers_specialty');
  }


  getInstructorCourses(instructorId:number) {
    return this.http.get<ICourse[]>(this.baseUrl + `InstructorCourses/${instructorId}`);
  }
  showInstructorCoursesById(instructorId:number) {
    return this.http.get<ICourse[]>(this.baseUrl + `showInstructorCoursesById/${instructorId}`);
  }

  getSengilInstructor(instructorId:number) {
    return this.http.get<IInstructor>(this.baseUrl + `instractor/show/${instructorId}`);
  }

  getInstructorCoursesFrontById(instructorId:number) {
    return this.http.get<IInstructor>(this.baseUrl + `getInstructorCoursesFrontById/${instructorId}`);
  }
  updateSectionTitle(sectionId:number,val:any) {
    return this.http.post<IInstructor>(this.baseUrl + `updateSectionTitle/${sectionId}`,val);
  }
  


}
