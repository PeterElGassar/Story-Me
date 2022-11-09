import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeQuizComponent } from './home-quiz/home-quiz.component';
import { QuizComponent } from './quiz.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: '',
        component: HomeQuizComponent,
      },
    ],
  },
  {
    path: 'add-course-questions',
    component: QuizComponent,
    children: [
      {
        path: ':id',
        component: HomeQuizComponent,
      },
    ],
  },
  {
    path: 'student-quiz',
    component: QuizComponent,
    children: [
      {
        path: ':id',
        component: StudentQuizComponent,
      },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
