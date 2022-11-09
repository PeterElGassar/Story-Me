import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAsAdminGuard } from './core/gruads/auth-as-admin.guard';
import { AuthGuard } from './core/gruads/auth.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    // canActivate:[AuthGuard,AuthAsAdminGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./basket/basket.module').then((mod) => mod.BasketModule),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./wishlist/wishlist.module').then((mod) => mod.WishlistModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },

  {
    path: 'quizzes',
    // canActivate:[AuthGuard],
    loadChildren: () =>
      import('./quiz/quiz.module').then((mod) => mod.QuizModule),
  },

  { path: "**", redirectTo: "", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
