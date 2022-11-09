import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
@Input() courseInfo:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.courseInfo)
  }

}
