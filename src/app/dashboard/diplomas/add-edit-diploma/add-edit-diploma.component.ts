import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICourse } from 'src/app/shared/models/Course';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { IFullName } from 'src/app/shared/models/IFullName';
import { IInstructor } from 'src/app/shared/models/instructor';
import { CourseService } from '../../DashServices/course.service';
import { DiplomaService } from '../../DashServices/diploma.service';

@Component({
  selector: 'add-edit-diploma',
  templateUrl: './add-edit-diploma.component.html',
  styleUrls: ['./add-edit-diploma.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AddEditDiplomaComponent implements OnInit {
  @Input() diploma: IDiploma;
  id: number;
  name: string;
  description: string;
  img_path: string;
  price_before_discount: number;
  price_after_discount: number;
  courses_number: number;
  img: string;
  created_at: string;
  rate_instructor: number;

  selectedFile: File = null;
  formData: FormData = new FormData();

  //for dropdown
  Courses: ICourse[];
  courseInstructors: IInstructor[];

  //for submit
  selectedCourses: any[];
  selectedinstructors: IInstructor[];
  selectedCourses2: ICourse[];
  selectedinstructors2: IInstructor[];

  testArray: string[] = [];
  testArray2: string[] = [];
  //  temp: number[];
  arrForTest: IFullName[] = [];
  selectedArrayInstructors: IFullName[] = [];

  ngOnInit(): void {
    //initail all Values From Input Varaible

    this.id = this.diploma.id;
    this.name = this.diploma.name;
    this.description = this.diploma.description;
    this.img_path = this.diploma.img_path;
    this.price_before_discount = this.diploma.price_before_discount;
    this.price_after_discount = this.diploma.price_after_discount;
    this.courses_number = this.diploma.courses_number;
    this.img = this.diploma.img;
    this.created_at = this.diploma.created_at;
    this.rate_instructor = this.diploma.rate_instructor;

    this.loadCourses();
    this.loadCourseInstructors();

    if(this.selectedinstructors){
      debugger

      this.selectedinstructors.forEach(element => {
        debugger
       const x:any = 
        this.selectedinstructors.filter((i) => i.id !== element.id);

        this.selectedArrayInstructors=x
      });  
    }

    // this.loadInstructors();
    // this.loadDiplomaCourses();
    // this.loadDiplomaInstructors();
  }

  constructor(
    private dashServe: DiplomaService,
    private courseServe: CourseService,
    private messageService: MessageService
  ) {}

  addCourse() {
    console.log(this.selectedCourses.length);
    
    //get all selected Courses And push it in the array
    if (this.selectedCourses.length > 0) {
      this.selectedCourses.forEach((item) => {
        this.testArray.push(item.id.toString());
        console.log(this.testArray);
      });
      this.formData.append('coursesIds', JSON.stringify(this.testArray));
    }
    debugger;

    //get all selected Instructors And push it in the array
    if (this.selectedArrayInstructors.length > 0) {
      this.selectedArrayInstructors.forEach((item) => {
        debugger;
        this.testArray2.push(item.id.toString());
      });
      this.formData.append('instructorIds', JSON.stringify(this.testArray2));
    }

    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    } else {
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'اختر صورة الدبلومة',
      });
      return;
    }

    if (this.rate_instructor !== null) {
      this.formData.append('rate_instructor', this.rate_instructor.toString());
    }
    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    this.formData.append(
      'price_before_discount',
      this.price_before_discount.toString()
    );
    this.formData.append(
      'price_after_discount',
      this.price_after_discount.toString()
    );

    this.dashServe.addDeploma(this.formData).subscribe((res) => {
      debugger;
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة الدبلومة بنجاح ',
      });
    });

    this.testArray = [];
    this.testArray2 = [];
  }

  updateCourse() {
    if (this.rate_instructor !== null) {
      this.formData.append('rate_instructor', this.rate_instructor.toString());
    }
    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }

    //get all selected Courses And push it in the array
    if (this.selectedCourses.length > 0) {
      this.selectedCourses.forEach((item) => {
        this.testArray.push(item.id.toString());
        console.log(this.testArray);
      });
      debugger;
      this.formData.append('coursesIds', JSON.stringify(this.testArray));
    }

    //get all selected Instructors And push it in the array
    debugger
    if (this.selectedArrayInstructors.length > 0) {
      debugger
      this.selectedArrayInstructors.forEach((item) => {
        this.testArray2.push(item.id.toString());
      });
      debugger;
      this.formData.append('instructorIds', JSON.stringify(this.testArray2));
    }

    this.formData.append('name', this.name);
    this.formData.append('description', this.description);
    this.formData.append(
      'price_before_discount',
      this.price_before_discount.toString()
    );
    this.formData.append(
      'price_after_discount',
      this.price_after_discount.toString()
    );

    this.dashServe.editDeploma(this.formData, this.id).subscribe((res) => {
      debugger;
      this.messageService.add({
        key: 'addInstructor',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل بيانات الدبلومة بنجاح ',
      });
    });

    this.testArray = [];
    this.testArray2 = [];
  }

  //just for refresh Input file
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

  //change
  onChangeInstructor(value) {
    // this.instructors_id = value;
  }

  onChangeCategory(value) {
    // this.sections_courses_id = value;
  }

  onInputBeforPrice(newValue) {
    debugger;
    this.price_before_discount = newValue.value;
  }

  onInputAfterPrice(newValue) {
    debugger;
    this.price_after_discount = newValue.value;
  }

  //loading Dropdowns
  loadCourses() {
    this.courseServe.getِِApprovedCourses().subscribe((data) => {
      this.Courses = data;
      this.selectedCourses = data;
    });
  }

  loadCourseInstructors() {
    debugger;
    this.dashServe.getAllInstructor().subscribe((data:any) => {
      debugger;
      this.courseInstructors = data;
      const x:IFullName[] = data;

      this.courseInstructors.forEach((element,i) => {
        debugger
        let temp:any[] = x.filter((entity) => entity.id == element.id);
        if(temp){
          this.selectedArrayInstructors.push({
            fullName:
              temp[0].first_name +' '+
              temp[0].second_name +' '+
              temp[0].last_name,
            id: temp[0].id,
          });

        }
      });  

      data.forEach((instructor: IInstructor) => {
        this.arrForTest.push({
          fullName:
            instructor.first_name +' '+
            instructor.second_name +' '+
            instructor.last_name,
          id: instructor.id,
        });
      });
      debugger
      this.selectedinstructors = data;
      // data.Instructors.forEach(element => {
      //   debugger
      //   this.selectedArrayInstructors = 
      //   data.Instructors.filter((i) => i.id !== element.id)
      // });  
      // basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);

    });
  }

  //Fill Courses Dropdowns
  // loadCourses() {
  //   this.dashServe.getAllCourses().subscribe((data) => {
  //     this.Courses = data;
  //     this.selectedCourses = data;
  //   });
  // };

  //Fill Instructors Dropdowns
  // loadInstructors() {
  //   this.dashServe.getAllInstructor().subscribe((data) => {
  //     this.courseInstructors = data;
  //   });
  // }

  //for marking Selected Instructors in update
  // loadDiplomaInstructors() {
  //   if(this.id){
  //     this.dashServe.getDiplomaInstructor(this.id.toString()).subscribe((data) => {
  //       this.selectedinstructors2 = data;
  //     });
  //   }
  // }

  //for marking Selected Courses in update
  // loadDiplomaCourses() {
  //   if(this.id){
  //     this.dashServe.getDiplomaCourses(this.id.toString()).subscribe((data) => {
  //       this.selectedCourses2 = data;
  //     });
  //   }
  // }
}
