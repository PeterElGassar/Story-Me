import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IStudent } from 'src/app/shared/models/Student';
import { AuthService } from 'src/app/user/auth.service';
import { StudentService } from '../../DashServices/student.service';

@Component({
  selector: 'add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css'],
  providers:[MessageService]
})
export class AddEditStudentComponent implements OnInit {

  instructorForm: FormGroup;
  @Input() student: IStudent;

  id: 0;
  email: string;
  gender: string;
  name: string;
  password: string='';
  password_confirmation: string='';

  selectedFile: File = null;
  selectedFileCv: File = null;
  formData= new FormData();
  //for dropdown

  testArray: string[] = [];
  ngOnInit(): void {
    debugger;
    this.id = this.student.id;
    this.name = this.student.name;
    this.email = this.student.email;
    this.gender = this.student.gender;


  }

  constructor(
    private dashServe: StudentService,
    private messageService: MessageService,
    private authServe: AuthService,
  ) {}

  addInstructor() {
  
    this.formData.append('name', this.name);
    this.formData.append('email', this.email);
    this.formData.append('gender', this.email);
    //call serve
    this.dashServe.addInstructor(this.formData).subscribe((res) => {
        debugger;
        this.messageService.add({
          key: 'addInstructor',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم إضافة الطالب بنجاح ',
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
    this.formData.append('name', this.name);
    this.formData.append('email', this.email);
    this.formData.append('gender', this.gender);
    this.formData.append('password_confirmation', this.password_confirmation);
    this.formData.append('password', this.password);


    this.dashServe.editInstructor(this.formData, this.id).subscribe((res) => {
      debugger;
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل بيانات الطالب بنجاح ',
      });
    });
  }

  // submitInstructor(){
  //   console.log(this.instructorForm.value)
  // }





  // get Name() {
  //   return this.registerForm.get('name');
  // }
  // get Email() {
  //   return this.registerForm.get('email');
  // }
  // get Password() {
  //   return this.registerForm.get('password');
  // }
  // get Password_confirmation() {
  //   return this.registerForm.get('password_confirmation');
  // }
  // get Gender() {
  //   return this.registerForm.get('gender');
  // }


  // submitStudentForm(): void {
  //   console.log(this.registerForm.getRawValue());
  //   this.authServe
  //     .CerateNewAccountStudent(this.registerForm.getRawValue())
  //     .subscribe((res: any) => {
  //       debugger;

  //       this.messageService.add({
  //         key: 'addInstructor',
  //         severity: 'success',
  //         summary: 'معهد الدراسات النفسية',
  //         detail: 'تم إضافة الطالب بنجاح ',
  //       });
  //     },error=>{
  //       console.log(error);
  //     });
  // }
}
