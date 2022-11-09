import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICourseForBasket } from '../shared/models/Course';
import { IDiploma } from '../shared/models/Diploma';
import {
  IWishlist,
  WhishlistToSend,
  WishList,
} from '../shared/models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';
  private WishlistSourse = new BehaviorSubject<any>(null);
  Wishlist$ = this.WishlistSourse.asObservable();
  finalResultToSend = new WhishlistToSend();

  constructor(private http: HttpClient) {}


  //**********1
  getWhishlist(id: string) {
    return this.http.get(this.baseUrl + `showWishList/${id}`).pipe(
      map((whishlist: any) => {
        if (whishlist) {
          // debugger
          let initialBasket: IWishlist = {
            id: '',
            basketItems: [],
            diplomaItems: []
          };

          // for (let index = 0; index < whishlist.length; index++) {
          //   initialBasket.basketItems.push(whishlist[index]);
          // }
          for (let index = 0; index < whishlist.length; index++) {
            debugger;
            if (whishlist[index].type === 'course') {
              debugger;
              initialBasket.basketItems.push(whishlist[index]);
            }
          }
          for (let index = 0; index < whishlist.length; index++) {
            debugger;
            if (whishlist[index].type === 'diploma') {
              debugger;
              initialBasket.diplomaItems.push(whishlist[index]);
            }
          }

          this.WishlistSourse.next(initialBasket);
        }
      })
    );
  }

  //**********2
  setWishlist(basket: WhishlistToSend, basket_: IWishlist) {
    return this.http.post(this.baseUrl + `addWishList`, basket).subscribe(
      (basket: any) => {
        this.WishlistSourse.next(basket_);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //**********3
  getCurrentWishlistValue() {
    return this.WishlistSourse.value;
  }


  addDiploamaBasketItem(diploma: IDiploma): boolean {
    //basketItems
    debugger;

    const itemToAdd: IDiploma = diploma;
    //check if this user have one before
    const basket = this.getCurrentWishlistValue() ?? this.createNewWishlist();

    if (this.isDiplomaInBasket(diploma, basket.diplomaItems)) {
      debugger;
      basket.id = localStorage.getItem('whishlist_id');

      basket.diplomaItems.push(itemToAdd);
      this.asignDiplomaValueToBasketItems(basket.diplomaItems);
      this.asignValueToBasketItems(basket.basketItems);
      this.finalResultToSend.id = basket.id;
      this.setWishlist(this.finalResultToSend, basket);
      return true;
    } else {
      // alert('this course is already in your Cart');
      return false;
    }
  }

  //**********4
  addWishlistItem(item: ICourseForBasket): boolean {
    debugger;
    const itemToAdd: ICourseForBasket = item;
    //check if this user have one before
    const basket = this.getCurrentWishlistValue() ?? this.createNewWishlist();

    if (this.isInBasket(item, basket.basketItems)) {
      basket.id = localStorage.getItem('whishlist_id');

      basket.basketItems.push(itemToAdd);
      this.asignValueToBasketItems(basket.basketItems);
      this.finalResultToSend.id = basket.id;
      this.setWishlist(this.finalResultToSend, basket);
      return true;
    } else {
      // alert('this course is already in your Cart');
      return false;
    }
  }

  //********5 to Create new Basket
  private createNewWishlist(): IWishlist {
    const whishlist = new WishList();
    localStorage.setItem('whishlist_id', whishlist.id);
    return whishlist;
  }

  //********6 check if Item is taken before or not
  private isInBasket(
    itemToAdd: ICourseForBasket,
    allBasketitems: ICourseForBasket[]
  ): boolean {
    const index = allBasketitems.findIndex((i) => i.id === itemToAdd.id);

    if (index === -1) {
      //in this case it's means not found that item in array
      return true;
    } else {
      return false;
    }
  }

  asignValueToBasketItems(basketItemsIds: any) {
    debugger;
    console.log(this.finalResultToSend);
    this.finalResultToSend.basketItems=[];
    basketItemsIds.forEach((element) => {
      this.finalResultToSend.basketItems.push(element.id);
    });
  
  }

  asignDiplomaValueToBasketItems(diplomaBasketItemsIds: any) {
    debugger;
    console.log(this.finalResultToSend);
    this.finalResultToSend.diplomaItems=[];

    diplomaBasketItemsIds.forEach((element) => {
      this.finalResultToSend.diplomaItems.push(element.id);
    });
  }


  removeItemFromWishlist(item: any) {
    debugger;
    const basket = this.getCurrentWishlistValue();
    //get Basket ID from Browser
     basket.id = localStorage.getItem("whishlist_id");
    this.finalResultToSend.id = basket.id;

    debugger;
    if (basket.basketItems.some((i) => i.id === item.id)) {
      debugger;


      if (basket.basketItems.length > 0) {
              //return all items that's dose'n match with id of item
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
        debugger;
        console.log(this.finalResultToSend);
                
        this.finalResultToSend.basketItems=[];
        this.finalResultToSend.diplomaItems=[];

        this.asignValueToBasketItems(basket.basketItems);
        this.asignDiplomaValueToBasketItems(basket.diplomaItems);
        this.setWishlist(this.finalResultToSend, basket);
          return true;
      } else {
        if((basket.diplomaItems.length === 0) &&(basket.basketItems.length === 0) ){
          this.deleteWishlist(basket);
          return false;
        }
      }
    }
  }



  deleteWishlist(basket: any) {
    return this.http
      .delete(this.baseUrl + `RemoveBasket/` + basket.id)
      .subscribe(
        (res) => {
          this.WishlistSourse.next(null);
          localStorage.removeItem('whishlist_id');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //********6 check if Item is taken before or not
  private isDiplomaInBasket(itemToAdd: IDiploma,allBasketitems: IDiploma[]): boolean {
      debugger;
      const index = allBasketitems.findIndex((i) => i.id === itemToAdd.id);
  
      if (index === -1) {
        //in this case it's means not found that item in array
        return true;
      } else {
        return false;
      }
  }


  addDiploamaWishlistItem(diploma: IDiploma): boolean {
    //basketItems
    debugger;

    const itemToAdd: IDiploma = diploma;
    //check if this user have one before
    const basket = this.getCurrentWishlistValue() ?? this.createNewWishlist();

    if (this.isDiplomaInBasket(diploma, basket.diplomaItems)) {
      debugger;
      basket.id = localStorage.getItem('whishlist_id');

      basket.diplomaItems.push(itemToAdd);
      this.asignDiplomaValueToBasketItems(basket.diplomaItems);
      this.asignValueToBasketItems(basket.basketItems);
      this.finalResultToSend.id = basket.id;
      this.setWishlist(this.finalResultToSend, basket);
      return true;
    } else {
      // alert('this course is already in your Cart');
      return false;
    }
  }
  

  removeItemFromWishlist_forDiploma(item: any) {
    debugger;
    const basket = this.getCurrentWishlistValue();
    //get Basket ID from Browser
     basket.id = localStorage.getItem("whishlist_id");
    this.finalResultToSend.id = basket.id;

    debugger;
    if (basket.diplomaItems.some((i) => i.id === item.id)) {
      debugger;


      if (basket.diplomaItems.length > 0) {
              //return all items that's dose'n match with id of item
      basket.diplomaItems = basket.diplomaItems.filter((i) => i.id !== item.id);
        debugger;
        console.log(this.finalResultToSend);
                
        this.finalResultToSend.basketItems=[];
        this.finalResultToSend.diplomaItems=[];

        this.asignValueToBasketItems(basket.basketItems);
        this.asignDiplomaValueToBasketItems(basket.diplomaItems);
        this.setWishlist(this.finalResultToSend, basket);
          return true;
      } else {
        if((basket.diplomaItems.length === 0) &&(basket.basketItems.length === 0) ){
          this.deleteWishlist(basket);
          return false;
        }
      }
    }
  }
}
