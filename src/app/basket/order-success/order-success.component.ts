import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private basketServe :BasketService) { }

  ngOnInit(): void {
    this.basketServe.deleteBasketWhithOutClearDatabase();
  }

}
