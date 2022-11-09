import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ICourseCategory } from 'src/app/shared/models/CourseCategory';
import { CourseCategoryService } from '../../DashServices/course-category.service';

@Component({
  selector: 'show-cat',
  templateUrl: './show-cat.component.html',
  styleUrls: ['./show-cat.component.css'],
  providers: [MessageService,ConfirmationService],

})
export class ShowCatComponent implements OnInit {
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  courseCategories: ICourseCategory[];
  courseCategory: ICourseCategory;
  //pagination
  rows = 5;
  recourdNumber: number;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    img: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private dashServe: CourseCategoryService,
     private http: HttpClient,
     private messageService: MessageService,
     private confirmationServ:ConfirmationService) {
   
      
    if (this.courseCategories != null) {
      this.recourdNumber = this.courseCategories.length;
    }
  }

  ngOnInit(): void {
    this.getCourseCategories();
  }
  // get f() {
  //   return this.myForm.controls;
  // }

  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.myForm.patchValue({
  //       fileSource: file,
  //     });
  //   }
  // }

  // submit() {
  //   const formData = new FormData();
  //   formData.append('img', this.myForm.get('fileSource').value);
  //   formData.append('name', this.myForm.get('name').value);
  //   formData.append('img', this.myForm.get('fileSource').value);
  //   console.log(formData);
  //   this.http
  //     .post('http://psychiatry.ajathy.com/api/sections_Coursess', formData)
  //     .subscribe((res) => {
  //       debugger;
  //       console.log(res);
  //       alert('Uploaded Successfully.');
  //     });
  // }

  getCourseCategories() {
    this.dashServe.getCoursesCategory().subscribe(
      (response) => {
        this.courseCategories = response;
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
    this.modalTitle = 'إضافة قسم جديد';
    this.ActivateAddEditEmpComp = true;

    // في حالة الاضافة
    this.courseCategory = {
      id: 0,
      name: '',
      description: '',
      img_path: 'http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png',
      img: 'placeholder.png',
    };
  }

  editClick(courseCat: any) {
    this.modalTitle = 'تعديل بيانات القسم';
    this.ActivateAddEditEmpComp = true;
    this.courseCategory = courseCat;
  }

  closeEmpModal() {
    debugger
    this.ActivateAddEditEmpComp = false;
    this.courseCategory = null;
    //refresh
    this.getCourseCategories();
  }

  deleteClick(item: ICourseCategory) {
    // if (confirm("are you sure")) {
    //   debugger
    //   this.dashServe.deleteCourseCategory(item.id.toString()).subscribe(res => {
    //     debugger

    //     alert(res.toString());
    //     this.getCourseCategories();
    //   });
    // }


    this.confirmationServ.confirm({
      target: event.target,
      message: 'هل تريد حذف الدورة ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
          this.dashServe.deleteCourseCategory(item.id.toString()).subscribe(res => {
            debugger;
            //Alerts
            this.messageService.add({
              key: 'removeInstructor',
              severity: 'success',
              summary: 'معهد الدراسات النفسية',
              detail: 'تم حذف الدورة',
            });
            //refresh
            this.getCourseCategories()
          });
      },
      reject: () => {
          //reject action
      }
  });

  }

}
