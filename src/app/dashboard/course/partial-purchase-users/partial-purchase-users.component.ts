import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ICourse } from 'src/app/shared/models/Course';
import { ICurriculumSection, partialCourseObj } from 'src/app/shared/models/CurriculumSection';
import { UserServiceService } from 'src/app/user/user-service.service';
import { CourseService } from '../../DashServices/course.service';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'partial-purchase-users',
  templateUrl: './partial-purchase-users.component.html',
  styleUrls: ['./partial-purchase-users.component.css'],
})
export class PartialPurchaseUsersComponent implements OnInit {
  arr: any[] = [];
  partialCourseObj: partialCourseObj;
  selectedStudent: any;
  paid_up: number = 0;
  course: ICourse;
  @Input() CurrSection: ICurriculumSection[];
  studentCourses: any;
  studentId: number;
  courseId: any;
  CourseName: string;
  //pagination
  rows = 5;
  recourdNumber: number;
  constructor(
    private userServe: UserServiceService,
    private studentServe: StudentService,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {
    if (this.studentCourses != null)
      this.recourdNumber = this.studentCourses.length;
    debugger;
    this.courseId = activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getStudents();
    this.getCourse();
  }

  getStudents() {
    //get All Student Courses///////
    this.userServe.getStudentCoursePayment(this.courseId).subscribe(
      (data) => {
        debugger;
        this.studentCourses = data;
        console.log(this.studentCourses);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  update_Student_payment(studentId: any) {
    //get All Student Courses///////
    this.studentServe
      .update_Student_payment(studentId, this.courseId, this.studentCourses)
      .subscribe(
        (data) => {
          debugger;
          this.studentCourses = data;
          console.log("lstudentCourses"+this.studentCourses);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  EditLecture() {
    this.arr = [];
    this.paid_up;
    this.CurrSection;
    this.selectedStudent;
    this.CurrSection.forEach((section: any) => {
      section.name.forEach((item: any) => {
        if (item.is_opend == true) {
          this.arr.push(item.id);
        }
      });
    });

    this.partialCourseObj = {
      paid_up: this.paid_up,
      linkes_id: this.arr,
    };
    debugger;

    this.studentServe
      .Student_payment(
        this.selectedStudent.user_id,
        this.courseId,
        this.partialCourseObj
      )
      .subscribe(
        (res: any) => {
          debugger;
          if (res) {
            debugger;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCourse() {
    this.courseService.getSingleCourse(this.courseId).subscribe(
      (res: any) => {
        if (res) {
          this.course = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  
   ActivateAddEditCurruclum: boolean = false;
   ActiveEditMood: boolean = false;

  closeCourseModal() {
    this.ActivateAddEditCurruclum = false;
    debugger;
    //because Refill modal next time
    //refresh
  }

  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;

  editClick() {
    this.modalTitle = 'تعديل بيانات الدورة';
    this.ActivateAddEditEmpComp = true;
    debugger;
    this.course
  }

  CourseCurriculam: ICurriculumSection;
  IdToPath: number;

opendLecture:any;
  Edit(courseObj: any) {
    debugger;
    this.userServe.getCurriculumsOfOneCourse(this.courseId).subscribe((res) => {
      debugger;
      this.CourseCurriculam = res;

      this.studentServe.getStudent_payment(courseObj.user_id,this.courseId).subscribe((response) => {
        this.opendLecture = response;
        this.ActivateAddEditCurruclum = true;
        this.ActiveEditMood = true;
        this.IdToPath = this.courseId;
      },err=>{
        console.log(err)
      });
    
    });
   
    this.modalTitle = 'تعديل الدروس المفتوحة ';
  }
  
}
