import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class StudentCoursesComponent implements OnInit {
  studentCourses: any;
  studentId:number;
  studentName:string;

    //pagination
    rows = 5;
    recourdNumber: number;
  constructor(
    private dashServe: StudentService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    ) { 
      if (this.studentCourses != null) this.recourdNumber = this.studentCourses.length;
      this.studentId = +this.activatedRoute.snapshot.paramMap.get('id');
      this.studentName = this.activatedRoute.snapshot.paramMap.get('name');
    }

  ngOnInit(): void {
    this.getStudents();
  }


  getStudents() {
    //get All Student Courses///////
    this.dashServe.getStudentCourses(this.studentId).subscribe((data) => {
        this.studentCourses = data;
        console.log(this.studentCourses)
      },
      (error) => {
        console.log(error);
      }
    );
  
  }

  ResetAttempts(courseId , studentId) {
    debugger
    //get All Student Courses///////
    this.dashServe.ResetAttempts(this.studentId, studentId).subscribe((data) => {
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم تفعيل المحاولات من جديد',
        });
      },
      (error) => {
        console.log(error);
      }
    );
  
  }

}
