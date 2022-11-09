import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavDashComponent } from './nav-dash/nav-dash.component';
import { UserHomeComponent } from './home/home.component';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { ShowCatComponent } from './course-category/show-cat/show-cat.component';
import { AddEditCatComponent } from './course-category/add-edit-cat/add-edit-cat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { TableModule } from 'primeng/table';
import { CourseComponent } from './course/course.component';
import { ShowCourComponent } from './course/show-cour/show-cour.component';
import { AddEditCourComponent } from './course/add-edit-cour/add-edit-cour.component';
import { InstructorSpecComponent } from './instructor-spec/instructor-spec.component';
import { ShowInstSpecComponent } from './Instructor-spec/show-inst-spec/show-inst-spec.component';
import { AddEditInstSpecComponent } from './Instructor-spec/add-edit-inst-spec/add-edit-inst-spec.component';
import { InstructorComponent } from './instructor/instructor.component';
import { ShowInstructorComponent } from './Instructor/show-instructor/show-instructor.component';
import { AddEditInstructorComponent } from './Instructor/add-edit-instructor/add-edit-instructor.component';
import { ArticalComponent } from './artical/artical.component';
import { ShowArticalsComponent } from './Artical/show-articals/show-articals.component';
import { AddEditArtiComponent } from './Artical/add-edit-arti/add-edit-arti.component';
import { DiplomasComponent } from './diplomas/diplomas.component';
import { ShowDiplomaComponent } from './diplomas/show-diploma/show-diploma.component';
import { AddEditDiplomaComponent } from './diplomas/add-edit-diploma/add-edit-diploma.component';
import { MatSelectModule } from '@angular/material/select';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChipsModule} from 'primeng/chips';
import { AddEditcurriculumComponent } from './course/add-editcurriculum/add-editcurriculum.component';

import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {EditorModule} from 'primeng/editor';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import {NgxPrintModule} from 'ngx-print';
import { StudentsComponent } from './students/students.component';
import { ShowStudentComponent } from './students/show-student/show-student.component';
import { AddEditStudentComponent } from './students/add-edit-student/add-edit-student.component';
import { ConfirmationService } from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { StudentCoursesComponent } from './students/student-courses/student-courses.component';
import { CoursePurchaseInfoComponent } from './course/course-purchase-info/course-purchase-info.component';
import { DiplomaPurchaseInfoComponent } from './diplomas/diploma-purchase-info/diploma-purchase-info.component';
import { OpenPartailCourseComponent } from './course/open-partail-course/open-partail-course.component';
import {CheckboxModule} from 'primeng/checkbox';

import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { PartialPurchaseUsersComponent } from './course/partial-purchase-users/partial-purchase-users.component';
import { EditPartialLectureComponent } from './course/edit-partial-lecture/edit-partial-lecture.component';

import { CoponeComponent } from './copone/copone.component';
import { ShowCoponeComponent } from './copone/show-copone/show-copone.component';
import { AddEditCoponeComponent } from './copone/add-edit-copone/add-edit-copone.component';
import { CourseLiveComponent } from './course-live/course.component';
import { ShowLiveCourComponent } from './course-live/show-cour/show-cour.component';
import { AddEditLiveCourComponent } from './course-live/add-edit-cour/add-edit-cour.component';
import { AddCourseNotifyComponent } from './course-live/add-course-notify/add-course-notify.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavDashComponent,
    UserHomeComponent,
    CourseCategoryComponent,
    ShowCatComponent,
    AddEditCatComponent,
    CourseComponent,
    ShowCourComponent,
    AddEditCourComponent,
    InstructorSpecComponent,
    ShowInstSpecComponent,
    AddEditInstSpecComponent,
    InstructorComponent,
    ShowInstructorComponent,
    ArticalComponent,
    ShowArticalsComponent,
    AddEditArtiComponent,
    DiplomasComponent,
    ShowDiplomaComponent,
    AddEditDiplomaComponent,
    AddEditcurriculumComponent,
    AddEditInstructorComponent,
    ContactUsPageComponent,
    StudentsComponent,
    ShowStudentComponent,
    AddEditStudentComponent,
    DashboardHomeComponent,
    StudentCoursesComponent,
    CoursePurchaseInfoComponent,
    DiplomaPurchaseInfoComponent,
    OpenPartailCourseComponent,
    EditPartialLectureComponent,
    PartialPurchaseUsersComponent,
    CoponeComponent,
    ShowCoponeComponent,
    AddEditCoponeComponent,
    CourseLiveComponent,
    ShowLiveCourComponent,
    AddEditLiveCourComponent,
    AddCourseNotifyComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    InputNumberModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FileUploadModule,
    HttpClientModule,
    MatFormFieldModule,
    ChipsModule,
    AccordionModule,
    ToastModule,
    ConfirmPopupModule,
    EditorModule,
    InputMaskModule,
    DropdownModule,
    TabViewModule,
    ToggleButtonModule,
    NgxPrintModule,
    RadioButtonModule,
    DropdownModule,
    CheckboxModule,
    InputSwitchModule,
    TooltipModule,
    MatButtonModule
  ],
  //for use them in anyother Modulessssss
  exports:[
    AddEditCourComponent,
    AddEditcurriculumComponent,
    AddEditInstructorComponent

  ],providers:[
    ConfirmationService
  ]
})
export class DashboardModule {}
