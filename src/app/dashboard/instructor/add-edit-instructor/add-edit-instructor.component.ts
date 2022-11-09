import { FormGroup, FormControl } from '@angular/forms';
import { IInstructorSpec } from './../../../shared/models/InstructorSpec';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IInstructor } from 'src/app/shared/models/instructor';
import { InstructorService } from '../../DashServices/instructor.service';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'add-edit-instructor',
  templateUrl: './add-edit-instructor.component.html',
  styleUrls: ['./add-edit-instructor.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AddEditInstructorComponent implements OnInit {
  instructorForm: FormGroup;
  @Input() instructor: IInstructor;

  id: 0;
  first_name: string;
  second_name: string;
  last_name: string;
  description: string;
  phone: string;
  experience: number;
  cv_path: string;
  img_path: string;
  email: string;

  selectedFile: File = null;
  selectedFileCv: File = null;
  formData: FormData = new FormData();
  //for dropdown
  instructorsSpecs: IInstructorSpec[];
  //for submit
  selectedSpecs: IInstructorSpec[];
  testArray: string[] = [];

  ngOnInit(): void {
    debugger;
    this.id = this.instructor.id;
    this.first_name = this.instructor.first_name;
    this.second_name = this.instructor.second_name;
    this.last_name = this.instructor.last_name;
    this.description = this.instructor.description;
    // this.specialization = this.instructor.specialization;
    this.phone = this.instructor.phone;
    this.email = this.instructor.email;
    this.experience = this.instructor.experience;
    this.cv_path = this.instructor.cv_path;
    this.img_path = this.instructor.img_path;
    this.loadInstructorsSpec();
  }

  constructor(
    private dashServe: InstructorService,
    private messageService: MessageService
  ) {}

  addInstructor() {
    //get all selected Spec And push it in the array
    if (this.selectedSpecs.length > 0) {
      this.testArray=[];
      this.selectedSpecs.forEach((item) => {
        this.testArray.push(item.id.toString());
        console.log(this.testArray);
      });
      this.formData.append('specialtyIds', JSON.stringify(this.testArray));
    }

    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    } 
    // else {
    //   this.messageService.add({
    //     key: 'ImageErrorMs',
    //     severity: 'error',
    //     summary: 'معهد الدراسات النفسية',
    //     detail: 'اختر صورة المدرب',
    //   });
    //   return;
    // }

    if (this.selectedFileCv != null) {
      this.formData.append(
        'cv_file',
        this.selectedFileCv,
        this.selectedFileCv.name
      );
    } 
    // else {
    //   this.messageService.add({
    //     key: 'CVErrorMs',
    //     severity: 'error',
    //     summary: 'معهد الدراسات النفسية',
    //     detail: 'اختر السيرة الذاتية للمدرب',
    //   });
    //   return;
    // }

    // this.formData.append('selectedFileCv',this.selectedFileCv,this.selectedFileCv.name);

    this.formData.append('first_name', this.first_name);
    this.formData.append('second_name', this.second_name);
    this.formData.append('last_name', this.last_name);
    this.formData.append('description', this.description);
    this.formData.append('phone', this.phone);
    this.formData.append('email', this.email);
    this.formData.append('experience', this.experience.toString());
    //call serve
    this.dashServe.addInstructor(this.formData).subscribe((res) => {
        debugger;
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم إضافة المدرب بنجاح ',
        });

        this.testArray = [];
        // this.toastr.success(res.toString());
        // this.courseCategory = null;
      },
      (error) => {
        debugger;

        console.log(error);
      }
    );
  }

  updateCourse() {
    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }

    if (this.selectedFileCv != null) {
      // this.formData.append('selectedFileCv', this.selectedFileCv, this.selectedFileCv.name);
      this.formData.append(
        'cv_file',
        this.selectedFileCv,
        this.selectedFileCv.name
      );
    }

    //get all selected Spec And push it in the array
    if (this.selectedSpecs.length > 0) {
      this.selectedSpecs.forEach((item) => {
        this.testArray.push(item.id.toString());
        debugger;
        console.log(this.testArray);

        debugger;
      });
      this.formData.append('specialtyIds', JSON.stringify(this.testArray));
    }

    this.formData.append('first_name', this.first_name);
    this.formData.append('second_name', this.second_name);
    this.formData.append('last_name', this.last_name);
    this.formData.append('description', this.description);
    this.formData.append('phone', this.phone);
    this.formData.append('email', this.email);
    this.formData.append('experience', this.experience.toString());

    this.dashServe.editInstructor(this.formData, this.id).subscribe((res) => {
      debugger;
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل بيانات المدرب بنجاح ',
      });
    });
  }

  uploadPhoto(event) {
    if (event.files[0] && event.files) {
      this.selectedFile = <File>event.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (e: any) => {
        this.img_path = e.target.result;
      };
    }
  }

  // submitInstructor(){
  //   console.log(this.instructorForm.value)
  // }

  loadInstructorsSpec() {
    this.dashServe.getInstructorSpec().subscribe((data) => {
      this.instructorsSpecs = data;
      this.selectedSpecs = data;
    });
  }

  uploadedFiles: any[] = [];

  onUpload(event) {
    console.log(event);
    console.log(this.uploadedFiles);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles[0].name);
  }

  uploadCv(event) {
    debugger;
    this.selectedFileCv = <File>event.files[0];
  }
}
