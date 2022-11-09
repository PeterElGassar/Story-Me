import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ICopone } from 'src/app/shared/models/copone';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { CoponeService } from '../../DashServices/copone.service';
import { CourseCategoryService } from '../../DashServices/course-category.service';

@Component({
  selector: 'app-add-edit-copone',
  templateUrl: './add-edit-copone.component.html',
  styleUrls: ['./add-edit-copone.component.css'],
  providers: [MessageService],

})
export class AddEditCoponeComponent implements OnInit {

  @Input() courseCategory: ICopone;
  id: number;
  name: string;
  value: number;
  start_date: string;
  expire_date: string;
  
  selectedFile: File = null;
  formData: FormData = new FormData();

  ngOnInit(): void {
    debugger;
    this.id = this.courseCategory.id;
    this.name = this.courseCategory.name;
    this.value = this.courseCategory.value;
    this.start_date = this.courseCategory.start_date;
    this.expire_date = this.courseCategory.expire_date;
 
  }

  constructor(
    private dashServe: CoponeService,
    private messageService: MessageService,
    ) {}



  addEmployee() {

    this.formData.append('name', this.name);
    this.formData.append('value', this.value.toString());
    this.formData.append('start_date', this.start_date);
    this.formData.append('expire_date', this.expire_date);


    this.dashServe.addCopone(this.formData).subscribe((res) => {
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة  الكوبون بنجاح',
      });
      
      // this.toastr.success(res.toString());
      // this.courseCategory = null;

    });
  }

  updateEmployee() {

    this.formData.append('name', this.name);
    this.formData.append('value', this.value.toString());
    this.formData.append('start_date', this.start_date);
    this.formData.append('expire_date', this.expire_date);
    
    this.dashServe.editCopone(this.formData, this.id).subscribe((res) => {
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل بيانات الكوبون بنجاح',
      });
    
    });
  }


}
