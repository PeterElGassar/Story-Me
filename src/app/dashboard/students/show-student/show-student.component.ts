import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IStudent } from 'src/app/shared/models/Student';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css'],
  providers:[MessageService]
})
export class ShowStudentComponent implements OnInit {

  instructors: IStudent[];
  bestSellerInstructor: any;
 lessSellerInstructor: any;
  approvedInstructors: IStudent[];
  notApprovedInstructors: IStudent[];
  maleStudents: IStudent[];
  femaleStudents: IStudent[];
  student: IStudent;
  //pagination
  rows = 5;
  recourdNumber: number;
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;

  constructor(
    private dashServe: StudentService,
    private messageService: MessageService,
    private confirmationServ: ConfirmationService
  ) {
    if (this.instructors != null) this.recourdNumber = this.instructors.length;
  }

  ngOnInit(): void {
    this.getStudents();

  }

  getStudents() {
    //get Aprroved///////
    this.dashServe.getِِApprovedStudents().subscribe((response) => {
        this.approvedInstructors = response;
        console.log(this.approvedInstructors);
      },
      (error) => {
        console.log(error);
      }
    );
    //get Not Aprroved///////
    this.dashServe.getRejectedStudents().subscribe(
      (response) => {
        this.notApprovedInstructors = response;
        debugger;
        console.log(this.notApprovedInstructors);
      },
      (error) => {
        console.log(error);
      }
    );
    //get femals///////
    this.dashServe.getFemaleStudents().subscribe(
      (response) => {
        this.femaleStudents = response;
        debugger;
      },
      (error) => {
        console.log(error);
      }
    );
    //get males///////
    this.dashServe.getMaleStudents().subscribe(
      (response) => {
        this.maleStudents = response;
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
    this.student = {
      id: 0,
      name: '',
      is_aproved: '',
      email: '',
      gender: '',
      subscribe_times: 0,
      created_at: 0,
      user_id: 0,
      expire: ''

    };
  }

  editClick(inst: any) {
    this.modalTitle = 'تعديل بيانات الطالب';
    this.ActivateAddEditEmpComp = true;
    this.student = inst;
  }

  closeInstructorModal() {
    this.ActivateAddEditEmpComp = false;
    debugger;
    //because Refill modal next time
    this.student = null;
    //refresh
    this.getStudents();
  }

  deleteClick(courseId: number) {
    debugger;
    // if (confirm("are you sure")) {
    //   this.dashServe.deleteInstructor(courseId.toString()).subscribe(res => {
    //     debugger;
    //     this.getStudents();
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
            this.getStudents();
          });
      },
      reject: () => {
        //reject action
      },
    });
  }



  toggleApproved(instructor: any) {
    let val;
    debugger;
    if (instructor.is_aproved) {
      val = { approved: 1 };
      this.dashServe.StudentRejectedApproved(val, instructor.id).subscribe(
        (res) => {
          this.getStudents();

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      val = { approved: 0 };
      this.dashServe.StudentRejectedApproved(val, instructor.id).subscribe(
        (res) => {          this.getStudents();
        },
        (error) => {
          console.log(error);
        }
      );
      console.log('Reject Instructor');
    }

  }



}
