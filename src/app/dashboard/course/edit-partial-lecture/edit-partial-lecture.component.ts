import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ICourse } from 'src/app/shared/models/Course';
import { ICurriculumSection, partialCourseObj } from 'src/app/shared/models/CurriculumSection';
import { UserServiceService } from 'src/app/user/user-service.service';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'edit-partial-lec',
  templateUrl: './edit-partial-lecture.component.html',
  styleUrls: ['./edit-partial-lecture.component.css']
})
export class EditPartialLectureComponent implements OnInit {
  LuctrueNames: string[] = [];
  LuctrueUrls: string[] = [];

  LuctrueName: string[] = [];
  LuctrueUrl: string[] = [];
  checked: boolean = false;
course:ICourse;
  LectrueUpdate: any;
  CourseSectionName: string;
  itemUrlId: number;
  @Input() CourseID: number;
  // @Input() CurrSection: ICurriculumSection[];
  @Input() ActiveEditMood: boolean = false;
  // CurriculumSection: ICurriculumSection;
  newLuctrueName: string;
  newLuctrueUrl: string;
  CurriculumSection: ICurriculumSection;
  section: any;
  approvedInstructors: any[];
  partialCourseObj: partialCourseObj;
  @Input() CurrSection: ICurriculumSection[];

  selectedStudent: any;
  paid_up: number = 0;

  constructor(
    private userServe: UserServiceService,
    private messageService: MessageService,
    private studentServe: StudentService){


    }

  countries: any[];
  ngOnInit(): void {
    debugger
    this.getStudents();
    console.log(this.CourseID);
    console.log(this.ActiveEditMood);

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
  }

  addLuctrueSection() {
    this.CourseSectionName;
    this.CourseID;
  }

  AddCurriculum() {
    debugger;

    this.CurriculumSection = {
      id: 0,
      course_id: this.CourseID,
      name: this.LuctrueNames,
      links: this.LuctrueUrls,
      title: this.CourseSectionName,
    };

    this.userServe.AddCurriculum(this.CurriculumSection).subscribe((res) => {
      this.successMessage();
    });
  }
  arr: any[] = [];
  //   {
  //     "paid_up":1000,
  //     "linkes_id": [
  //         1,2,3,6
  //     ]
  // }
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

    this.studentServe.Student_payment(
        this.selectedStudent.user_id,
        this.CourseID,
        this.partialCourseObj).subscribe((res: any) => {
        debugger;
        if (res) {
          debugger;
        }
      },err=>{
        console.log(err)
      });
  }

  SaveLecuture(newLink, newName) {
    debugger;
    const LectrueUpdateInfo = {
      link: newLink,
      name: newName,
      section_id: this.LectrueUpdate.section_id,
    };

    this.userServe
      .EditSectionLectrue(LectrueUpdateInfo, this.itemUrlId)
      .subscribe(
        (res) => {
          debugger;
          this.messageService.add({
            key: 'addInstructor',
            severity: 'success',
            summary: 'معهد الدراسات النفسية',
            detail: 'تم تعديل الحصة بنجاح',
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  DeleteLecture(LecId: any, sectionID: any, event: Event) {
    debugger;
    let SpecificSection: any;

    this.CurrSection.forEach((section: any) => {
      if (section.id == sectionID) {
        SpecificSection = section;
      }
    });

    SpecificSection.links.forEach((itemUrl: any) => {
      if (itemUrl.id == LecId) {
        debugger;
        this.itemUrlId = itemUrl.id;
      }
    });

    // this.confirmationServ.confirm({
    //     target: event.target,
    //     message: 'هل تريد حذف الدرس ؟',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         //confirm action
    //         this.userServe.DeleteSectionLectrue(this.itemUrlId).subscribe((res) => {
    //           debugger;
    //           //Alerts
    //           this.messageService.add({
    //             key: 'deleteSuccessMs',
    //             severity: 'success',
    //             summary: 'Qize',
    //             detail: 'تم حذف السؤال',
    //           });
    //           //refresh
    //           // this.getCoursesQuestion()
    //         });
    //     },
    //     reject: () => {
    //         //reject action
    //     }
    // });

    if (confirm('are you sure')) {
      debugger;
      this.userServe.DeleteSectionLectrue(this.itemUrlId).subscribe((res) => {
        debugger;
        this.messageService.add({
          key: 'deleteSuccessMs',
          severity: 'success',
          summary: 'Qize',
          detail: res.toString(),
        });
      });
    }
  }

  successMessage() {
    this.messageService.add({
      key: 'addInstructor',
      severity: 'success',
      summary: 'معهد الدراسات النفسية',
      detail: 'تم إضافة القسم بنجاح',
    });
  }

  getSectionName(section: any) {
    debugger;
    this.CourseSectionName = section.title;
    this.section = section;
  }

  saveNewSectionName() {
    let newTitle = {
      title: this.section.title,
    };
    this.userServe.updateSectionTitle(this.section.id, newTitle).subscribe(
      (res) => {
        debugger;
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم تعديل اسم القسم',
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          key: 'ImageErrorMs',
          severity: 'error',
          summary: 'معهد الدراسات النفسية',
          detail: error.message,
        });
      }
    );
  }

  getStudents() {
    //get Aprroved///////
    this.studentServe.getِِApprovedStudents().subscribe(
      (response) => {
        this.approvedInstructors = response;
        console.log(this.approvedInstructors);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ActivateAddEditEmpComp: boolean = false;

  closeCourseModal() {
    this.ActivateAddEditEmpComp = false;
    this.ActiveEditMood = false;
    debugger;
    //because Refill modal next time
    this.course = null;
    //refresh
  }
}
