import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs/internal/Observable';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';
import { InstructorService } from 'src/app/dashboard/DashServices/instructor.service';
import { ICourse } from 'src/app/shared/models/Course';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';
import { IInstructor } from 'src/app/shared/models/instructor';
import { AuthService } from '../auth.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css'],
})
export class InstructorDashboardComponent implements OnInit {
  //****====Properties======****** */
  //****====Properties======****** */
  currentUser$: Observable<any>;

  InstructorCoursesList: ICourse[];
  course: ICourse;
  CourseCurriculam:ICurriculumSection
  //pagination
  rows = 5;
  recourdNumber: number;
  page: number=1;
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  ActivateCourseInfo: boolean = false;
  IdToPath: number = 0;
  singleInstructor: any[]=[];
  //****====Properties======****** */
  //****====Properties======****** */

  constructor(
    private dashServe: CourseService,
    private instructorServe: InstructorService,
    private activatedRoute: ActivatedRoute,
    private userServe: UserServiceService,
    private authServe: AuthService,

  ) {
    debugger;
    if (this.InstructorCoursesList != null)
      this.recourdNumber = this.InstructorCoursesList.length;
  }

  ngOnInit(): void {
    this.loadInstructorCourse();
    this.getInstructor();
    this.currentUser$ = this.authServe.currentUser$;

    // this.asignValues();
  }

  loadInstructorCourse() {
    this.instructorServe
      .getInstructorCourses(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((response) => {
          debugger;
          this.InstructorCoursesList = response;
          console.log(this.InstructorCoursesList);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getInstructor() {
    this.instructorServe
      .getSengilInstructor(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (response:any) => {
          this.singleInstructor = response;
          console.log(this.singleInstructor)
        },
        (error) => {
          console.log(error);
        }
      );
  }



  editClick(course: any) {
    this.modalTitle = 'تعديل بيانات الدورة';
    this.ActivateAddEditEmpComp = true;
    debugger;
    this.course = course;
  }
  showCourseInfo(course: any) {
    this.modalTitle = 'تعديل بيانات الدورة';
    this.ActivateCourseInfo = true;
    debugger;
    this.course = course;
  }

  closeCourseModal() {
    this.ActivateAddEditEmpComp = false;
    this.ActivateCourseInfo = false;
    debugger;
    //because Refill modal next time
    this.course = null;
    //refresh
    this.loadInstructorCourse();
  }
  closeCourseDetailsModal() {
    this.ActivateAddEditEmpComp = false;
    this.ActivateCourseInfo = false;
    debugger;
    //because Refill modal next time
    this.course = null;
  }

  clear(table: Table) {
    table.clear();
  }

  deleteClick(courseId: number) {
    if (confirm('are you sure')) {
      debugger;
      this.dashServe.deleteCourse(courseId.toString()).subscribe((res) => {
        debugger;

        this.loadInstructorCourse();
        alert(res.toString());
      });
    }
  }

  initCurriculamToPath(courseObj:any) {
    debugger;
    this.userServe.getCurriculumsOfOneCourse(courseObj.id).subscribe(res=>{
      debugger;
      this.CourseCurriculam =res; 
      this.ActivateAddEditEmpComp = true;
    });
    this.modalTitle = 'إضافة قسم دورة';
      this.IdToPath =courseObj.id;

    //call function initail value of Curriculam
    // this.CourseCurriculam
   
    // this.asignValues();
  }

  asignValues(){
    //1-get course crru
    this.userServe.getCurriculumsOfOneCourse(this.IdToPath).subscribe(res=>{
      debugger;
      this.CourseCurriculam =res; 
    });
  }
  // updateSectionName(){
  //   //1-get course crru
  //   this.instructorServe.updateSectionTitle(this.IdToPath).subscribe(res=>{
  //     debugger;
  //     this.CourseCurriculam =res; 
  //   });
  // }

  
}
