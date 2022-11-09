import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { error } from 'protractor';
import { ICourse } from 'src/app/shared/models/Course';
import { UserServiceService } from 'src/app/user/user-service.service';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'app-add-course-notify',
  templateUrl: './add-course-notify.component.html',
  styleUrls: ['./add-course-notify.component.css'],
  providers: [MessageService],
})
export class AddCourseNotifyComponent implements OnInit {
  selectedPartialStudent: any[];
  selectedCashStudent: any[];

  checked: boolean = false;
  course: ICourse;
  LectrueUpdate: any;

  notificationText: string;
  liveLink: string;
  dateOfNotification: Date;

  itemUrlId: number;
  @Input() CourseID: number;
  @Input() ActiveEditMood: boolean = false;
  section: any;
  cashStudent: any[] = [];
  notification: any[] = [];
  partialPaymentStudent: any[] = [];

  formData: FormData = new FormData();

  cashStudentIds: string[] = [];
  partialStudentIds: string[] = [];

  allSendedNotificationStudent: any[] = [];
  partialStudentTitle: 'طلاب الدفع الاجل';
  chashStudentTitle: 'طلاب الدفع الكاش';

  allSendedNotificationStudentCash: any[] = [];
  allSendedNotificationStudentPartial: any[] = [];

  constructor(
    private messageService: MessageService,
    private studentServe: StudentService
  ) {}

  ngOnInit(): void {
    this.getAllSendedNotificationStudent();
    this.getPartialStudents();
    this.getCashStudents();
  }

  successMessage() {
    this.messageService.add({
      key: 'addInstructor',
      severity: 'success',
      summary: 'معهد الدراسات النفسية',
      detail: 'تم إضافة القسم بنجاح',
    });
  }

  getPartialStudents() {
    //get Aprroved///////
    this.studentServe.getPartialStudentPayment(this.CourseID).subscribe(
      (response: any) => {
        this.partialPaymentStudent = response;
        console.log(this.partialPaymentStudent);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newCashStudent: any[] = [];
  newPartial_Student: any[] = [];

  getCashStudents() {
    //get Aprroved///////
    this.studentServe
      .getCashStudentPayment(this.CourseID)
      .subscribe((response: any) => {
        this.cashStudent = response;
        console.log(this.cashStudent);
      });

    this.studentServe.getAllCourseNotification(this.CourseID).subscribe(
      (response: any) => {
        this.notification = response;
        console.log(this.cashStudent);
        this.filterPartialPaymentStudent();

        this.filterCashPaymentStudent(this.cashStudent);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllSendedNotificationStudent() {
    this.studentServe.getAllCourseNotification(this.CourseID).subscribe(
      (res: any) => {
        this.allSendedNotificationStudent = res;

        this.allSendedNotificationStudent.forEach((element: any) => {
          if (element.cash === 1) {
            this.allSendedNotificationStudentCash.push(element);
          } else {
            this.allSendedNotificationStudentPartial.push(element);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ActivateAddEditEmpComp: boolean = false;

  closeCourseModal() {
    this.ActivateAddEditEmpComp = false;
    this.ActiveEditMood = false;
    //because Refill modal next time
    this.course = null;
    //refresh
  }

  addCourse() {
    //get all selected Courses And push it in the array
    debugger
    this.cashStudentIds=[];
    this.partialStudentIds=[];
    if (this.selectedCashStudent !== undefined) {
      debugger;
      if (this.selectedCashStudent.length > 0) {
        this.selectedCashStudent.forEach((item) => {
          this.cashStudentIds.push(item.user_id.toString());
          console.log(this.cashStudentIds);
        });
        this.formData.append(
          'studentCash',
          JSON.stringify(this.cashStudentIds)
        );
      }
    } else {
      this.formData.append('studentCash', this.cashStudentIds.toString());
    }

    //get all selected Instructors And push it in the array
    debugger
    
    if (this.selectedPartialStudent !== undefined) {
      debugger;
      if (this.selectedPartialStudent.length > 0) {
        this.selectedPartialStudent.forEach((item) => {
          this.partialStudentIds.push(item.user_id.toString());
        });
        this.formData.append(
          'studentInstallment',
          JSON.stringify(this.partialStudentIds)
        );
      }
    } else {
      this.formData.append(
        'studentInstallment',
        this.partialStudentIds.toString()
      );
    }
    this.formData.append('notification', this.notificationText);
    this.formData.append('link_live', this.liveLink);
    
    this.formData.append(
      'notification_date',
      this.dateOfNotification.toString()
    );
    this.formData.append('course_id', this.CourseID.toString());

    this.studentServe.addNotification(this.formData).subscribe(
      (res) => {
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم  إرسال الاشعار بنجاح ',
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'لم يتم  إرسال الاشعار بنجاح ',
        });
      }
    );

    this.cashStudentIds = [];
    this.partialStudentIds = [];
  }

  filterPartialPaymentStudent() {
    debugger;
    this.studentServe
      .getAllCourseNotification(this.CourseID)
      .subscribe((response: any) => {
        this.notification = response;

        // *********
        this.newPartial_Student = this.partialPaymentStudent.filter(function (
          item
        ) {
          return !response.includes(item.user_id)
            ? true
            : response.splice(response.indexOf(item.user_id), 1) && false;
        });
        // ****
        //Filterd Here
        // this.notification.forEach((notify) => {
        //   debugger;
        //   // this.newPartial_Student = this.partialPaymentStudent.filter((i) => i.user_id !== notify.user_id)

        //   //forech
        //   this.partialPaymentStudent.forEach(singlePartia_student => {
        //     debugger;
        //     if(singlePartia_student.user_id != notify.user_id){
        //       debugger;
        //       this.newPartial_Student.push(singlePartia_student);

        //     }
        //   });
        //   console.log(this.newPartial_Student);

        // });
      });
  }

  filterCashPaymentStudent(cashStudenttoFilter: any) {
    this.studentServe
      .getAllCourseNotification(this.CourseID)
      .subscribe((response: any) => {
        this.notification = response;
        //Filterd Here
        this.notification.forEach((sendedStudent) => {
          //forech
          this.cashStudent.forEach((singleCashStudent) => {
            if (singleCashStudent.user_id !== sendedStudent.user_id) {
              this.newCashStudent.push(singleCashStudent);
            }
          });
          //  cashStudenttoFilter.filter((i) => i.user_id !== sendedStudent.user_id);
        });
        console.log(this.newCashStudent);
      });
  }

  watchUsersNotification() {

    let watchArrayIdsForSend: any[] = [];
    //partial Student
    this.allSendedNotificationStudentPartial.forEach((notify: any) => {
      if (notify.is_watch) {
        watchArrayIdsForSend.push(notify.id);
      }
    });

    //Cash Student
    this.allSendedNotificationStudentCash.forEach((notify: any) => {
      if (notify.is_watch) {
        watchArrayIdsForSend.push(notify.id);
      }
    });
    
    this.formData = new FormData();
    this.formData.append('ids', JSON.stringify(watchArrayIdsForSend));

    this.studentServe.watchUsersNotification(this.formData).subscribe(
      (res) => {
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم تفعيل الطلاب بأنهم شاهدوا الاشعار',
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'لم يتم تفعيل الطلاب بأنهم شاهدوا الاشعار',
        });
      }
    );
  }
}
