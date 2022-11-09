import { UserModule } from './../user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistHomeComponent } from './wishlist-home/wishlist-home.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { WishlistComponent } from './wishlist.component';


@NgModule({
  declarations: [WishlistComponent, WishlistHomeComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    ConfirmDialogModule,
    UserModule
  ]
})
export class WishlistModule { }
