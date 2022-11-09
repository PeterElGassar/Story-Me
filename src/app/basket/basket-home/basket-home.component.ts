import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { AuthService } from 'src/app/user/auth.service';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-home',
  templateUrl: './basket-home.component.html',
  styleUrls: ['./basket-home.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class BasketHomeComponent implements OnInit {
  currentUser$: Observable<any>;

  basket$: Observable<IBasket>;
  basketTotalPrice$: Observable<any>;
  grandTotal: number = 0;
  allBasketCourses: any;
  isLoggedIn: boolean = false;
  allBaskeItem: any[] = [];

  constructor(
    private basketServe: BasketService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    
    this.basket$ = this.basketServe.Basket$;
    this.basketTotalPrice$ = this.basketServe.BasketTotal$;
    this.currentUser$ = this.authService.currentUser$;
    this.getbasketItems();
    // this.getAllBasketCourse();
  }

  ngOnInit(): void {
    // this.getAllBasketCourse();
    // this.initalGrandTotal();
    this.basket$ = this.basketServe.Basket$;
    this.basketTotalPrice$ = this.basketServe.BasketTotal$;
    this.checkIfLoggedIn();
    console.log(this.basketTotalPrice$);
  }

  checkIfLoggedIn() {
    let token = localStorage.getItem('token');
    if (token !== null || token !== undefined) this.isLoggedIn = true;
  }

  confirmDeleteCourseItem(item: any) {
    this.confirmationService.confirm({
      message: 'هل تريد ازالة هذه الدورة ؟',
      header: 'معهد الدراسات النفسية',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Confirmed',
        //   detail: 'You have accepted',
        // });
        this.basketServe.removeItemFromBasket(item);
      },
      reject: (type) => {},
    });
  }

  confirmDeleteDiplomaItem(item: any) {
    this.confirmationService.confirm({
      message: 'هل تريد ازالة هذه الدبلومة ؟',
      header: 'معهد الدراسات النفسية',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.basketServe.removeItemFromBasket2(item);
        this.getbasketItems();
      },
      reject: (type) => {},
    });
  }

  getbasketItems() {
    this.basketServe.showBasket().subscribe((data: any) => {
      this.allBaskeItem = data;
      console.log(this.allBaskeItem);
    });
  }
}
