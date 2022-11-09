import { Component, OnInit } from '@angular/core';
import { ICourse } from '../shared/models/Course';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  courses: ICourse[];

  constructor(private serveUser: UserServiceService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.serveUser.getCourses().subscribe((respo=>{
      this.courses = respo;
    }));
  };


}
