import { WishlistComponent } from './wishlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistHomeComponent } from './wishlist-home/wishlist-home.component';

const routes: Routes = [

  {
    path: '',
    component: WishlistComponent,
    children: [
      {
        path: '',
        component: WishlistHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
