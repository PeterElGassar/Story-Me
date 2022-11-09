import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAsInstructorGuard implements CanActivate {
  constructor(private authServe:AuthService,private router : Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authServe.currentUser$.pipe(
      map((auth:any)=>{
        debugger
        if(auth.user.type === "instructor") return true
        console.log(auth);
        this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      })
    )
  }
  
}
