import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'show-certificate',
  templateUrl: './show-certificate.component.html',
  styleUrls: ['./show-certificate.component.css'],
})
export class ShowCertificateComponent implements OnInit {
  currentUser$: Observable<any>;
  courseId: number;
  userId: number;
  course: any;

  QuizStatus:any;
  studentFinalResult:number;
  constructor(
    private authServe: AuthService,
    private serveCourse: CourseService,
    private activatedRoute: ActivatedRoute
) {
    this.currentUser$ = this.authServe.currentUser$;
  }
  
   
  ngOnInit(): void {
    this.courseId = +this.activatedRoute.snapshot.paramMap.get('courseId');
    this.userId = +this.activatedRoute.snapshot.paramMap.get('userId');

    console.log("course id"+this.courseId )
    console.log("user id"+this.userId )
    this.loadCourse();
  }

  loadCourse() {
    this.serveCourse.getSingleCourse(this.courseId).subscribe(
      (cour: any) => {
        this.course = cour;
        console.log(this.course);
        this.getResultOfExam();
        if(this.authServe.currentUser$){
          debugger
        }
      },
      (error) => {
        console.log(error);
      }
    );
         }

  getResultOfExam() {
    debugger;

    this.serveCourse.getResultOfExam(this.courseId,this.userId).subscribe((quizStatus: any) => {
      debugger;
        this.QuizStatus = quizStatus;
        this.studentFinalResult=
        (quizStatus.certificat.correct_questions * 100) / quizStatus.certificat.number_of_questions;
        // ({{QuizStatus?.certificat.correct_questions}} * 100) / {{QuizStatus?.certificat.number_of_questions}} <span>%</span></h2>

        console.log("QuizStatus "+this.course);
      },
      (error) => {
        console.log(error);
      }
    );
}



}
