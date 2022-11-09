import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-curriculum',
  templateUrl: './add-curriculum.component.html',
  styleUrls: ['./add-curriculum.component.css'],
  providers:[MessageService]
})
export class AddCurriculumComponent implements OnInit {
  isOpen: boolean = true;
  CourseID: number = 0;

  //chips
  LuctrueNames: string[];
  LuctrueUrls: string[];
  CourseSectionName: string;
  coutNumber: number = 0;
  CurriculumSection: ICurriculumSection;
  CurriculumSectionList: ICurriculumSection[];

  //--chips
  constructor(
    private userServe: UserServiceService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {}

  addLuctrueSection() {
    debugger;
    this.LuctrueUrls;
    this.LuctrueNames;
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

      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة القسم الدورة بنجاح ',
      });
    
    },error=>{
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'حدثت مشكلة لم يتم إضافة القسم',
      });
    });
  }

  onOpenNextTab(val) {
    this.isOpen = val;
  }

  initialCourseId(val) {
    debugger;
    this.CourseID = val;
  }

  incrementCouter() {
    debugger;
    this.coutNumber++;
  }

  getAllCurriculumSection() {
    this.userServe;
  }
}
