import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../DashServices/course.service';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'app-course-purchase-info',
  templateUrl: './course-purchase-info.component.html',
  styleUrls: ['./course-purchase-info.component.css'],
})
export class CoursePurchaseInfoComponent implements OnInit {
  studentCourses: any;
  studentId: number;
  CourseName: string;
  //pagination
  rows = 5;
  recourdNumber: number;

  constructor(
    private courseServe: CourseService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.studentCourses != null)
      this.recourdNumber = this.studentCourses.length;

    this.studentId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.CourseName = this.activatedRoute.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    debugger;
    //get All Student Courses///////
    this.courseServe.getSellerOfCourseDetails(this.studentId).subscribe(
      (data) => {
        this.studentCourses = data;
        console.log(this.studentCourses);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
