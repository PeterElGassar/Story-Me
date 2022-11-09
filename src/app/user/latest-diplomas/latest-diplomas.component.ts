import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BasketService } from 'src/app/basket/basket.service';
import { ICourseForBasket } from 'src/app/shared/models/Course';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { WishlistService } from 'src/app/wishlist/wishlist.service';

@Component({
  selector: 'latest-diplomas',
  templateUrl: './latest-diplomas.component.html',
  styleUrls: ['./latest-diplomas.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class LatestDiplomasComponent implements OnInit {
  @Input() diploma: IDiploma;
  @Input() diplomaList: IDiploma[];
  @Input() isSlider: boolean;
  @Input() sliderTitle: string;
  
  statusBtn: boolean = false;
  @ViewChild('whislistBtn') heartBtn: ElementRef;

  constructor(
    private basketServe: BasketService,
    private whishlistServe: WishlistService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    console.log(this.diploma);
    
  }

  customOptionsDiploama: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    
    navSpeed: 700,
    margin:10,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3.8,
      }
    },
    nav: true
  }


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
          summary: 'معهد الدرسات النفسية',
          detail: `الي السلة ${courseName} تم إضافة الدبلومة`,
          life: 4000,
        });
      }, 2000);
    } else {
      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMessageWarning',
          severity: 'info',
          summary: 'معهد الدرسات النفسية',
          detail: 'هذه الدبلومة مضافة من قبل الي السلة',
        });
      }, 800);
    }
  }

  toggleWishlist(event: any, diploma: ICourseForBasket) {
    this.statusBtn = !this.statusBtn;
    const addtoWishList = this.heartBtn.nativeElement.classList.contains('in-withlist');

    if (addtoWishList) {
      //call remove
      console.log("remove call")
      this.removeFromWishlist(diploma)
    } else {
      //call add 
      console.log("add call")

      this.addTowhishlist(diploma);
    }
  }


  addTowhishlist(diploma: any) {
    let result = this.whishlistServe.addDiploamaBasketItem(diploma);
    if (result) {
      let courseName =
        diploma.name.length > 20 ? `${diploma.name.slice(0, 20)}...` : diploma.name;
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


  }

  removeFromWishlist(diploma: ICourseForBasket) {
    let result = this.whishlistServe.removeItemFromWishlist_forDiploma(diploma);

    if (result) {
      let courseName =diploma.name.length > 20 ? `${diploma.name.slice(0, 20)}...` : diploma.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'success',
          summary: 'معهد الدرسات النفسية',
          detail: `من المفضلة ${courseName} تم إزالة دورة`,
          life: 4000,
        });
      }, 2000);
    }

  }

}
