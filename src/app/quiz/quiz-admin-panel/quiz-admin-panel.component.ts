import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnswer } from 'src/app/shared/models/Answer';
import { IQuestion } from 'src/app/shared/models/Question';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'quiz-admin-panel',
  templateUrl: './quiz-admin-panel.component.html',
  styleUrls: ['./quiz-admin-panel.component.css'],
  providers: [MessageService,ConfirmationService],
})
export class QuizAdminPanelComponent implements OnInit {
  QuizQuestion: IQuestion;
  AllQuestions: IQuestion[];

  questionText: string = '';
  questionID: number ;

  //make interface to this array to asign it
  Chooses: IAnswer[] = [
    { choose: 'choose-1', isCorrect: false },
    { choose: 'choose-2', isCorrect: false },
    { choose: 'choose-3', isCorrect: false },
    { choose: 'choose-4', isCorrect: false },
  ];

  correctAnswer: string = 'no answer yet';
  allOptions:any;
  ifAnyCkeckd: boolean = false;
  UpdateMood: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) document,
    private messageService: MessageService,
    private quizServe: QuizService,
    private confirmationServ:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCoursesQuestion();
  }

  onChange() {
    console.log(this.Chooses);
  }

  addNewQuestion() {
    debugger;

    //1- Check Question if empty
    if (this.questionText != '') {
      this.validateCkeckdOption();
      //Ckeck if User Not Choose Any Correct Answer
      if (!this.ifAnyCkeckd) {
        debugger;
        this.messageService.add({
          key: 'ErrorMs',
          severity: 'error',
          summary: 'Qize',
          detail: 'اختر الاجابة الصحيحة',
        });
        return;
      }
    } else {
      //Break for empty
      this.messageService.add({
        key: 'ErrorMs',
        severity: 'error',
        summary: 'Qize',
        detail: 'أدخل السؤال ',
      });
      return;
    }

    //Mark Correct Answer
    this.Chooses.forEach((item, i) => {
      this.Chooses[i].choose = item.choose;
      //check the correct Answer
      if (item.choose === this.correctAnswer) {
        console.log('the correct Answer is : ' + item.choose);
        this.Chooses[i].isCorrect = true;
      } else {
        this.Chooses[i].isCorrect = false;
      }
    });

    this.saveQuestion();
  }

  saveQuestion() {
    this.QuizQuestion = {
      id: 0,
      question: this.questionText,
      chooses: this.Chooses,
      courseId: +this.activatedRoute.snapshot.paramMap.get('id'),
    };

    this.quizServe.addNewQuestion(this.QuizQuestion).subscribe((res) => {
      //Alerts
      this.messageService.add({
        key: 'SuccessMs',
        severity: 'success',
        summary: 'Qize',
        detail: ' تمت إضافة السؤال',
      });
      //refresh
      this.getCoursesQuestion();
      this.ResetQuestionValues();
    });
    //Call Services for save
  }

  validateCkeckdOption() {
    this.allOptions = document.querySelectorAll('input[type=radio]');

    //1- Check Question if empty
    debugger;
    //2-Ckeck if User Not Choose Any Correct Answer
    for (var i = 0; i < this.allOptions.length; i++) {
      debugger;
      if (this.allOptions[i].checked) {
        debugger;
        this.ifAnyCkeckd = true;
      }
    }
  }

  getCoursesQuestion() {
    this.quizServe
      .GetAllQuestionsOfCourse(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        debugger;
        this.AllQuestions = res;
        console.log(this.AllQuestions);
      });
  }


  //Just For Initail Values
  editQuestion(Qst: any) {
    debugger;

    this.UpdateMood = true;
    this.questionText = Qst.question;
    this.questionID = Qst.id;

    for (let i = 0; i < Qst.chooses.length ; i++) {
      this.Chooses[i].choose = Qst.chooses[i].answer;
      this.Chooses[i].isCorrect = Qst.chooses[i].is_correct;   
    }

  }

  UpdateQuestionValues() {

    //1- Check Question if empty
    if (this.questionText != '') {
      this.validateCkeckdOption();
      //Ckeck if User Not Choose Any Correct Answer
      if (!this.ifAnyCkeckd) {
        debugger;
        this.messageService.add({
          key: 'ErrorMs',
          severity: 'error',
          summary: 'Qize',
          detail: 'اختر الاجابة الصحيحة',
        });
        return;
      }
    } else {
      //Break for empty
      this.messageService.add({
        key: 'ErrorMs',
        severity: 'error',
        summary: 'Qize',
        detail: 'أدخل السؤال ',
      });
      return;
    }

    //Mark Correct Answer
    this.Chooses.forEach((item, i) => {
      this.Chooses[i].choose = item.choose;
      //check the correct Answer
      if (item.choose === this.correctAnswer) {
        console.log('the correct Answer is : ' + item.choose);
        this.Chooses[i].isCorrect = true;
      } else {
        this.Chooses[i].isCorrect = false;
      }
    });




   this.QuizQuestion = {
      id: this.questionID,
      question: this.questionText,
      chooses: this.Chooses,
      courseId: +this.activatedRoute.snapshot.paramMap.get('id'),
    };

    this.quizServe.editQuestion(this.QuizQuestion,this.questionID).subscribe((res) => {
      //Alerts
      this.messageService.add({
        key: 'SuccessMs',
        severity: 'success',
        summary: 'Qize',
        detail: 'تم تحديث السؤال',
      });
      //refresh
      this.getCoursesQuestion();
      //Empty object And Reset 

      this.ResetQuestionValues();
    });


  }



  DeleteQuestion(questionId: any,event: Event) {
    debugger
    this.confirmationServ.confirm({
        target: event.target,
        message: 'هل تريد حذف السؤال ؟',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
            this.quizServe.deleteQuestion(questionId).subscribe((res) => {
              debugger;
              //Alerts
              this.messageService.add({
                key: 'deleteSuccessMs',
                severity: 'success',
                summary: 'Qize',
                detail: 'تم حذف السؤال',
              });
              //refresh
              this.getCoursesQuestion()
            });
        },
        reject: () => {
            //reject action
        }
    });

}

ResetQuestionValues(){
  this.questionText= '';

  //make interface to this array to asign it
  this.Chooses = [
    { choose: 'choose-1', isCorrect: false },
    { choose: 'choose-2', isCorrect: false },
    { choose: 'choose-3', isCorrect: false },
    { choose: 'choose-4', isCorrect: false },
  ];

  this.correctAnswer = 'no answer yet';
 this.UpdateMood = false;
}
}
