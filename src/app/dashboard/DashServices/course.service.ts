import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/shared/models/Course';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { IInstructor } from 'src/app/shared/models/instructor';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  readonly baseUrl: string =
    'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) {}

  //////////////////////////////////////////////////
  //********************Course***************************/
  //////////////////////////////////////////////////
  getCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'courses');
  }

  // getCourses() {
  //   return this.http.get<ICourse[]>(this.baseUrl + 'courses');
  // }

  addCourse(val: any) {
    //here
    return this.http.post(this.baseUrl + 'courses', val);
  }

  editCourse(val: any, courseId: number) {
    debugger;
    return this.http.post(
      this.baseUrl + `courses/${courseId}?_method=PUT`,
      val
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(this.baseUrl + 'courses/' + id);
  }

  getCoursesCategory() {
    return this.http.get<ICourseCategory[]>(
      this.baseUrl + 'courses/sections_courses'
    );
  }
  getCoursesInstructor() {
    return this.http.get<IInstructor[]>(this.baseUrl + 'courses/instructor');
  }

  getSingleCourse(id: number) {
    return this.http.get<ICourse>(this.baseUrl + `courses/show/${id}`);
  }

  getِِApprovedCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'approvedCourse');
  }

  getRejectedCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'NotApprovedCourse');
  }

  CourseRejectedApproved(val: any, courseId: number) {
    debugger;
    return this.http.post(
      this.baseUrl + `approvedCourse/${courseId}?_method=PUT`,
      val
    );
  }

  getTopSellerOfCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'getTopSellerOfCourses');
  }

  getLessSellerOfCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'getLessSellerOfCourses');
  }

  getTopRatedCourses() {
    return this.http.get<ICourse[]>(this.baseUrl + 'getTopRatedCourses');
  }
  getAnyotherInstructorId(Instructor: number) {
    return this.http.get<ICourse[]>(this.baseUrl + `getId/${Instructor}`);
  }

  getResultOfExam(course_id: number, user_id: number) {
    return this.http.get<ICourse[]>(
      this.baseUrl + `quizStatus/show/${user_id}/${course_id}`
    );
  }
  getSellerOfCourseDetails(course_id: number) {
    return this.http.get<ICourse[]>(
      this.baseUrl + `getSellerOfCourseDetails/${course_id}`
    );
  }

  // attachCopon(userId: number, val: any) {
  //   return this.http.post(this.baseUrl + `attachCopon/${userId}`, val);
  // }

  attachCopon(userId: number, val: any) {
    debugger;
    return this.http.post(
      this.baseUrl + `attachCopon/${userId}`,val);
  }
}
