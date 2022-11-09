import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { CourseService } from './../../dashboard/DashServices/course.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/shared/models/Course';
import { UserServiceService } from '../user-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IStudentQuizzInfo } from 'src/app/shared/models/StudentQuizzInfo';
import { CertificateService } from '../certificate.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CourseDetailsComponent implements OnInit {
  currentUser$: Observable<any>;
  typeOfLogin: string;
  Course: any;
  courseForBasket: ICourse;
  relatedCourses: ICourse[];
  TitleOfSlider: string;
  CourseCurriculam: any;
  CourseID: number;
  videoSrc: SafeUrl;
  ratingValue: number = 0;
  certificateInfo: any;
  userId: number;
  firstTimeForExam = false;
  getBtn: boolean = false;
  paidCoursesList: any[] = [];
  isTakenCourse: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private serveCourse: CourseService,
    private userServe: UserServiceService,
    private authServe: AuthService,
    private certificateServe: CertificateService,
    private basketServe: BasketService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
    private translate: TranslateService
  ) {
    this.CourseID = +this.activatedRoute.snapshot.paramMap.get('id');

    this.currentUser$ = this.authServe.currentUser$;
    this.certificateInformation();
  }

  ngOnInit() {
    this.loadCourse();
    this.loadRelatedCourse();
    this.TitleOfSlider = this.translate.instant('SIMILAR_COURSES');
    this.initCurriculamToPath();
    // this.getFirstLesson();
    debugger;
    if(this.CourseID && this.userId){

      debugger;
      this.StudentPaymentShow(this.CourseID ,this.userId);
    }
  }

  loadCourse(productId?: number) {
    this.serveCourse.getSingleCourse(this.CourseID).subscribe(
      (cour: any) => {
        this.Course = cour;
        this.courseForBasket = {
          id: cour.id,
          description: cour.description,
          date: cour.date,
          img_path: cour.img_path,
          instructors_id: cour.instructors_id,
          name: cour.name,
          price_after_discount: cour.price_after_discount,
          price_before_discount: cour.price_before_discount,
          sections_courses_id: cour.sections_courses_id,

          instructor_first_name: cour.CourseInstructors[0].first_name,
          instructor_second_name: cour.CourseInstructors[0].second_name,
          instructor_last_name: cour.CourseInstructors[0].last_name,
          instructor_img: cour.CourseInstructors[0].img_path,

          nameSection: cour.nameSection,
          created_at: cour.created_at,
          is_aproved: cour.is_aproved,
        };
        this.ratingValue = cour.rating_course;
        console.log(this.Course);
        console.log(this.courseForBasket);
        console.log(this.ratingValue);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadRelatedCourse(productId?: number) {
    this.serveCourse.getِِApprovedCourses().subscribe(
      (cour) => {
        this.relatedCourses = cour;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initCurriculamToPath() {
    this.userServe.getCurriculumsOfOneCourse(this.CourseID).subscribe((res) => {
      this.CourseCurriculam = res;
      console.log(res);
      this.getFirstLesson();
    });
  }

  addItemToBasket() {
    this.basketServe.addBasketItem(this.courseForBasket);

    let result = this.basketServe.addBasketItem(this.courseForBasket);
    if (result) {
      let courseNameSlice = this.courseForBasket.name.slice(0, 20);
      let courseName =
        this.courseForBasket.name.length > 20
          ? `${courseNameSlice}...`
          : this.courseForBasket.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'success',
          summary: 'معهد الدرسات النفسية',
          detail: `الي السلة ${courseName} تم إضافة دورة`,
          life: 4000,
        });
      }, 2000);
    } else {
      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMessageWarning',
          severity: 'info',
          summary: 'معهد الدرسات النفسية',
          detail: 'هذه الدورة مضافة من قبل الي السلة',
        });
      }, 800);
    }
  }

  getFirstLesson() {
    this.videoSrc;

    if (this.CourseCurriculam) {
      for (let i = 0; i < 1; i++) {
        this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.CourseCurriculam[i].links[i].link
        );
        console.log(this.videoSrc);
      }
    }
  }

  currentVideolink(newlink: any) {
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(newlink);
    return this.videoSrc;
    let videoDom = this.elRef.nativeElement.querySelector('video');
    videoDom.load();
  }

  onRateCourse() {
    console.log(this.ratingValue);
    let val = {
      user_id: 0,
      rating: this.ratingValue,
    };

    this.currentUser$.subscribe((obj: any) => {
      if (obj) {
        val.user_id = obj.user.id;
      }
    });
    this.userServe.addRating(this.CourseID, val).subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  certificateInformation() {
    this.authServe.currentUser$.subscribe(
      (res: any) => {
        if (res) {
          this.userId = res.user.id;
          console.log(this.userId);
          console.log(this.CourseID);
          this.getCertificateInfo(this.CourseID, this.userId);
          this.getUserPaidCourses(this.userId);
          this.typeOfLogin = res.user.type;
          this.StudentPaymentShow(this.userId ,this.CourseID)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCertificateInfo(courseId, userId) {
    this.certificateServe.getquizStatus(courseId, userId).subscribe(
      (cert: any) => {
        if (cert.Message === 'Not Found') {
          this.firstTimeForExam = true;
          console.log(this.firstTimeForExam);

          this.certificateInfo = null;
        } else if (cert.Message === 'fail') {
          this.certificateInfo = cert;
          console.log(this.certificateInfo);
        } else {
          //success case
          this.certificateInfo = cert;
          console.log(this.certificateInfo);
        }
      },
      (error) => {
        debugger;
        console.log(error);
      }
    );
  }

  getUserPaidCourses(userId) {
    this.userServe.getPaidCourses(userId).subscribe((res: any) => {
      if (res) {
        //take courses only (res.courses)
        this.paidCoursesList = res.courses;
        console.log(this.paidCoursesList);
        this.checkIfUserTakenCourse(this.CourseID);
      }
    });
  }

  testArray: any[] = [];

  checkIfUserTakenCourse(CourseID) {
    this.testArray = this.paidCoursesList.filter((i) => i.id === CourseID);
    if (this.testArray.length > 0) {
      this.isTakenCourse = true;
    }
  }

  coponeValue:any;
  applayCopone(copone) {
    debugger;
    let val: any;
    if(this.coponeValue !== null){
       val= {
        course_id: this.CourseID,
        diploma_id: '',
        copon: this.coponeValue,
      };
    }
   
    this.serveCourse.attachCopon(this.userId, val).subscribe((res: any) => {      
        if (res) {
          debugger;
          console.log(res);
          this.messageService.add({
            key: 'AddToCartMessageWarning',
            severity: 'success',
            summary: 'معهد الدرسات النفسية',
            detail: 'تم تفعيل الكوبون',
          });
        }
      },(error) => {
        debugger;
        console.log(error);
        if(error.text === "success"){
          this.messageService.add({
            key: 'AddToCartMessageWarning',
            severity: 'success',
            summary: 'معهد الدرسات النفسية',
            detail: 'تم تفعيل الكوبون',
          });
        }
        else if(error.error.text === "you used this code before"){
          this.messageService.add({
            key: 'AddToCartMessageWarning',
            severity: 'error',
            summary: 'معهد الدرسات النفسية',
            detail: 'تم أستخدام هذا الكوبون من قبل ',
          });
        }
        else if(error.error.text === "This copon is expired"){
          this.messageService.add({
            key: 'AddToCartMessageWarning',
            severity: 'error',
            summary: 'معهد الدرسات النفسية',
            detail: 'هذا الكوبون منتهي الصلاحية',
          });
        }
        else if(error.error.text === "This copon is not working now"){
          this.messageService.add({
            key: 'AddToCartMessageWarning',
            severity: 'error',
            summary: 'معهد الدرسات النفسية',
            detail: 'لم يتم تفعيل هذا الكوبون بعد',
          });
        }
       
      }
    );
  }

  Is_partialUser:any=undefined;
  StudentPaymentShow( userId,courseId) {

    debugger;
    this.userServe.StudentPaymentShow( userId,courseId).subscribe((res: any) => {
      debugger;
        if (res.id) {
          this.Is_partialUser=res;
          console.log("bdfbdfbadf"+res)
        } else{
          this.Is_partialUser = undefined;
          console.log("bdfbdfbadf"+res)
        }
      },
      (error) => {
        debugger;
        console.log(error);
      }
    );
  }


}
