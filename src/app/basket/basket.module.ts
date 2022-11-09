import { UserModule } from './../user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { BasketHomeComponent } from './basket-home/basket-home.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderFailComponent } from './order-fail/order-fail.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketHomeComponent,
    CheckoutPaymentComponent,
    OrderSuccessComponent,
    OrderFailComponent,
    SubscribeComponent,
  ],
  imports: [CommonModule, BasketRoutingModule, UserModule, ConfirmDialogModule],
})
export class BasketModule {}
