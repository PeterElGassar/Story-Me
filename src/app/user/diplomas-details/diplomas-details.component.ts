import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { DiplomaService } from 'src/app/dashboard/DashServices/diploma.service';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { AuthService } from '../auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserServiceService } from '../user-service.service';
import { CertificateService } from '../certificate.service';
import { IDiplomaCoursesQuizzes } from 'src/app/shared/models/DiplomaCoursesQuizzes';
import { TranslateService } from '@ngx-translate/core';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';

@Component({
  selector: 'app-diplomas-details',
  templateUrl: './diplomas-details.component.html',
  styleUrls: ['./diplomas-details.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class DiplomasDetailsComponent implements OnInit {
  @ViewChild('videoElement') ViedoElement: ElementRef;

  currentUser$: Observable<any>;
  breadCrumb: IBreadbrumb;
  diploma: any;
  diplomaForBasket: any;
  relatedDiplomas: IDiploma[];
  TitleOfSlider: string;
  diplomaCurriculam: any;
  allDiplomaCourses: any[];
  diplomaID: number;
  videoSrc: SafeUrl;
  ratingValue: number = 0;
  isTakenDiploma: boolean = false;
  paidDiplomaList: any[] = [];
  userId: number;
  diplomaCoursesArryID: number[] = [];
  typeOfLogin: string;
  firstTimeForExam = false;
  certificateInfo: any[] = [];
isPassDiploma: boolean = false;
  // $('video').attr('controlsList', 'nodownload');

  constructor(
    private activatedRoute: ActivatedRoute,
    private diplomaServe: DiplomaService,
    private serveCourse: CourseService,
    private authServe: AuthService,
    private basketServe: BasketService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
    private userServe: UserServiceService,
    private certificateServe: CertificateService,
    private trnslate: TranslateService,
  ) {}

  initBreadCrumb() {
    this.breadCrumb = { title: this.trnslate.instant("") };
  }

  ngOnInit() {
    this.diplomaID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadCourse();
    this.loadRelatedCourse();
    // this.initAllDipolomaCourse();
    this.TitleOfSlider = 'دورات مشابهة';
    // this.getFirstLesson();
    this.initBreadCrumb();
    this.currentUser$ = this.authServe.currentUser$;
    this.elRef.nativeElement.querySelector('video');
    console.log(this.elRef);
    console.log(this.elRef.nativeElement.querySelector('video'));
  }

  loadCourse(productId?: number) {
    this.diplomaServe.getSingleDiploma(this.diplomaID).subscribe(
      (diploma: any) => {
        this.diploma = diploma;
        this.allDiplomaCourses = diploma.Courses;
        this.diplomaForBasket = {
          id: diploma.id,
          name: diploma.name,
          description: diploma.description,
          img_path: diploma.img_path,
          price_after_discount: diploma.price_after_discount,
          created_at: diploma.created_at,
        };

        this.getFirstLesson();
        this.getAllDiplomaCourseQuizzesCase();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadRelatedCourse(productId?: number) {
    this.diplomaServe.getDeploma().subscribe(
      (diplo) => {
        this.relatedDiplomas = diplo;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItemToBasket() {
    this.basketServe.addBasketItem(this.diplomaForBasket);

    let result = this.basketServe.addBasketItem(this.diplomaForBasket);
    if (result) {
      let courseNameSlice = this.diplomaForBasket.name.slice(0, 20);
      let courseName =
        this.diplomaForBasket.name.length > 20
          ? `${courseNameSlice}...`
          : this.diplomaForBasket.name;
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

  currentVideolink(newlink: any) {
    debugger;
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(newlink);
    return this.videoSrc
    let videoDom = this.elRef.nativeElement.querySelector('video');
    videoDom.load();
  }

  getFirstLesson() {
    debugger;
    if (this.allDiplomaCourses) {
      debugger;
      let DiplomaCourse: any = this.allDiplomaCourses;
      for (let i = 0; i < 1; i++) {
        for (let y = 0; y < 1; y++) {
          console.log(DiplomaCourse[y].Sections[y].links[y].link);
          let temp = DiplomaCourse[y].Sections[y].links[y].link;
          this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
        }
        //  this.videoSrc = this.allDiplomaCourses[i].links[i].link;
        debugger;
        var videoNumOne = document.getElementsByTagName('video');
      }
    }
  }

  caseOfAllCoursesQuizzez: IDiplomaCoursesQuizzes[] = [];

  getAllDiplomaCourseQuizzesCase() {
    debugger;
    //foreach here
    if (this.allDiplomaCourses.length > 0) {
      this.allDiplomaCourses.forEach((cour) => {
        this.certificateInformation(cour);
      });
    }
  }

  certificateInformation(singleCourse) {
    this.authServe.currentUser$.subscribe(
      (res: any) => {
        if (res) {
          debugger;
          this.userId = res.user.id;
          // console.log(this.userId)//////;
          // console.log(singleCourseID)////////;
          this.getCertificateInfo(singleCourse, this.userId);
          this.getUserPaidCourses(this.userId);
          this.typeOfLogin = res.user.type;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCertificateInfo(course, userId) {
    debugger
    this.certificateServe.getquizStatus(course.id, userId).subscribe((cert: any) => {
      debugger;
        if (cert.Message === 'Not Found') {
          console.log(cert);
          
          debugger;
          // this.firstTimeForExam = true;
          // console.log(this.firstTimeForExam);
          // this.certificateInfo = null;
          this.caseOfAllCoursesQuizzez.push({
            firstTimeForExam: true,
            certificateInfo: null,
            courseInfo:course

          });
          console.log("ana"+this.caseOfAllCoursesQuizzez[0].firstTimeForExam);
          this.isPassDiploma = this.caseOfAllCoursesQuizzez.every(item => {
            return item.certificateInfo.certificat.result === 'successful';
         });
        } else if (cert.Message === 'fail') {
          console.log(cert);

          this.certificateInfo = cert;
          debugger;
          console.log(this.certificateInfo);
          this.caseOfAllCoursesQuizzez.push({
            firstTimeForExam: false,
            certificateInfo: cert,
            courseInfo:course
          });
          console.log("ana"+this.caseOfAllCoursesQuizzez);
          this.isPassDiploma = this.caseOfAllCoursesQuizzez.every(item => {
            return item.certificateInfo.certificat.result === 'successful';
         });
        } else {
          console.log(cert);

          debugger;
          //success case
          this.certificateInfo = cert;
          this.caseOfAllCoursesQuizzez.push({
            firstTimeForExam: false,
            certificateInfo: cert,
            courseInfo:course

          });
          //

          this.isPassDiploma = this.caseOfAllCoursesQuizzez.every(item => {
           return item.certificateInfo.certificat.result === 'successful';
        });
          console.log(this.certificateInfo);
          console.log("ana"+this.caseOfAllCoursesQuizzez);

        }
      },
      (error) => {
        debugger;
        console.log(error);
      }
    );
  }

  getUserPaidCourses(userId) {
    debugger;
    this.userServe.getPaidCourses(userId).subscribe((res: any) => {
      if (res) {
        debugger;

        //take courses only (res.courses)
        this.paidDiplomaList = res.diplomas;
        console.log('here up ... ' + res);
        this.checkIfUserTakenCourse(this.diplomaID);
      }
    });
  }

  testArray: any[] = [];
  checkIfUserTakenCourse(diplomaID) {
    debugger;
    this.testArray = this.paidDiplomaList.filter((i) => i.id === diplomaID);
    if (this.testArray.length > 0) {
      this.isTakenDiploma = true;
    }
  }

  coponeValue:any;
  applayCopone(copone) {
    debugger;
    let val: any;
    if(this.coponeValue !== null){
       val= {
        course_id: '',
        diploma_id: this.diplomaID,
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

}
