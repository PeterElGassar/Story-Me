import { ICourseForBasket } from 'src/app/shared/models/Course';
import { Basket, IBasket, BasketToSend } from './../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDiploma } from '../shared/models/Diploma';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  readonly baseUrl: string = 'http://psycholoicaldashboard.innovations-eg.com/api/';
  private BasketSourse = new BehaviorSubject<any>(null);
  private Totalprice = new BehaviorSubject<number>(0);

  Basket$ = this.BasketSourse.asObservable();
  BasketTotal$ = this.Totalprice.asObservable();
  finalResultToSend = new BasketToSend();

  constructor(private http: HttpClient) {}

  //**********1
  getBasket(id: string) {
    
    return this.http.get(this.baseUrl + `showBasket/${id}`).pipe(
      map((basket: any) => {
        if (basket) {
          console.log(basket)
          
          let initialBasket: IBasket = {
            id: '',
            basketItems: [],
            diplomaItems: [],
          };
          for (let index = 0; index < basket.length; index++) {
            
            if (basket[index].type === 'course') {
              
              initialBasket.basketItems.push(basket[index]);
            }
          }

          for (let index = 0; index < basket.length; index++) {
            
            if (basket[index].type === 'diploma') {
              
              initialBasket.diplomaItems.push(basket[index]);
            }
          }
          
          this.BasketSourse.next(initialBasket);
          console.log();
          this.getGrandTotal();
        }
      })
    );
  }

  //**********2
  setBasket(basket: BasketToSend, basket_: IBasket) {
    
    return this.http.post(this.baseUrl + `addBasket`, basket).subscribe(
      (basket: IBasket) => {
        
        this.BasketSourse.next(basket_);
        this.getGrandTotal();
      },
      (error) => {
        
        console.log(error);
      }
    );
  }

  //**********3
  getCurrentBasketValue() {
    return this.BasketSourse.value;
  }

  //**********4
  addBasketItem(item: ICourseForBasket): boolean {
    //basketItems
    

    const itemToAdd: ICourseForBasket = item;
    //check if this user have one before
    const basket = this.getCurrentBasketValue() ?? this.createNewBasket();

    if (this.isInBasket(item, basket.basketItems)) {
      
      basket.id = localStorage.getItem('basket_id');

      basket.basketItems.push(itemToAdd);
      this.asignValueToBasketItems(basket.basketItems);
      this.finalResultToSend.id = basket.id;
      this.setBasket(this.finalResultToSend, basket);
      return true;
    } else {
      // alert('this course is already in your Cart');
      return false;
    }
  }

  //********5 to Create new Basket
  private createNewBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
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
  //********6 check if Item is taken before or not
  private isDiplomaInBasket(
    itemToAdd: IDiploma,
    allBasketitems: IDiploma[]
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
    
    console.log(this.finalResultToSend);
    this.finalResultToSend.basketItems=[];
    basketItemsIds.forEach((element) => {
      this.finalResultToSend.basketItems.push(element.id);
    });
  
  }

  asignDiplomaValueToBasketItems(diplomaBasketItemsIds: any) {
    
    console.log(this.finalResultToSend);
    this.finalResultToSend.diplomaItems=[];

    diplomaBasketItemsIds.forEach((element) => {
      this.finalResultToSend.diplomaItems.push(element.id);
    });
  }

  getGrandTotal(): void {
    let allCoursesInCart = this.BasketSourse.value;
    let GrandTotal: number = 0;
    allCoursesInCart.basketItems.forEach((cour) => {
      GrandTotal += +cour.price_after_discount;
    });

    allCoursesInCart.diplomaItems.forEach((cour) => {
      GrandTotal += +cour.price_after_discount;
    });
    // this.getCurrentBasketValue().basketItems.forEach((cour) => {
    //   debugger
    //   GrandTotal = (GrandTotal + cour.price_after_discount);
    // });
    this.Totalprice.next(GrandTotal);
  }

  deleteBasket(basket: any) {
    return this.http
      .delete(this.baseUrl + `RemoveBasket/` + basket.id)
      .subscribe(
        (res) => {
          this.BasketSourse.next(null);
          this.Totalprice.next(0);
          localStorage.removeItem('basket_id');
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  deleteBasketWhithOutClearDatabase() {
    
    this.BasketSourse.next(null);
    this.Totalprice.next(0);
    localStorage.removeItem('basket_id');
  }

  initalCheckout(userId: number, basketId: string) {
    debugger
    return this.http.post(this.baseUrl + `AuthenticationRequest/${basketId}`, {user_id: userId,});
  }
  initalSubscribe(userId: number) {
    return this.http.post(this.baseUrl + `Subscriptions/${userId}`,{});
  }

  addDiploamaBasketItem(diploma: IDiploma): boolean {
    //basketItems
    
    const itemToAdd: IDiploma = diploma;
    //check if this user have one before
    const basket = this.getCurrentBasketValue() ?? this.createNewBasket();

    if (this.isDiplomaInBasket(diploma, basket.diplomaItems)) {
      
      basket.id = localStorage.getItem('basket_id');

      basket.diplomaItems.push(itemToAdd);
      this.asignDiplomaValueToBasketItems(basket.diplomaItems);
      this.asignValueToBasketItems(basket.basketItems);
      this.finalResultToSend.id = basket.id;
      this.setBasket(this.finalResultToSend, basket);
      return true;
    } else {
      // alert('this course is already in your Cart');
      return false;
    }
  }

  showBasket() {
    if (localStorage.getItem('basket_id') !== null) {
      return this.http.get(
        this.baseUrl + `showBasket/${localStorage.getItem('basket_id')}`
      );
    }
  }

  deleteItemFromBasket(itemId, isCourse: boolean) {
    let objToSend: any;
    if (isCourse) {
      
      objToSend = { course_id: itemId };
      return this.http.delete(this.baseUrl +`DeleteBasket/${localStorage.getItem('basket_id')}?course_id=${itemId}`).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      
      objToSend = { diploma_id: itemId };
      return this.http.delete(this.baseUrl +`DeleteBasket/${localStorage.getItem('basket_id')}?diploma_id=${itemId}`)
        .subscribe(
          (res) => {
            
            console.log(res);
          },
          (error) => {
            
            console.log(error);
          }
        );
    }
    // if (localStorage.getItem('basket_id') !== null) {
    //   return this.http.delete(this.baseUrl + `DeleteBasket/${objToSend}`);
    // }
  }

//removeDiplomaItemFromBasket
  removeItemFromBasket(item: ICourseForBasket) {
    
    const basket = this.getCurrentBasketValue();
    //get Basket ID from Browser
     basket.id = localStorage.getItem("basket_id");
    this.finalResultToSend.id = basket.id;

    
    if (basket.basketItems.some((i) => i.id === item.id)) {
      


      if (basket.basketItems.length > 0) {
        //return all items that's dose't match with id of item
        basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
        
        console.log(this.finalResultToSend);
                
        this.finalResultToSend.basketItems=[];
        this.finalResultToSend.diplomaItems=[];

        this.asignValueToBasketItems(basket.basketItems);
        this.asignDiplomaValueToBasketItems(basket.diplomaItems);

        this.setBasket(this.finalResultToSend, basket);
        this.getGrandTotal();
      } else {
        if((basket.diplomaItems.length === 0) &&(basket.basketItems.length === 0) ){
          this.deleteBasket(basket);
        }
      }
    }
  }

  removeItemFromBasket2(item: any) {
    
    const basket = this.getCurrentBasketValue();
    //get Basket ID from Browser
     basket.id = localStorage.getItem("basket_id");
    this.finalResultToSend.id = basket.id;

    if (basket.diplomaItems.some((i) => i.id === item.id)) {


      if (basket.diplomaItems.length > 0) {
      //return all items that's dose'n match with id of item
      basket.diplomaItems = basket.diplomaItems.filter((i) => i.id !== item.id);
        this.finalResultToSend.basketItems=[];
        this.finalResultToSend.diplomaItems=[];

        this.asignValueToBasketItems(basket.basketItems);
        this.asignDiplomaValueToBasketItems(basket.diplomaItems);
        this.setBasket(this.finalResultToSend, basket);
        this.getGrandTotal();
      } else {
        if((basket.diplomaItems.length === 0) &&(basket.basketItems.length === 0) ){
          this.deleteBasket(basket);

        }
      }
    }
  }

}
