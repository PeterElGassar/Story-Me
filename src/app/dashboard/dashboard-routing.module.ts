import { InstructorSpecComponent } from './instructor-spec/instructor-spec.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseComponent } from './course/course.component';
import { DiplomasComponent } from './diplomas/diplomas.component';
import { InstructorComponent } from './instructor/instructor.component';
import { ArticalComponent } from './artical/artical.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import { StudentsComponent } from './students/students.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { StudentCoursesComponent } from './students/student-courses/student-courses.component';
import { CoursePurchaseInfoComponent } from './course/course-purchase-info/course-purchase-info.component';
import { PartialPurchaseUsersComponent } from './course/partial-purchase-users/partial-purchase-users.component';
import { CoponeComponent } from './copone/copone.component';
import { DiplomaPurchaseInfoComponent } from './diplomas/diploma-purchase-info/diploma-purchase-info.component';
import { CourseLiveComponent } from './course-live/course.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   children: [
  //     {
  //       path: 'dash',
  //       component: DashboardComponent,
  //     },
  //   ],
  // },
  //test-1
  // {
  //   path: 'cont',
  //   component: DashboardComponent,
  //   children: [
  //     {
  //       path: 'dashboard/cont',
  //       component: NavDashComponent,
  //     },
  //   ],
  // },
  //test-2
  // {path:'',component:DashboardComponent},
  // {path:'cont1',component:ContentOneComponent},
  // {path:'cont2',component:ContentTowComponent},
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
    ],
  },
 
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'course-category',
        component: CourseCategoryComponent,
      },
    ],
  },
  
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'courses',
        component: CourseComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'open-live-courses',
        component: CourseLiveComponent,
      },
    ],
  },
 
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'coupons',
        component: CoponeComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'diplomas',
        component: DiplomasComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'instructors-spec',
        component: InstructorSpecComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'instructors',
        component: InstructorComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'articals',
        component: ArticalComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'contact-us',
        component: ContactUsPageComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent,
      },
    ],
  },
  {
    path: 'student-courses',
    component: DashboardComponent,
    children: [
      {
        path: ':id/:name',
        component: StudentCoursesComponent,
      },
    ],
  },
  {
    path: 'purchase-course-info',
    component: DashboardComponent,
    children: [
      {
        path: ':id/:name',
        component: CoursePurchaseInfoComponent,
      },
    ],
  },
  {
    path: 'purchase-diploma-info',
    component: DashboardComponent,
    children: [
      {
        path: ':id/:name',
        component: DiplomaPurchaseInfoComponent,
      },
    ],
  },
  {
    path: 'partial-purchase-users',
    component: DashboardComponent,
    children: [
      {
        path: ':id/:name',
        component: PartialPurchaseUsersComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
