import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserComponent } from '../user/user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFootreComponent } from './user-footre/user-footre.component';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
// import {CarouselModule} from 'primeng/carousel';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { ArticalsComponent } from './articals/articals.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AllDiplomasComponent } from './all-diplomas/all-diplomas.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LatestDiplomasComponent } from './latest-diplomas/latest-diplomas.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';

import { TabViewModule } from 'primeng/tabview';
//import Dashboadrd module for using childern
import { DashboardModule } from '../dashboard/dashboard.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { AddCurriculumComponent } from './add-curriculum/add-curriculum.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {StepsModule} from 'primeng/steps';
import { EditCourseComponent } from './instructor-profile/edit-course/edit-course.component';
import {ButtonModule} from 'primeng/button';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AddEditStrudentComponent } from './student-profile/add-edit-strudent/add-edit-strudent.component';
import { ChangePasswordStrudentComponent } from './student-profile/change-password-strudent/change-password-strudent.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {BadgeModule} from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AddCourseComponent } from './instructor-profile/add-course/add-course.component';
import { EditCurrciulumFormComponent } from './instructor-profile/edit-currciulum-form/edit-currciulum-form.component';
import { CourseLecturesComponent } from './course-details/course-lectures/course-lectures.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {SplitButtonModule} from 'primeng/splitbutton';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DataViewModule} from 'primeng/dataview';
import {PaginatorModule} from 'primeng/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../interceptor/loading.interceptors';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import {RatingModule} from 'primeng/rating';
import { SharedModule } from 'primeng/api';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllArticalsComponent } from './all-articals/all-articals.component';
import { ArticalDetailsComponent } from './artical-details/artical-details.component';
import { DiplomasDetailsComponent } from './diplomas-details/diplomas-details.component';
import { DiplomaLuctruesComponent } from './diplomas-details/diploma-luctrues/diploma-luctrues.component';
//video
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

//video

import { DipDetailsComponent } from './dip-details/dip-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {InputMaskModule} from 'primeng/inputmask';
import { CertificateComponent } from './certificate/certificate.component';
import { ShowCertificateComponent } from './show-certificate/show-certificate.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { JoinAsInstructorComponent } from './join-as-instructor/join-as-instructor.component';
import { OurCertificateComponent } from './our-certificate/our-certificate.component';
import { ShowDiplomaCertificateComponent } from './show-diploma-certificate/show-diploma-certificate.component';
import { CourseInfoComponent } from './instructor-dashboard/course-info/course-info.component';
import {EditorModule} from 'primeng/editor';
//print pdf
import {NgxPrintModule} from 'ngx-print';

import {RadioButtonModule} from 'primeng/radiobutton';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CourseLecturesPartialComponent } from './course-details/course-lectures-partial/course-lectures-partial.component';
import {MatMenuModule} from '@angular/material/menu';
import { WatchLiveComponent } from './watch-live/watch-live.component';

@NgModule({
  declarations: [
    UserNavbarComponent,
    UserComponent,
    UserHomeComponent,
    UserFootreComponent,
    LatestCoursesComponent,
    ArticalsComponent,
    CourseDetailsComponent,
    AllCoursesComponent,
    AllDiplomasComponent,
    BreadcrumbComponent,
    LatestDiplomasComponent,
    InstructorProfileComponent,
    AddCurriculumComponent,
     EditCourseComponent,
    StudentProfileComponent,
    AddEditStrudentComponent,
    ChangePasswordStrudentComponent,
    LoginComponent,
    RegisterComponent,
    AddCourseComponent,
    EditCurrciulumFormComponent,
    CourseLecturesComponent,
    InstructorDashboardComponent,
    AllArticalsComponent,
    ArticalDetailsComponent,
    DiplomasDetailsComponent,
    DiplomaLuctruesComponent,
    DipDetailsComponent,
    ContactUsComponent,
    CertificateComponent,
    ShowCertificateComponent,
    StudentCoursesComponent,
    AboutUsComponent,
    JoinAsInstructorComponent,
    OurCertificateComponent,
    ShowDiplomaCertificateComponent,
    CourseInfoComponent,
    CourseLecturesPartialComponent,
    WatchLiveComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CarouselModule,
    AccordionModule,
    PanelModule,
    TabViewModule,
    DashboardModule,
    MultiSelectModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ChipsModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    BadgeModule,
    TableModule,
    TagModule,
    TabsModule,
    SplitButtonModule,
    MessagesModule,
    MessageModule,
    DataViewModule,
    PaginatorModule,
    NgxSpinnerModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    RatingModule,
    SharedModule,
    NgxPaginationModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    InputMaskModule,
    EditorModule,
    NgxPrintModule,
    MatMenuModule,
    RadioButtonModule,
    TranslateModule.forRoot({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
        TranslateModule
  ],
  exports:[UserFootreComponent,UserNavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },

  ]
})
export class UserModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}