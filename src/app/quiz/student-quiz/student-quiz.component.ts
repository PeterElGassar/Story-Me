import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQuestion } from 'src/app/shared/models/Question';
import { IStudentQuizzInfo } from 'src/app/shared/models/StudentQuizzInfo';
import { AuthService } from 'src/app/user/auth.service';
import { CertificateService } from 'src/app/user/certificate.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.css'],
})
export class StudentQuizComponent implements OnInit {
  AllQuestions: IQuestion[];
  QuestionToDisplay: IQuestion;
  indexOfQuestion: number = 0;
  charactersList = ['A', 'B', 'C', 'D'];
  worngOrCorrect: number = 0;
  instAnswerText: string[] = ['إجابة غير صحيحة', 'إجابة صحيحة'];
  showAlertMessage: number = 0;

  ActiveFinalResult: boolean = false;
  studentScore: number = 0;
  disableChooses: boolean = false;
  StudentQuizzResult: any;
  certificat: any;
 user:any;
  constructor(
    private quizServe: QuizService,
    private activatedRoute: ActivatedRoute,
    private certificateServe: CertificateService,
    private authServe: AuthService
  ) {}

  ngOnInit(): void {
    this.getCoursesQuestions();
    this.getuserInfo();
  }

  getCoursesQuestions() {
    this.quizServe
      .GetAllQuestionsOfCourse(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        this.AllQuestions = res;
        console.log(this.AllQuestions);
        this.displayQuestion();
      });
  }
  displayQuestion() {
    debugger;
    this.QuestionToDisplay = this.AllQuestions[this.indexOfQuestion];
  }

  checkAnswer(event) {
    this.disableChooses = true;
    debugger;
    let questionValue: number = parseInt(event.getAttribute('data-is-true'));

    if (questionValue === 1) {
      this.worngOrCorrect = 1;
      this.studentScore++;
    } else {
      this.worngOrCorrect = 0;
    }
    this.showAlertMessage = 1;
  }

  nextQuestion() {
    this.disableChooses = false;

    debugger;
    //before latest question
    if (this.indexOfQuestion + 1 == this.AllQuestions.length - 1) {
    } else {
    }

    if (this.indexOfQuestion + 1 != this.AllQuestions.length) {
      this.worngOrCorrect = 0;
      this.indexOfQuestion++;
      this.showAlertMessage = 0;
      //get next question
      this.getCoursesQuestions();
    } else {
      this.showScore();
    }
  }

  showScore() {
    this.ActiveFinalResult = true;

    this.StudentQuizzResult = {
      number_of_questions: this.AllQuestions.length,
      correct_questions: this.studentScore,
      course_id: +this.activatedRoute.snapshot.paramMap.get('id'),
      user_id: this.user.id,
    };
    debugger;
    this.certificateServe.AddQuizResult(this.StudentQuizzResult).subscribe((res:any)=>{
      console.log(res);
this.certificat =res.certificat;
    },error=>{
      console.log(error);
    });
  }

  getuserInfo(){
    this.authServe.currentUser$.subscribe((res: any) => {
      debugger;
      if (res) {
        debugger;
        this.user = res.user;
      };  
    },(error) => {console.log(error);});
  }
}

// {
//   "id": 2,
//   "course_id": "64",
//   "question": "TestUpdateeeeeeeeeeeeeeeeeeeeee",
//   "chooses": [
//       {
//           "id": 9,
//           "answer": "TestUpdate-1",
//           "is_correct": "0",
//           "question_id": "2"
//       },
//       {
//           "id": 10,
//           "answer": "TestUpdate-2",
//           "is_correct": "0",
//           "question_id": "2"
//       },
//       {
//           "id": 11,
//           "answer": "TestUpdate-3",
//           "is_correct": "0",
//           "question_id": "2"
//       },
//       {
//           "id": 12,
//           "answer": "TestUpdate correct answer",
//           "is_correct": "0",
//           "question_id": "2"
//       }
//   ]
// }
