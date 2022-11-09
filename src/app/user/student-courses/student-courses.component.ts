import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { StudentService } from 'src/app/dashboard/DashServices/student.service';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';
import { ICourse } from 'src/app/shared/models/Course';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
})
export class StudentCoursesComponent implements OnInit {
  UserId: number;
  ngOnInit(): void {
    this.getStudentCourses();
    this.initBreadCrumb();
    this.getUserPaidCourses(this.UserId);
    this.getStudentNotification(this.UserId);
  }

  breadCrumb: IBreadbrumb;
  letastCourses: ICourse[];
  allCourses: ICourse[];
  filteredAllCourses: ICourse[];
  studentCourses: any[] = [];
  studentDiplomas: any[] = [];

  studentNotification: any[] = [];
  selectedNotification: any[] = [];
  userNotification: any[] = [];

  TitleOfSlider: string;
  coursePage: number = 1;
  diplomaPage: number = 1;
  private _searchTerm: string;

  constructor(
    private CourServe: CourseService,
    private userServe: UserServiceService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.UserId = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    if (value === '') {
      this.filteredAllCourses = this.allCourses;
    }
    // this.filteredAllCourses = this.filteredCourses(value);
  }

  filteredCourses(searchString: string): ICourse[] {
    return this.allCourses.filter(
      (course) =>
        course.name
          .toLocaleLowerCase()
          .indexOf(this.searchTerm.toLocaleLowerCase()) !== -1
    );
  }

  onSearch() {
    this.filteredAllCourses = this.filteredCourses(this.searchTerm);
  }

  getStudentCourses() {
    this.CourServe.getCourses().subscribe((data) => {
      this.allCourses = data;
      this.filteredAllCourses = data;
    });
  }


  initBreadCrumb() {
    this.breadCrumb = { title: 'دوراتي' };
  }

  getUserPaidCourses(userId) {
    this.userServe.getPaidCourses(userId).subscribe((res: any) => {
      if (res) {
        //take courses only (res.courses)
        this.studentCourses = res.courses;
        this.studentDiplomas = res.diplomas;
        console.log(this.studentCourses);
        console.log(this.studentDiplomas);
      }
    });
  }


  getStudentNotification(userId) {
    debugger;
    this.studentService
      .singleUsersNotification(userId)
      .subscribe((res: any) => {
        debugger;

        if (res) {
          this.userNotification = res;
          console.log(this.userNotification);
        }
      });
  }
}
