import { ICourse } from 'src/app/shared/models/Course';
import { IBreadbrumb } from './../../shared/models/breadcrumb';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
  providers: [MessageService],

})
export class AllCoursesComponent implements OnInit {
  breadCrumb: IBreadbrumb;
  letastCourses: ICourse[];
  allCourses: ICourse[];
  filteredAllCourses: ICourse[];

  TitleOfSlider: string;
  page: number = 1;
  private _searchTerm: string;

  constructor(private CourServe: CourseService,private translate: TranslateService) {}

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

  ngOnInit(): void {
    this.breadCrumb = { title: this.translate.instant('COURSES') };
    this.getLeatastCourses();
    this.getAllCourses();
    this.TitleOfSlider = this.translate.instant('OFFER_ON_ALL_COURSES');
  }

  onSearch() {
    debugger;
    this.filteredAllCourses = this.filteredCourses(this.searchTerm);
  }
  
  getLeatastCourses() {
    this.CourServe.getِِApprovedCourses().subscribe((data) => {
      this.letastCourses = data;
    });
  }

  filteredCourses(searchString: string): ICourse[] {
    return this.allCourses.filter(
      (course) =>
        course.name
          .toLocaleLowerCase()
          .indexOf(this.searchTerm.toLocaleLowerCase()) !== -1
    );
  }

  getAllCourses() {
    this.CourServe.getِِApprovedCourses().subscribe((data) => {
      this.allCourses = data;
      this.filteredAllCourses = data;
    });
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,

    navSpeed: 700,
    margin: 10,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3.8,
      },
    },
    nav: true,
  };
}
