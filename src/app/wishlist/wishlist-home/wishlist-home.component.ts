import { IWishlist } from './../../shared/models/wishlist';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-home',
  templateUrl: './wishlist-home.component.html',
  styleUrls: ['./wishlist-home.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class WishlistHomeComponent implements OnInit {

  wishlist$: Observable<IWishlist>;

  allBasketCourses: any;


  constructor(
    private wishlistServe: WishlistService,
    private basketServe: BasketService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ) {
      this.wishlist$ = this.wishlistServe.Wishlist$;

     }
    

  ngOnInit(): void {

  }




  // checkIfLoggedIn() {
  //   let token = localStorage.getItem('token');
  //   if (token !== null || token !== undefined) this.isLoggedIn=true;
  // }

  confirmDeleteDiplomaItem(diploma:any) {
    this.confirmationService.confirm({
      message: 'هل تريد ازالة هذه الدبلومة ؟',
      header: 'معهد الدراسات النفسية',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.wishlistServe.removeItemFromWishlist_forDiploma(diploma);
      },
      reject: (type) => {
      },
    });
  }
  
  confirmDeleteCourseItem(course: any) {
    this.confirmationService.confirm({
      message: 'هل تريد ازالة هذه الدورة ؟',
      header: 'معهد الدراسات النفسية',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.wishlistServe.removeItemFromWishlist(course);
      },
      reject: (type) => {},
    });
  }


  addToBasket(course: any) {
    debugger
    let result = this.basketServe.addBasketItem(course);
    debugger;
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
          detail: `  تم إضافة دورة ${courseName} إلي السلة`,
          life: 4000,
        });
      }, 2000);
      debugger
              //after added to basket Remove From Wishlist
              this.wishlistServe.removeItemFromWishlist(course);
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

  addToBasketDiploma(diploma: any) {
    debugger
    let result = this.basketServe.addDiploamaBasketItem(diploma);
    debugger;
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
          detail: `  تم إضافة دورة ${courseName} إلي السلة`,
          life: 4000,
        });
      }, 2000);
      debugger
              //after added to basket Remove From Wishlist
              this.wishlistServe.removeItemFromWishlist_forDiploma(diploma);
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

}
