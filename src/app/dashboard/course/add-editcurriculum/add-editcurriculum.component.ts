import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';
import { UserServiceService } from 'src/app/user/user-service.service';

@Component({
  selector: 'add-editcurriculum',
  templateUrl: './add-editcurriculum.component.html',
  styleUrls: ['./add-editcurriculum.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AddEditcurriculumComponent implements OnInit {
  LuctrueNames: string[] = [];
  LuctrueUrls: string[] = [];

  LuctrueName: string[] = [];
  LuctrueUrl: string[] = [];

  LectrueUpdate: any;
  CourseSectionName: string;
  itemUrlId: number;
  @Input() CourseID: number;
  @Input() CurrSection: ICurriculumSection[];
  @Input() ActiveEditMood: boolean = false;
  CurriculumSection: ICurriculumSection;
  newLuctrueName: string;
  newLuctrueUrl: string;

  section: any;

  constructor(
    private userServe: UserServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    debugger;
    console.log(this.CourseID);
    console.log(this.CurrSection);
    console.log(this.ActiveEditMood);
    debugger;
  }

  addLuctrueSection() {
    debugger;
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
      debugger;
      this.successMessage();
    });
  }

  EditLecture(LecId: any, sectionID: any) {
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
        this.LuctrueUrl = itemUrl.link;
        console.log(this.LuctrueUrl);
      }
    });

    SpecificSection.name.forEach((item: any) => {
      if (item.id == LecId) {
        debugger;
        this.LuctrueName = item.name;
        console.log(this.LuctrueName);
      }
    });

   

    this.LectrueUpdate = {
      name: this.LuctrueName[0],
      link: this.LuctrueUrl[0],
      section_id: sectionID,
    };
    
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
    this.userServe.updateSectionTitle(this.section.id, newTitle).subscribe(res=>{
      debugger;
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل اسم القسم',
      });
    },error=>{
console.log(error);
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: error.message,
      });
    });
  }
}
