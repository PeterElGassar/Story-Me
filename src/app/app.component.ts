import { BasketService } from './basket/basket.service';
import { AuthService } from './user/auth.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from './wishlist/wishlist.service';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent implements OnInit {
  dateOfNow: string;
  expireDate: string;
  displayPopup: boolean = false;

  // console.log(this.datePipe.transform(date,"yyyy-MM-dd")); //output : 2018-02-13
  ngOnInit(): void {
    this.loadCurrentuser();
    this.getBasket();
    this.getWishlist();
    this.authServe.Now$.subscribe((res) => {
      if (res) {
        console.log('Observable Date of Now: ' + res);
        this.dateOfNow = res;
      }
    });
    this.authServe.ExpireDate$.subscribe((res) => {
      if (res) {
        console.log('Observable Expire Date: ' + res);
        this.expireDate = res;
      }
    });
    if (this.expireDate && this.dateOfNow) {
    this.displayPopup =  this.authServe.checkIfUserSubscriptionEnded(this.expireDate,this.dateOfNow);
    }
  }

  constructor(
    private authServe: AuthService,
    private basketServe: BasketService,
    private wishListServe: WishlistService,
    private datePipe: DatePipe
  ) {}
  title = 'Psycholoical';

  loadCurrentuser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authServe.loadCurrentUser(token).subscribe(
        (res: any) => {
          if (res) {
            console.log(res);
            this.expireDate = res.expire;
            console.log('loaded user ' + this.expireDate);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      ///
      this.authServe.loadCurrentUser(token);
    }
  }

  getBasket() {
    const basketId = localStorage.getItem('basket_id');

    if (basketId) {
      this.basketServe.getBasket(basketId).subscribe(
        () => {
          console.log('bsaket initial');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getWishlist() {
    const wishListId = localStorage.getItem('whishlist_id');

    if (wishListId) {
      this.wishListServe.getWhishlist(wishListId).subscribe(
        () => {
          console.log('whishlist initial');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getGrandTotal() {
    this.basketServe.getGrandTotal();
  }

  showBasicDialog() {
    this.displayPopup = false;
  }
}
