import { Component, Input, OnInit } from '@angular/core';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { CourseCategoryService } from '../../DashServices/course-category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'add-edit-category',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.css'],
  providers: [MessageService],

})
export class AddEditCatComponent implements OnInit {
  @Input() courseCategory: ICourseCategory;
  id: number;
  name: string;
  description: string;
  img_path: string;
  img: string;
  selectedFile: File = null;
  formData: FormData = new FormData();

  ngOnInit(): void {
    debugger;
    this.id = this.courseCategory.id;
    this.name = this.courseCategory.name;
    this.description = this.courseCategory.description;
    this.img_path = this.courseCategory.img_path,
    this.img = this.courseCategory.img;
  }

  constructor(
    private dashServe: CourseCategoryService,
    private messageService: MessageService,
    ) {}



  addEmployee() {
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
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);

    this.dashServe.addCourseCategory(this.formData).subscribe((res) => {
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة القسم بنجاح',
      });
      
      // this.toastr.success(res.toString());
      // this.courseCategory = null;

    });
  }

  updateEmployee() {
    if(this.selectedFile != null ){
    this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    
    this.dashServe.editCourseCategory(this.formData, this.id).subscribe((res) => {
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل بيانات القسم بنجاح',
      });
    
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
      }

    }
    }


}
