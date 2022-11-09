import { LoginComponent } from './login/login.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { AllDiplomasComponent } from './all-diplomas/all-diplomas.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserComponent } from './user.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { RegisterComponent } from './register/register.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { AuthGuard } from '../core/gruads/auth.guard';
import { AllArticalsComponent } from './all-articals/all-articals.component';
import { ArticalDetailsComponent } from './artical-details/artical-details.component';
import { DiplomasDetailsComponent } from './diplomas-details/diplomas-details.component';
import { DipDetailsComponent } from './dip-details/dip-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShowCertificateComponent } from './show-certificate/show-certificate.component';
import { AuthAsInstructorGuard } from '../core/gruads/auth-as-instructor.guard';
import { AuthAsStudent } from '../core/gruads/auth-as-student.ts.guard';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { JoinAsInstructorComponent } from './join-as-instructor/join-as-instructor.component';
import { OurCertificateComponent } from './our-certificate/our-certificate.component';
import { ShowDiplomaCertificateComponent } from './show-diploma-certificate/show-diploma-certificate.component';
import { WatchLiveComponent } from './watch-live/watch-live.component';

const routes: Routes =
[
  // {
  //   path: '',
  //   component: UserComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: UserComponent,
  //     },
  //   ],
  // },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent,
      },
    ],
  },

  {
    path: 'course-details',
    component: UserComponent,
    children: [
      {
        path: ':id',
        component: CourseDetailsComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'courses',
        component: AllCoursesComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'diplomas',
        component: AllDiplomasComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'articals',
        component: AllArticalsComponent,
      },
    ],
  },
  {path: 'instructor-profile',
  // canActivate:[AuthGuard],
  component: UserComponent,children: [
    
      {
        path: ':id',
        component: InstructorProfileComponent,
      },
    ],
  },
  {path: 'artical-detials',component: UserComponent,children: [
      {
        path: ':id',
        component: ArticalDetailsComponent,
      },
    ],
  },
  {path: 'diploma-detials',component: UserComponent,children: [
      {
        path: ':id',
        component: DiplomasDetailsComponent,
      },
    ],
  },
  {
    path: 'show-certificate',
  component: UserComponent,children: [
      {
        path: ':id',
        component: ShowCertificateComponent,
      },
    ],
  },
  {
    path: 'show-diploma-certificate',
  component: UserComponent,children: [
      {
        path: ':id',
        component: ShowDiplomaCertificateComponent,
      },
    ],
  },
  {
    path: 'show-certificate',
  component: UserComponent,children: [
      {
        path: ':courseId/:userId',
        component: ShowCertificateComponent,
      },
    ],
  },
  {
    path: 'my-courses',
  component: UserComponent,children: [
      {
        path: ':id',
        component: StudentCoursesComponent,
      },
    ],
  },
  {path: 'diploma-detials2',component: UserComponent,children: [
      {
        path: ':id',
        component: DipDetailsComponent,
      },
    ],
  },

  {path: '',component: UserComponent,children: [
      {
        path: 'student-profile',
        component: StudentProfileComponent,
      },
    ],
  },

  {path: '',component: UserComponent,children: [
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
    ],
  },

  {path: '',component: UserComponent,children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'join-us',
        component: JoinAsInstructorComponent,
      },
    ],
  },
  {path: '',component: UserComponent,children: [
      {
        path: 'our-certificate',
        component: OurCertificateComponent,
      },
    ],
  },
  {path: 'watch-live',
  canActivate:[AuthGuard,AuthAsStudent],
  component: UserComponent,children: [
      {
        path: ':id',
        component: WatchLiveComponent,

      },
    ],
  },
  {
  path: 'instructor-dashboard',
  canActivate:[AuthGuard,AuthAsInstructorGuard],
  component: UserComponent,children: [
    
      {
        path: ':id',
        component: InstructorDashboardComponent,
      },
    ],
  },
  // { path: ":id", component: CourseDetailsComponent },
  // { path: "/course-details:id", component: CourseDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
