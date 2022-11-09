import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { DiplomaService } from 'src/app/dashboard/DashServices/diploma.service';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dip-details',
  templateUrl: './dip-details.component.html',
  styleUrls: ['./dip-details.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class DipDetailsComponent implements OnInit {
  @ViewChild('#IframeElement') IframeElement: ElementRef;
  @ViewChild('videoElement') ViedoElement: ElementRef;
  x:string="https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4";

  currentUser$: Observable<any>;
  breadCrumb: IBreadbrumb;
  diploma: any;
  diplomaForBasket: any;
  relatedDiplomas: IDiploma[];
  TitleOfSlider: string;
  diplomaCurriculam: any;
  allDiplomaCourses: any[];
  diplomaID: number;
  videoSrc: any;
  ratingValue: number = 0;
  // $('video').attr('controlsList', 'nodownload');

  constructor(
    private activatedRoute: ActivatedRoute,
    private diplomaServe: DiplomaService,
    private authServe: AuthService,
    private basketServe: BasketService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef
  ) {}

  initBreadCrumb() {
    this.breadCrumb = { title: 'تفاصيل الدورة' };
  }

  ngOnInit() {
    this.diplomaID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadCourse();
    // this.initAllDipolomaCourse();
    this.TitleOfSlider = 'دورات مشابهة';
    // this.getFirstLesson();
    this.initBreadCrumb();
    this.currentUser$ = this.authServe.currentUser$;
    console.log(this.IframeElement);
    this.elRef.nativeElement.querySelector('video');
    console.log(this.elRef);
    console.log( this.elRef.nativeElement.querySelector('video'));

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
        console.log(this.allDiplomaCourses);
        this.getFirstLesson();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  currentVideolink(x: any) {
    this.videoSrc = x;
    let temp =this.elRef.nativeElement.querySelector('video');
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
         this.videoSrc = this.allDiplomaCourses[i].links[i].link;
      }
    }
  }

  onLessonClick(link:string){
    this.videoSrc = link;
    let temp =this.elRef.nativeElement.querySelector('video');
    temp.load();
    temp.play();
   }
   

   data
   videoPlayerInit(data) {
    debugger;
    this.data = data;

    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.getFirstLesson();
    // this.videoSrc = this.videoItems[this.activeIndex];
  }

  initVdo() {
    debugger;
    this.data.play();
  }

  startPlaylistVdo(link) {
    debugger
    this.videoSrc= link
  }
  
}
