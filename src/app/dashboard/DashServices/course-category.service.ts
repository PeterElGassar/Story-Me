import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }


  //////////////////////////////////////////////////
  //********************Course-Category***************************/
  //////////////////////////////////////////////////
  getCoursesCategory() {
    return this.http.get<ICourseCategory[]>(this.baseUrl + 'sections_Coursess');
  }

  addCourseCategory(val: any) {
    return this.http.post(this.baseUrl + 'sections_Coursess', val);
  }

  editCourseCategory(val: any, catId: number) {
    debugger;
    return this.http.post(this.baseUrl + `sections_Coursess/${catId}?_method=PUT`, val);
  }

  deleteCourseCategory(id: string) {
    return this.http.delete(this.baseUrl + 'sections_Coursess/' + id);
  }
}
