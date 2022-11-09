import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/dashboard/DashServices/instructor.service';
import { IInstructor } from 'src/app/shared/models/instructor';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  instructorslist: IInstructor[] = [];
  constructor(private instructorServe: InstructorService) {}
  page: number = 1;

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors() {
    this.instructorServe.getِِApprovedInstructors().subscribe(
      (res) => {
        if (res) {         
          this.instructorslist = res;
          console.log(this.instructorslist);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
