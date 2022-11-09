import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../shared/models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }


  GetAllQuestionsOfCourse(courseId:number){
    return this.http.get<IQuestion[]>(this.baseUrl + 'question_Courses/' + courseId);
  }


  addNewQuestion(val: any) {
    return this.http.post(this.baseUrl + 'question', val);
  }

  editQuestion(val: any,questionId:number) {
   debugger;
    return this.http.post(this.baseUrl + `question/${questionId}?_method=PUT`, val);
  }

  deleteQuestion(questionId: number) {
    return this.http.delete(this.baseUrl + 'question/' + questionId);
  }

}
