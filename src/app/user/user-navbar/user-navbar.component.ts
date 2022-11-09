import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { IWishlist } from './../../shared/models/wishlist';
import { IBasket } from './../../shared/models/basket';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from 'src/app/shared/models/User';
import { AuthService } from '../auth.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Router } from '@angular/router';
import { BusyService } from 'src/app/core/services/busy.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/dashboard/DashServices/student.service';

@Component({
  selector: 'user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
  currentUser$: Observable<any>;
  basket$: Observable<IBasket>;
  whishlist$: Observable<IWishlist>;

  adminDropdownItems: MenuItem[];
  studentDropdownItems: MenuItem[];
  instructorDropdownItems: MenuItem[];
  options: MenuItem[];
  userID: number = 0;
  statusBtn: boolean = false;
  lengthOfCart: number=0;
  lang: boolean = false;
  currentLang: string ;
@ViewChild("navbarToggleBtn") navbarToggleBtn:ElementRef;
@ViewChild("body") body:ElementRef;
@ViewChild("bodyDom") DomBody:ElementRef;



  constructor(
    private authServe: AuthService,
    private basketServe: BasketService,
    private wishlistServe: WishlistService,
    public translate: TranslateService,
    public studentService: StudentService,
    private elRef:ElementRef
  ) {
    this.currentLang = localStorage.getItem('currentLang') || 'ar';
    this.translate.use(this.currentLang)
    this.currentUser$ = this.authServe.currentUser$;
    // this.getLoggedInUserId();
    
  }

  ngOnInit(): void {
    this.getLoggedInUserId();
    this.basket$ = this.basketServe.Basket$;
    this.whishlist$ = this.wishlistServe.Wishlist$;
    // console.log(this.currentUser$);
    this.getDrops();
    this.closeSidebar();
  }

  logout() {
    this.authServe.Logout();
  }

  getLoggedInUserId() {
    this.authServe.currentUser$.subscribe(
      (res: any) => {
        if (res) {
          this.userID = res.user.id;
          this.getStudentNotification(this.userID);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getDrops() {
    this.studentDropdownItems = [
      {
        label: 'الدورات',
        icon: 'pi pi-video',
        routerLink: [`/my-courses/${this.userID}`],
      },
      // { label: 'قائمة المفضلة', icon: 'pi pi-heart', routerLink: ['/wishlist'] },
      // {
      //   label: 'تعديل الحساب',
      //   icon: 'pi pi-user-edit',
      //   routerLink: [`/instructor-dashboard/${this.userID}`],
      // },
      { separator: true },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];

    this.adminDropdownItems = [
      {
        label: 'لوحة التحكم',
        icon: 'pi pi-sliders-h',
        routerLink: ['/dashboard'],
      },

      { separator: true },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];

    this.instructorDropdownItems = [
      // { label: 'دوراتي', icon: 'pi pi-video', routerLink: ['/myCourses'] },
      // {
      //   label: 'تعديل الحساب',
      //   icon: 'pi pi-user-edit',
      //   routerLink: [`/instructor-account/${this.userID}`],
      // },
      {
        label: 'لوحة التحكم',
        icon: 'pi pi-heart',
        routerLink: [`/instructor-dashboard/${this.userID}`],
      },

      { separator: true },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  openSidebar() {
    const bodyDom = this.navbarToggleBtn.nativeElement.closest('body');
    bodyDom.classList.add('active');
    console.log(this.body);
   
  }

  closeSidebar() {
    const Bodydom = document.getElementsByTagName('body')[0];
     Bodydom.classList.remove('active');
  }


  changeCurrentLang(lang:any) {
    this.translate.use(lang)
    this.currentLang = lang;
    localStorage.setItem('currentLang', lang);
  }
  userNotification:any[]=[];
  userNotificationNotWatched:any[]=[];
  getStudentNotification(userId) {
    debugger;
    this.studentService
      .singleUsersNotification(userId)
      .subscribe((res: any) => {
        debugger;

        if (res) {
          this.userNotification = res;        
          // basket.basketItems = basket.basketItems.filter((i) => i.id === item.id);

          this.userNotificationNotWatched = this.userNotification.filter((i)=> i.is_watch === 0);
          console.log(this.userNotification);
          console.log(this.userNotificationNotWatched);
        }
      });
  }

}
