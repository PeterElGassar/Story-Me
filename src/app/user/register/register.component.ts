import { IInstructor } from 'src/app/shared/models/instructor';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IInstructorSpec } from 'src/app/shared/models/instructorSpec';
import { InstructorService } from 'src/app/dashboard/DashServices/instructor.service';
import { ConfirmPasswordValidator } from 'src/app/shared/models/custome.Validators/confirm.password.directive';
import { MessageService } from 'primeng/api';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],

})
export class RegisterComponent implements OnInit {
  userInfo: any;
  token: string = '';
  instructor: IInstructor;
  selectedSpecs: IInstructorSpec[];
  instructorsSpecs: IInstructorSpec[];
  selectedFileCv: File = null;
  selectedFile: File = null;
  uploadedFiles: any[] = [];
  testArray: string[] = [];
  formData: FormData = new FormData();

  img_path: string;
  passwordIsMatch: boolean = false;

  first_name: string;
  second_name: string;
  last_name: string;
  description: string;

  phone: string;
  experience: number;
  // specialization: string;
  cv_path: string;
  instEmail: string;
  pass: string;
  confPass: string;

  logValue(x) {
    console.log(x);
  }

  checkMatch(x) {
    debugger

    if (x.value === this.pass) {
      debugger
      this.passwordIsMatch = true;
    } else {
      this.passwordIsMatch = false;

    }
  }


  insructorSubmitForm(form) {
    console.log(form)
  }
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    type: new FormControl(''),
  });

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }
  get gender() {
    return this.registerForm.get('gender');
  }

  // registerInstructorForm =  new FormGroup({
  //   fName: new FormControl('', [Validators.required,Validators.maxLength(20)]),
  //   sName: new FormControl('', [Validators.required,Validators.maxLength(20)]),
  //   lName: new FormControl('', [Validators.required,Validators.maxLength(20)]),

  //   email: new FormControl('',[ Validators.required,Validators.email]),
  //   phone: new FormControl('',[ Validators.required]),
  //   experienceYears: new FormControl('',[ Validators.required]),

  //   password: new FormControl('', Validators.required),
  //   password_confirmation: new FormControl('',
  //   [Validators.required,
  //     ConfirmPasswordValidator.validateConfirmpassword]),
  //   type: new FormControl(''),
  // });

  // get fName() {
  //   return this.registerInstructorForm.get('fName');
  // }
  // get sName() {
  //   return this.registerInstructorForm.get('sName');
  // }
  // get lName() {
  //   return this.registerInstructorForm.get('lName');
  // }
  // get InstEmail() {
  //   return this.registerInstructorForm.get('email');
  // }
  // get Phone() {
  //   return this.registerInstructorForm.get('phone');
  // }
  // get experienceYears() {
  //   return this.registerInstructorForm.get('experienceYears');
  // }

  // get Instpassword_confirmation() {
  //   return this.registerInstructorForm.get('password_confirmation');
  // }

  // get InstPassword() {
  //   return this.registerInstructorForm.get('password');
  // }

  constructor(
    private authServe: AuthService,
    private router: Router,
    private dashServe: InstructorService,
    private fb: FormBuilder,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.loadInstructorsSpec();
    this.instructor = {
      id: 0,
      first_name: '',
      second_name: '',
      last_name: '',
      email: '',
      description: '',
      experience: 0,
is_aproved:"0",
      // specialization: '',
      phone: '',
      cv_path: '',
      img_path:
        'http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png',
    };
  }

  submitStudentForm(): void {
    // console.log(this.registerForm.getRawValue());
    this.authServe
      .CerateNewAccountStudent(this.registerForm.getRawValue())
      .subscribe((res: any) => {
        debugger;
        this.router.navigate(['/login']);
      },error=>{

      });
  }

  loadInstructorsSpec() {
    this.dashServe.getInstructorSpec().subscribe((data) => {
      debugger
      this.instructorsSpecs = data;
      // this.selectedSpecs = data;
    });
  }

  onUpload(event) {
    debugger;
    console.log(event);
    console.log(this.uploadedFiles);
    for (let file of event.target.files) {
      debugger;

      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles[0].name);
  }
  uploadCv(event) {
    debugger;
    this.selectedFileCv = <File>event.files[0];
  }

  uploadPhoto(event) {
    debugger;
    if (event.files[0] && event.files) {
      this.selectedFile = <File>event.files[0];
      debugger;

      let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (e: any) => {
        debugger;

        this.instructor.img_path = e.target.result;
      };
    }
  }



  addInstructor() {

    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }else{
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'اختر صورة المدرب',
      });
      return 
    }

    if (this.selectedFileCv != null) {
      // this.formData.append('selectedFileCv', this.selectedFileCv, this.selectedFileCv.name);
      this.formData.append('cv_file',this.selectedFileCv,this.selectedFileCv.name);
    }else{
      this.messageService.add({
        key: 'CVErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'اختر السيرة الذاتية للمدرب',
      });
      return
    }



    this.initalValuesToSend();
    //call serve
    this.dashServe.addInstructor(this.formData).subscribe((res) => {
      debugger;
      this.testArray = [];
      this.successMessage();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 4000);

    }, error => {
      console.log(error)
      this.warnMessage();
    });
  }




  showSticky() {
    debugger;
    this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
  }

  successMessage() {
    this.messageService.add({
      key: 'successMs',
      severity: 'success',
      summary: 'معهد الدراسات النفسية',
      detail: 'انتظر التواصل معك عبر الموبيل او ألاميل لتفعيل حسابك',
      sticky: true
    });
  }

  warnMessage() {
    this.messageService.add({
      key: 'warnMs',
      severity: 'warn',
      summary: 'معهد الدراسات النفسية',
      detail: 'تأكد من ان بياناتك صحيحة',
    });
  }


  initalValuesToSend() {
    //get all selected Spec And push it in the array
    if (this.selectedSpecs.length > 0) {
      this.selectedSpecs.forEach((item) => {
        this.testArray.push(item.id.toString());
        console.log(this.testArray);
      });
      this.formData.append('specialtyIds', JSON.stringify(this.testArray));
    }
    debugger;
    this.formData.append('cv_file', this.selectedFileCv, this.selectedFileCv.name);
    this.formData.append('img', this.selectedFile, this.selectedFile.name);
    this.formData.append('selectedFileCv', this.selectedFileCv, this.selectedFileCv.name);
    this.formData.append('first_name', this.first_name);
    this.formData.append('second_name', this.second_name);
    this.formData.append('last_name', this.last_name);
    this.formData.append('email', this.instEmail);
    this.formData.append('description', this.description);
    this.formData.append('phone', this.phone);
    this.formData.append('experience', this.experience.toString());
  }

}
