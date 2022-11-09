import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICourse } from '../shared/models/Course';
import { ICurriculumSection } from '../shared/models/CurriculumSection';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }


  //////////////////////////////////////////////////
  //********************Course***************************/
  //////////////////////////////////////////////////


  // getCourses() {
  //   return this.http.get<ICourse[]>(this.baseUrl + 'courses');
  // }
  
  getCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'approvedCourse');
  }

  getStudentCoursePayment(courseId:number) {
    return this.http.get<any[]>(this.baseUrl + `getStudentCoursePayment/${courseId}`);
  }

  getBestSellerOfCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'getBestSellerOfCourses');
  }


  
  getlatestCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'approvedCourse');
  }
  getBestSellerCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'approvedCourse');
  }

  getPaidCourses(studentId:number) {
    return this.http.get<ICourse[]>(this.baseUrl + `studentItems/${studentId}`);
  }


  //////////////////////////////////////////////////
  //********************Curriculum***************************/
  //////////////////////////////////////////////////
  getAllCurriculums() {
    return this.http.get(this.baseUrl + 'linke');
  }

  getCurriculumsOfOneCourse(courseId: number) {
    return this.http.get<ICurriculumSection>(this.baseUrl + `Section_Courses/${courseId}`);
  }
  // getCurriculumsOfOneCourse(courseId: number) {
  //   return this.http.get<ICurriculumSection>(this.baseUrl + `linke/${courseId}`);
  // }


  AddCurriculum(val: any) {
    return this.http.post(this.baseUrl + 'linke', val);
  }

  EditSectionCurriculum(val: any, courseId: number) {
    return this.http.post(this.baseUrl + `linke/${courseId}?_method=PUT`, val);
  }

  DelectCurriculum(courseId: number) {
    return this.http.post(this.baseUrl + `linke/`, courseId);
  }

  EditSectionLectrue(val: any, LinkId: number) {
    return this.http.post(this.baseUrl + `update_linke/${LinkId}?_method=PUT`, val);
  }

  DeleteSectionLectrue(LinkId: number) {
    return this.http.delete(this.baseUrl + `delete_linke/${LinkId}`);
  }

  addRating(courseId: number,val:any) {
    return this.http.post(this.baseUrl + `addRating/${courseId}`,val);
  }

  updateSectionTitle(sectionId,val:any) {
    return this.http.post(this.baseUrl + `updateSectionTitle/${sectionId}?_method=PUT`,val);
  }

  StudentPaymentShow(userId,courseId) {
    return this.http.get(this.baseUrl + `Student_payment/show/${userId}/${courseId}`);
  }



}
