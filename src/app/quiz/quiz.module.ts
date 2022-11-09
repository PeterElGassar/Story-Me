import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { HomeQuizComponent } from './home-quiz/home-quiz.component';
import { QuizComponent } from './quiz.component';
import { QuizAdminPanelComponent } from './quiz-admin-panel/quiz-admin-panel.component';
import { StudentFinalResultComponent } from './student-final-result/student-final-result.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    QuizComponent,
    HomeQuizComponent,
    QuizAdminPanelComponent,
    StudentFinalResultComponent,
    StudentQuizComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    RadioButtonModule,
    ToastModule,
    ConfirmPopupModule
    
  ],
})
export class QuizModule {}
