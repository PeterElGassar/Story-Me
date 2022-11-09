import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'student-final-result',
  templateUrl: './student-final-result.component.html',
  styleUrls: ['./student-final-result.component.css']
})
export class StudentFinalResultComponent implements OnInit {
  currentUser$: Observable<any>;


  @Input() score:number;
  @Input() questionLength:number;
  @Input() certificat:any;
  courseId:number;
  CourseName:string;


  constructor(
    private authServe: AuthService,
    private serveCourse: CourseService,
    private activatedRoute: ActivatedRoute,
    ) {
      this.currentUser$ = this.authServe.currentUser$;
   }

  ngOnInit(): void {
    this.courseId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadCourse();
  }
  loadCourse() {
    this.serveCourse.getSingleCourse(this.courseId).subscribe((cour: any) => {
        this.CourseName= cour.name

      },(error) => {
        console.log(error);
      }
    );
  }
  
}
