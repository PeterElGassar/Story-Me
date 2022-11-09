import { ArticalService } from 'src/app/dashboard/DashServices/artical.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DiplomaService } from 'src/app/dashboard/DashServices/diploma.service';
import { IArtical } from 'src/app/shared/models/artical';
import { ICourse, ICourseForBasket } from 'src/app/shared/models/Course';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { UserServiceService } from '../user-service.service';
import { BasketService } from 'src/app/basket/basket.service';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { MessageService } from 'primeng/api';
import { CourseService } from 'src/app/dashboard/DashServices/course.service';

@Component({
  selector: 'user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [MessageService],
})
export class UserHomeComponent implements OnInit {
  courses: ICourse[] = [];
  bestSellerCourses: ICourse[] = [];
  diplomas: IDiploma[];
  articals: IArtical[];
  collectionSize: number = 0;
  pageSize: number = 5;
  coursePage: number = 1;
  BestSellerPage: number = 1;
  latestCoursesPage: number = 1;
  statusBtn: boolean = false;
   text:string;
  @ViewChild('whislistBtn') heartBtn: ElementRef;

  constructor(
    private courseServe: CourseService,
    private serveDiploma: DiplomaService,
    private serveArtical: ArticalService,
    private basketServe: BasketService,
    // private whishlistServe: WishlistService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getDiplomas();
    this.getArticals();
    this.getBestSellerCourses();

    console.log(this.getBestSellerCourses);
        this.collectionSize = this.courses.length;
        this.pageSize = 5;
      }

  getCourses() {
    this.courseServe.getِِApprovedCourses().subscribe((respo) => {
      debugger;
      this.courses = respo;
      console.log('normal '+ this.courses)

    });
  }
  getBestSellerCourses() {
    this.courseServe.getTopSellerOfCourses().subscribe((respo) => {
      this.bestSellerCourses = respo;
      console.log('best seller '+this.bestSellerCourses)
    });
  }

  getDiplomas() {
    debugger;
    this.serveDiploma.getDeploma().subscribe((respo) => {
      debugger;
      this.diplomas = respo;
    });
  }

  getArticals() {
    this.serveArtical.getArticals().subscribe((data) => {
      this.articals = data;
    });
  }

  customOptionsDiploama: OwlOptions = {
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

  customOptionsArticals: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    autoWidth: true,
    autoplay: true,
    autoplaySpeed: 1200,
    rtl: true,
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
        items: 2.8,
      },
    },
    nav: true,
  };

  addDiplomaToBasket(diploma: any) {
    let result = this.basketServe.addDiploamaBasketItem(diploma);
    if (result) {
      let courseNameSlice = diploma.name.slice(0, 20);
      let courseName =
        diploma.name.length > 20 ? `${courseNameSlice}...` : diploma.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'success',
          summary: 'منصة تطوير',
          detail: `الي السلة ${courseName} تم إضافة الدبلومة`,
          life: 4000,
        });
      }, 2000);
    } else {
      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMessageWarning',
          severity: 'info',
          summary: 'منصة تطوير',
          detail: 'هذه الدبلومة مضافة من قبل الي السلة',
        });
      }, 800);
    }
  }

  toggleWishlist(event: any, course: ICourseForBasket) {
    this.statusBtn = !this.statusBtn;
    const addtoWishList = this.heartBtn.nativeElement.classList.contains('in-withlist');

    if (addtoWishList) {
      //call remove
      console.log('remove call');
      // this.removeFromWishlist(course)
    } else {
      //call add
      console.log('add call');

      // this.addTowhishlist(course);
    }
  }

  // addTowhishlist(course: ICourseForBasket) {
  //   let result = this.whishlistServe.addWishlistItem(course);
  //   if (result) {
  //     let courseName =
  //       course.name.length > 20 ? `${course.name.slice(0, 20)}...` : course.name;
  //     // setTimeOut Here
  //     setTimeout(() => {
  //       this.messageService.add({
  //         key: 'AddToCartMS',
  //         severity: 'success',
  //         summary: 'منصة تطوير',
  //         detail: `الي المفضلة ${courseName} تم إضافة دورة`,
  //         life: 4000,
  //       });
  //     }, 2000);
  //   }
  // }

  // removeFromWishlist(course: ICourseForBasket) {
  //   let result = this.whishlistServe.removeItemFromWishlist(course);

  //   if (result) {
  //     let courseName =course.name.length > 20 ? `${course.name.slice(0, 20)}...` : course.name;
  //     // setTimeOut Here

  //     setTimeout(() => {
  //       this.messageService.add({
  //         key: 'AddToCartMS',
  //         severity: 'success',
  //         summary: 'منصة تطوير',
  //         detail: `من المفضلة ${courseName} تم إزالة دورة`,
  //         life: 4000,
  //       });
  //     }, 2000);
  //   }

  // }
}
