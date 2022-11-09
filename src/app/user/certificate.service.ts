import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudentQuizzInfo } from '../shared/models/StudentQuizzInfo';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private QuizCase = new BehaviorSubject<any>(null);
  QuizCase$ = this.QuizCase.asObservable();
  
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';

  constructor(private http: HttpClient) { }
  Student_certificats
  // quizStatus/show?course_id=1&user_id=2

  
  getquizStatus(course_id:number,user_id:number) {
    return this.http.get<IStudentQuizzInfo>(this.baseUrl + `quizStatus/show/${user_id}/${course_id}`)
  }

  AddQuizResult(val:any) {
    return this.http.post(this.baseUrl + `Student_certificats`,val);
  }

}
