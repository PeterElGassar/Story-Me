import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { ICourse } from 'src/app/shared/models/Course';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { IInstructor } from 'src/app/shared/models/instructor';
import { ILectrue } from 'src/app/shared/models/Lectrue';

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {

  @Input() Course: ICourse;

  id: 0;
  name: string;
  description: string;
  img_path: string;
  price_before_discount: number;
  price_after_discount: number;
  date: string;
  instructors_id: number;
  sections_courses_id: number;
  instructor_first_name: string;
  instructor_second_name: string;
  instructor_last_name: string;
  instructor_img: string;
  nameSection: string;

  selectedFile: File = null;
  coursePdfFile: File = null;
  formData: FormData = new FormData();
  //for dropdown
  courseCategories: ICourseCategory[];
  courseInstructors: IInstructor[];
  lectureUrls: ILectrue[] = [];
  lecture: ILectrue;
  Url: string;
  lectureName: string;
  //chips
  LuctrueNames: string[];
  LuctrueUrls: string[];
  CourseSectionName: string;
  //--chips

  //for send to parent
  @Output() public nextTab = new EventEmitter<boolean>();

  @Output() public CourseIdForCurriculim = new EventEmitter<number>();

  constructor(private dashServe: CourseService) {}
  ngOnInit(): void {
    //initail all Values From Input Varaible
    this.loadCourseSections();
    this.loadCourseInstructors();
    debugger
    if (this.Course != undefined) {
      this.id = this.Course.id;
      this.name = this.Course.name;
      this.description = this.Course.description;
      this.img_path = this.Course.img_path;
      this.price_before_discount = this.Course.price_before_discount;
      this.price_after_discount = this.Course.price_after_discount;
      this.date = this.Course.date;
      this.instructors_id = this.Course.instructors_id;
      this.sections_courses_id = this.Course.sections_courses_id;
      this.instructor_first_name = this.Course.instructor_first_name;
      this.instructor_second_name = this.Course.instructor_second_name;
      this.instructor_last_name = this.Course.instructor_last_name;
      this.instructor_img = this.Course.instructor_img;
      this.nameSection = this.Course.nameSection;
      console.log(this.price_before_discount)
      console.log(this.price_before_discount)
      this.nextTab.emit(false);
      this.CourseIdForCurriculim.emit(0);
    }

    //url
    this.Url = '';
    this.lectureName = '';
  }

  addCourse() {
    if (this.lectureUrls.length > 0) {
      // this.formData.append('lecture_Urls', JSON.stringify(this.lectureUrls));
    }
    this.formData.append('img', this.selectedFile, this.selectedFile.name);
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    this.formData.append(
      'price_before_discount',
      this.price_before_discount.toString()
    );
    this.formData.append(
      'price_after_discount',
      this.price_after_discount.toString()
    );
    this.formData.append('instructors_id', this.instructors_id.toString());
    this.formData.append(
      'sections_courses_id',
      this.sections_courses_id.toString()
    );
    debugger;
    this.dashServe.addCourse(this.formData).subscribe((res) => {
      alert(res.toString());
      // this.toastr.success(res.toString());
      // this.courseCategory = null;
      this.nextTab.emit(false);
      // this.CourseIdForCurriculim.emit(res.CourseId);
    });
  }

  updateCourse() {
    if (this.lectureUrls.length > 0) {
      // this.formData.append('lecture_Urls', JSON.stringify(this.lectureUrls));
    }
    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    this.formData.append('price_before_discount',this.price_before_discount.toString());
    this.formData.append('price_after_discount',this.price_after_discount.toString());
    this.formData.append('instructors_id', this.instructors_id.toString());
    this.formData.append('sections_courses_id',this.sections_courses_id.toString());

    debugger;
    this.dashServe.editCourse(this.formData, this.id).subscribe((res) => {
      debugger;
      console.log(res);
      
      alert(res.toString());
    });
  }

  //just for refresh Input file
  uploadPhoto(event) {
    if (event.files[0] && event.files) {
      this.selectedFile = <File>event.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (e: any) => {
        this.img_path = e.target.result;
      };
    }
  }
  uploadPdf(event) {
    debugger;
    this.coursePdfFile = <File>event.files[0];
  }
  //loading Dropdowns
  loadCourseSections() {
    this.dashServe.getCoursesCategory().subscribe((data) => {
      this.courseCategories = data;
    });
  }

  loadCourseInstructors() {
    this.dashServe.getCoursesInstructor().subscribe((data) => {
      this.courseInstructors = data;
    });
  }

  //change
  onChangeInstructor(value) {
    this.instructors_id = value;
  }

  onChangeCategory(value) {
    this.sections_courses_id = value;
  }

  addLuctrueUrl() {
    debugger;
    this.LuctrueUrls;
    this.LuctrueNames;
    this.CourseSectionName;
    this.lecture = {
      url: this.Url,
      name: this.lectureName,
    };

    this.lectureUrls.push(this.lecture);

    this.Url = '';
    this.lectureName = '';
  }
}
