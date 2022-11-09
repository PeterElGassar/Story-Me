import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/Course';
import { CourseService } from '../../DashServices/course.service';
import { ToastrService } from 'ngx-toastr';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { IInstructor } from 'src/app/shared/models/instructor';
import { ILectrue } from 'src/app/shared/models/Lectrue';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'add-edit-cour',
  templateUrl: './add-edit-cour.component.html',
  styleUrls: ['./add-edit-cour.component.css'],
  providers: [MessageService],

})
export class AddEditCourComponent implements OnInit {
  @Input() Course: any;
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
  rate_instructor: number;

  selectedFile: File = null;
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
CourseSectionName:string;
coursePdfFile: File = null;

//--chips



  ngOnInit(): void {
    //initail all Values From Input Varaible
    this.loadCourseSections();
    this.loadCourseInstructors();

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
    this.rate_instructor = this.Course.rate_instructor;
    //url
    this.Url = '';
    this.lectureName = '';
    debugger;
  }

  constructor(
    private dashServe: CourseService,
    private messageService: MessageService,

  ) {}

  addCourse() {
    if (this.lectureUrls.length > 0) {
      // this.formData.append('lecture_Urls', JSON.stringify(this.lectureUrls));
    }

    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    // else{
    //   this.messageService.add({
    //     key: 'ImageErrorMs',
    //     severity: 'error',
    //     summary: 'معهد الدراسات النفسية',
    //     detail: 'اختر صورة الدورة',
    //   });
    //   return 
    // }
    if (this.coursePdfFile != null) {
      this.formData.append('pdf', this.coursePdfFile, this.coursePdfFile.name);
    }
    // else{
    //   this.messageService.add({
    //     key: 'ImageErrorMs',
    //     severity: 'error',
    //     summary: 'معهد الدراسات النفسية',
    //     detail: 'ارفع ملف ملخص الدرس',
    //   });
    //   return 
    // }
if(this.rate_instructor !== null){
  this.formData.append('rate_instructor', this.rate_instructor.toString());

}
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
    this.formData.append('sections_courses_id',this.sections_courses_id.toString());
    debugger;
    this.dashServe.addCourse(this.formData).subscribe((res) => {

      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة  الدورة بنجاح ',
      });
    });
  }

  updateCourse() {
    if (this.lectureUrls.length > 0) {
      // this.formData.append('lecture_Urls', JSON.stringify(this.lectureUrls));
    }
    if (this.selectedFile !== null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile !== null) {
      this.formData.append('pdf', this.coursePdfFile, this.coursePdfFile.name);
    }
    if(this.rate_instructor !== null){
      this.formData.append('rate_instructor', this.rate_instructor.toString());
    
    }
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
    this.dashServe.editCourse(this.formData, this.id).subscribe((res) => {
      debugger;
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة  الدورة بنجاح ',
      });
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

  uploadPdf(event) {
    debugger;
    this.coursePdfFile = <File>event.files[0];
  }
}
