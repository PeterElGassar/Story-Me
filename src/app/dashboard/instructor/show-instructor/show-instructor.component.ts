import { InstructorService } from './../../DashServices/instructor.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IInstructor } from 'src/app/shared/models/instructor';
import { DashboardService } from '../../dashboard.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'show-instructor',
  templateUrl: './show-instructor.component.html',
  styleUrls: ['./show-instructor.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ShowInstructorComponent implements OnInit {
  instructors: IInstructor[];
  bestSellerInstructor: any;
 lessSellerInstructor: any;
  approvedInstructors: IInstructor[];
  notApprovedInstructors: IInstructor[];
  instructor: IInstructor;
  //pagination
  rows = 5;
  recourdNumber: number;
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;

  constructor(
    private dashServe: InstructorService,
    private messageService: MessageService,
    private confirmationServ: ConfirmationService
  ) {
    if (this.instructors != null) this.recourdNumber = this.instructors.length;
  }

  ngOnInit(): void {
    this.getInstructors();
    this.getBestSellerOfInstructorCourses();
    this.getLessSellerOfInstructorCourses();
  }

  getInstructors() {
    // this.dashServe.getInstructors().subscribe(
    //   (response) => {
    //     this.instructors = response;
    //     console.log(this.instructors)
    //     this.spirateInstructors();

    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
    //get Aprroved///////
    this.dashServe.getِِApprovedInstructors().subscribe(
      (response) => {
        this.approvedInstructors = response;
        console.log(this.approvedInstructors);
      },
      (error) => {
        console.log(error);
      }
    );
    //get Not Aprroved///////
    this.dashServe.getRejectedInstructors().subscribe(
      (response) => {
        this.notApprovedInstructors = response;
        debugger;
        console.log(this.notApprovedInstructors);
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
    this.modalTitle = 'إضافة  محاضر';
    this.ActivateAddEditEmpComp = true;
    this.instructor = {
      id: 0,
      first_name: '',
      second_name: '',
      last_name: '',
      email: '',
      description: '',
      experience: 0,
      is_aproved: '0',
      // specialization: '',
      phone: '',
      cv_path: '',
      img_path:
        'http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png',
    };
  }

  editClick(inst: any) {
    this.modalTitle = 'تعديل بيانات المحاضر';
    this.ActivateAddEditEmpComp = true;
    this.instructor = inst;
  }

  closeInstructorModal() {
    this.ActivateAddEditEmpComp = false;
    debugger;
    //because Refill modal next time
    this.instructor = null;
    //refresh
    this.getInstructors();
  }

  deleteClick(courseId: number) {
    debugger;
    // if (confirm("are you sure")) {
    //   this.dashServe.deleteInstructor(courseId.toString()).subscribe(res => {
    //     debugger;
    //     this.getInstructors();
    //     alert(res.toString());
    //   });
    // }

    this.confirmationServ.confirm({
      target: event.target,
      message: 'هل تريد حذف المدرب ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        this.dashServe
          .deleteInstructor(courseId.toString())
          .subscribe((res) => {
            debugger;
            //Alerts
            this.messageService.add({
              key: 'removeInstructor',
              severity: 'success',
              summary: 'معهد الدراسات النفسية',
              detail: 'تم حذف المدرب',
            });
            //refresh
            this.getInstructors();
          });
      },
      reject: () => {
        //reject action
      },
    });
  }

  spirateInstructors() {
    this.approvedInstructors = this.instructors.filter(
      (instructor) => instructor.is_aproved === '1'
    );
    this.notApprovedInstructors = this.instructors.filter(
      (instructor) => instructor.is_aproved === '0'
    );
    console.log(this.approvedInstructors);
    console.log(this.notApprovedInstructors);
    // basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
  }

  toggleApproved(instructor: any) {
    let val;
    debugger;
    if (instructor.is_aproved) {
      val = { approved: 1 };
      this.dashServe.InstructorRejectedApproved(val, instructor.id).subscribe(
        (res) => {
          this.getInstructors();

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      val = { approved: 0 };
      this.dashServe.InstructorRejectedApproved(val, instructor.id).subscribe(
        (res) => {          this.getInstructors();
        },
        (error) => {
          console.log(error);
        }
      );
      console.log('Reject Instructor');
    }

  }

  getBestSellerOfInstructorCourses() {
    // return this.http.get<any>(this.baseUrl + 'getBestSellerOfInstructorCourses');
    this.dashServe.getBestSellerOfInstructorCourses().subscribe((res) => {
      if (res) {
        this.bestSellerInstructor = res;
      }
    });
  }

  getLessSellerOfInstructorCourses() {
    this.dashServe.getLessSellerOfInstructorCourses().subscribe((res) => {
      if (res) {
        this.lessSellerInstructor = res;
      }
    });
  }
}
