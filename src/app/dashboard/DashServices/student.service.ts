import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from 'src/app/shared/models/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  readonly baseUrl: string ='http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) {}
  //////////////////////////////////////////////////
  //********************Instructor***************************/
  //////////////////////////////////////////////////

  getِِApprovedStudents() {
    return this.http.get<IStudent[]>(this.baseUrl + 'getApprovedStudent');
  }

  getRejectedStudents() {
    return this.http.get<IStudent[]>(this.baseUrl + 'getDesApprovedStudent');
  }
  getMaleStudents() {
    return this.http.get<IStudent[]>(this.baseUrl + 'getMaleStudent');
  }
  getFemaleStudents() {
    return this.http.get<IStudent[]>(this.baseUrl + 'getFemaleStudent');
  }

  addInstructor(val: any) {
    return this.http.post(this.baseUrl + 'instractor', val);
  }
  addNotification(val: any) {
    return this.http.post(this.baseUrl + 'addNotification', val);
  }

  editInstructor(val: any, instructorId: number) {
    
    return this.http.post(
      this.baseUrl + `instractor/${instructorId}?_method=PUT`,val);
  }

  ResetAttempts(studentId: number, courseId: number) {
    
    return this.http.get(
      this.baseUrl + `ResetAttempts/${studentId}/${courseId}`
    );
  }

  deleteInstructor(id: string) {
    return this.http.delete(this.baseUrl + 'instractor/' + id);
  }

  StudentRejectedApproved(val: any, instructorId: number) {
    
    return this.http.post(
      this.baseUrl + `approvedStudent/${instructorId}?_method=PUT`,
      val
    );
  }

  getStudentCourses(studentId: number) {
    
    return this.http.get(this.baseUrl + `certificats/${studentId}`);
  }

  Student_payment(studentId: number, courseId: number, val: any) {
    return this.http.post(
      this.baseUrl + `Student_payment/${studentId}/${courseId}`,val);
  }

  update_Student_payment(studentId: number, courseId: number, val: any) {
    return this.http.post(
      this.baseUrl + `update_Student_payment/${studentId}/${courseId}`,val);
  }

  getStudent_payment(studentId: number, courseId: number) {
    
    return this.http.get(
      this.baseUrl + `Student_payment/show/${studentId}/${courseId}`);
  }

  getPartialStudentPayment(courseId: number) {
    
    return this.http.get(this.baseUrl + `getStudentCoursePayment/${courseId}`);
  }

  getCashStudentPayment(courseId: number) {
    
    return this.http.get(this.baseUrl + `getStudentCourseCash/${courseId}`);
  }

  getAllNotification() {
    
    return this.http.get(this.baseUrl + `notification`);
  }
  getAllCourseNotification(courseId:number) {
    
    return this.http.get(this.baseUrl + `getCourseNotification/${courseId}`);
  }
  
  watchUsersNotification(val:any) {
    return this.http.post(this.baseUrl + `watchUsersNotification?_method=PUT`,val);
  }

  singleUsersNotification(userId:number) {
    return this.http.get(this.baseUrl + `getUserNotification/${userId}`);
  }

  getLinkNotificationById(notificationId:number) {
    return this.http.get(this.baseUrl + `getLinkNotificationById/${notificationId}`);
  }

}
