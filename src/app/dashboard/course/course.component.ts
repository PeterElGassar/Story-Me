import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ICourse } from 'src/app/shared/models/Course';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  ngOnInit(): void {
    
  }

}
