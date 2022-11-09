import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiplomaService } from '../../DashServices/diploma.service';

@Component({
  selector: 'app-diploma-purchase-info',
  templateUrl: './diploma-purchase-info.component.html',
  styleUrls: ['./diploma-purchase-info.component.css']
})
export class DiplomaPurchaseInfoComponent implements OnInit {

  studentCourses: any;
  diplomaId: number;
  CourseName: string;
  //pagination
  rows = 5;
  recourdNumber: number;

  constructor(
    private DiplomaServe: DiplomaService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.studentCourses != null)
      this.recourdNumber = this.studentCourses.length;

    this.diplomaId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.CourseName = this.activatedRoute.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    debugger;
    //get All Student Courses///////
    this.DiplomaServe.getSellerOfDiplomaDetails(this.diplomaId).subscribe(
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
