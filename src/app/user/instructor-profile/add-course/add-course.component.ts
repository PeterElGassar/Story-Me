import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { ICourse } from 'src/app/shared/models/Course';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { IInstructor } from 'src/app/shared/models/instructor';
import { ILectrue } from 'src/app/shared/models/Lectrue';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  providers: [MessageService]

})
export class AddCourseComponent implements OnInit {
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
instructorIdForUpload:number;
  //for send to parent
  @Output() public nextTab = new EventEmitter<boolean>();

  @Output() public CourseIdForCurriculim = new EventEmitter<number>();
  currentUser$: Observable<any>;

  constructor(
    private dashServe: CourseService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authServe: AuthService,

    ) {

 
    }


  ngOnInit(): void {
    //initail all Values From Input Varaible
    this.loadCourseSections();
    // this.loadCourseInstructors();
    debugger
    if (this.Course != undefined) {
      this.id = this.Course.id;
      this.name = this.Course.name;
      this.description = this.Course.description;
      this.img_path = this.Course.img_path;
      // this.price_before_discount = this.Course.price_before_discount;
      // this.price_after_discount = this.Course.price_after_discount;
      this.date = this.Course.date;
      this.instructors_id = this.Course.instructors_id;
      this.sections_courses_id = this.Course.sections_courses_id;
      this.instructor_first_name = this.Course.instructor_first_name;
      this.instructor_second_name = this.Course.instructor_second_name;
      this.instructor_last_name = this.Course.instructor_last_name;
      this.instructor_img = this.Course.instructor_img;
      this.nameSection = this.Course.nameSection;
      this.nextTab.emit(false);
      this.CourseIdForCurriculim.emit(0);

     
    }
    this.currentUser$ = this.authServe.currentUser$;
    this.dashServe.getAnyotherInstructorId(+this.activatedRoute.snapshot.paramMap.get("id"))
    .subscribe((res:any)=>{
      debugger;
      this.instructorIdForUpload = res.id;
      console.log("new Id "+this.instructorIdForUpload);
    });
    //url
    this.Url = '';
    this.lectureName = '';

  }

  addCourse() {
    if (this.lectureUrls.length > 0) {
      // this.formData.append('lecture_Urls', JSON.stringify(this.lectureUrls));
    }
    

    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }else{
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'اختر صورة الدورة',
      });
      return 
    }
    if (this.coursePdfFile != null) {
      this.formData.append('pdf', this.coursePdfFile, this.coursePdfFile.name);
    }else{
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'ارفع ملف ملخص الدرس',
      });
      return 
    }



    this.formData.append('name', this.name);
    this.formData.append('description', this.description);

    // this.formData.append('price_before_discount',this.price_before_discount.toString());
    // this.formData.append('price_after_discount',this.price_after_discount.toString());

    debugger
    this.formData.append('instructors_id', this.instructorIdForUpload.toString());
    this.formData.append('sections_courses_id', this.sections_courses_id.toString());

    this.dashServe.addCourse(this.formData).subscribe((res:any) => {
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة  الدورة بنجاح ',
      });

      this.nextTab.emit(false);
      debugger;
      this.CourseIdForCurriculim.emit(res.courseId);
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

  // loadCourseInstructors() {
  //   this.dashServe.getCoursesInstructor().subscribe((data) => {
  //     this.courseInstructors = data;
  //   });
  // }

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
