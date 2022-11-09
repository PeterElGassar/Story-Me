import { BasketHomeComponent } from './basket-home/basket-home.component';
import { BasketComponent } from './basket.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderFailComponent } from './order-fail/order-fail.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [

{
  path: '',
  component: BasketComponent,
  children: [
    {
      path: '',
      component: BasketHomeComponent,
    },
  ],
},
{
  path: '',
  component: BasketComponent,
  children: [
    {
      path: 'checkout',
      component: CheckoutPaymentComponent,
    },
  ],
},
{
  path: '',
  component: BasketComponent,
  children: [
    {
      path: 'subscribe-student',
      component: SubscribeComponent,
    },
  ],
},
{
  path: '',
  component: BasketComponent,
  children: [
    {
      path: 'order-success',
      component: OrderSuccessComponent,
    },
  ],
},
{
  path: '',
  component: BasketComponent,
  children: [
    {
      path: 'order-fail',
      component: OrderFailComponent,
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
