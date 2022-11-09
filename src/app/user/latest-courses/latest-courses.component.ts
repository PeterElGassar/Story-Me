import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { BasketService } from 'src/app/basket/basket.service';
import { ICourse, ICourseForBasket } from 'src/app/shared/models/Course';
import { WishlistService } from 'src/app/wishlist/wishlist.service';

@Component({
  selector: 'latest-courses',
  templateUrl: './latest-courses.component.html',
  styleUrls: ['./latest-courses.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class LatestCoursesComponent implements OnInit {
  @Input() course: ICourse;
  @Input() coursesList: ICourse[];
  @Input() isSlider: boolean;
  @Input() removeAddToCart: boolean=true;
  @Input() sliderTitle: string;

  statusBtn: boolean = false;
  constructor(
    private basketServe: BasketService,
    private whishlistServe: WishlistService,
    private messageService: MessageService
  ) { }

  //Options
  @Input() removeInstructorName: boolean;
  @ViewChild('whislistBtn') heartBtn: ElementRef;

  ngOnInit(): void {

    // console.log(this.course);
    console.log(this.coursesList);
    // console.log(this.isSlider);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3.8,
      },
    },
    nav: true,
  };

  addToBasket(course: ICourseForBasket) {
    let result = this.basketServe.addBasketItem(course);

    if (result) {
      let courseNameSlice = course.name.slice(0, 20);
      let courseName =
        course.name.length > 20 ? `${courseNameSlice}...` : course.name;
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

  toggleWishlist(event: any, course: ICourseForBasket) {
    debugger;
    this.statusBtn = !this.statusBtn;
    const addtoWishList = this.heartBtn.nativeElement.classList.contains('in-withlist');

    if (addtoWishList) {
      //call remove
      this.removeFromWishlist(course)
    } else {
      //call add 
      this.addTowhishlist(course);
    }
  }


  addTowhishlist(course: ICourseForBasket) {
    let result = this.whishlistServe.addWishlistItem(course);
    if (result) {
      let courseName =
        course.name.length > 20 ? `${course.name.slice(0, 20)}...` : course.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'success',
          summary: 'معهد الدرسات النفسية',
          detail: `الي المفضلة ${courseName} تم إضافة دورة`,
          life: 4000,
        });
      }, 2000);
    }

    // else {
    //   setTimeout(() => {
    //     this.messageService.add({
    //       key: 'AddToCartMessageWarning',
    //       severity: 'info',
    //       summary: 'معهد الدرسات النفسية',
    //       detail: 'هذه الدورة مضافة من قبل الي المفضلة',
    //     });
    //   }, 800);
    // }

  }


  removeFromWishlist(course: ICourseForBasket) {
    let result = this.whishlistServe.removeItemFromWishlist(course);

   
      let courseName =course.name.length > 20 ? `${course.name.slice(0, 20)}...` : course.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMessageWarning',
          severity: 'warn',
          summary: 'معهد الدرسات النفسية',
          detail: `من المفضلة ${courseName} تم إزالة دورة`,
          life: 4000,
        });
      }, 2000);
    

  }


}
