import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ICourse } from 'src/app/shared/models/Course';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';
import { UserServiceService } from 'src/app/user/user-service.service';
import { CourseService } from '../../DashServices/course.service';

@Component({
  selector: 'show-live-cour',
  templateUrl: './show-cour.component.html',
  styleUrls: ['./show-cour.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ShowLiveCourComponent implements OnInit {
  courses: ICourse[];
  approvedCourses: any[];
  bestSellerCourses: any[];
  lessSellerCourses: any[];
  topRatedCourses: any[];
  notApprovedCourses: any[];

  course: ICourse;
  //pagination
  rows = 5;
  recourdNumber: number;
  IdToPath: number;
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  ActivateAddEditCurruclum: boolean = false;
  ActiveEditMood: boolean = false;
  CourseCurriculam: ICurriculumSection;
  coponePrecentage:number=0;
  constructor(
    private dashServe: CourseService,
    private messageService: MessageService,
    private confirmationServ: ConfirmationService,
    private userServe: UserServiceService,
    private router: Router
  ) {
    debugger;
    if (this.courses != null) this.recourdNumber = this.courses.length;
  }

  ngOnInit(): void {
    this.getCourse();
    this.getBestSellerCourses();
    this.getLessSellerOfCourses();
    this.getTopRatedCourses();
  }

  getCourse() {
    //get Aprroved///////
    this.dashServe.getِِApprovedCourses().subscribe(
      (response) => {
        this.approvedCourses = response;
      },
      (error) => {
        console.log(error);
      }
    );

    //get Not Aprroved///////
    this.dashServe.getRejectedCourses().subscribe(
      (response) => {
        this.notApprovedCourses = response;
        debugger;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  addNewClick() {
    this.modalTitle = 'إضافة قسم دورة';
    this.ActivateAddEditEmpComp = true;
    this.course = {
      id: 0,
      name: '',
      description: '',
      img_path:
        'http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png',
      price_after_discount: 0.0,
      price_before_discount: 0.0,
      date: null,
      sections_courses_id: 0,
      instructors_id: 0,
      instructor_first_name: '',
      instructor_second_name: '',
      instructor_last_name: '',
      instructor_img:
        'http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png',
      nameSection: '',
      created_at: '',
      is_aproved: 0,
    };
  }

  editClick(course: any) {
    this.modalTitle = 'تعديل بيانات الدورة';
    this.ActivateAddEditEmpComp = true;
    debugger;
    this.course = course;
  }

  closeCourseModal() {
    this.ActivateAddEditEmpComp = false;
    this.ActivateAddEditCurruclum = false;
    this.ActiveEditMood = false;
    debugger;
    //because Refill modal next time
    this.course = null;
    //refresh
    this.getCourse();
  }

  deleteClick(courseId: number) {

    this.confirmationServ.confirm({
      target: event.target,
      message: 'هل تريد حذف الدورة ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        this.dashServe.deleteCourse(courseId.toString()).subscribe((res) => {
          debugger;
          //Alerts
          this.messageService.add({
            key: 'removeInstructor',
            severity: 'success',
            summary: 'معهد الدراسات النفسية',
            detail: 'تم حذف الدورة',
          });
          //refresh
          this.getCourse();
        });
      },
      reject: () => {
        //reject action
      },
    });
  }

  initCurriculamToEdit(courseObj: any) {
    debugger;
    this.userServe.getCurriculumsOfOneCourse(courseObj.id).subscribe((res) => {
      debugger;
      this.CourseCurriculam = res;
      this.ActivateAddEditCurruclum = true;
      this.ActiveEditMood = true;
      this.IdToPath = courseObj.id;
    });
    this.modalTitle = 'إضافة قسم دورة';
  }

  initCurriculamToAdd(courseObj: any) {
    debugger;
    this.modalTitle = 'إضافة قسم دورة';
    this.ActivateAddEditCurruclum = true;
    this.ActiveEditMood = false;
    this.CourseCurriculam = null;
    this.IdToPath = courseObj.id;
  }

  toggleApproved(instructor: ICourse) {
    let val;
    debugger;
    if (instructor.is_aproved) {
      val = { approved: 1 };
      this.dashServe.CourseRejectedApproved(val, instructor.id).subscribe(
        (res) => {
          this.getCourse();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      val = { approved: 0 };
      this.dashServe.CourseRejectedApproved(val, instructor.id).subscribe(
        (res) => {
          this.getCourse();
        },
        (error) => {
          console.log(error);
        }
      );
      console.log('Reject Instructor');
    }

    this.getCourse();
  }

  getBestSellerCourses() {
    this.dashServe.getTopSellerOfCourses().subscribe((res) => {
        if (res) {
          this.bestSellerCourses = res;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLessSellerOfCourses() {
    this.dashServe.getLessSellerOfCourses().subscribe(
      (res) => {
        if (res) {
          this.lessSellerCourses = res;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopRatedCourses() {
    this.dashServe.getTopRatedCourses().subscribe(
      (res) => {
        if (res) {
          this.topRatedCourses = res;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
