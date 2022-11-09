import { DiplomaService } from 'src/app/dashboard/DashServices/diploma.service';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';
import { ICourseForBasket } from 'src/app/shared/models/Course';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BasketService } from 'src/app/basket/basket.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-diplomas',
  templateUrl: './all-diplomas.component.html',
  styleUrls: ['./all-diplomas.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class AllDiplomasComponent implements OnInit {

  @ViewChild('whislistBtn') heartBtn: ElementRef;

  breadCrumb: IBreadbrumb;
  diplomas: IDiploma[];
  filteredDiplomas: IDiploma[];
  filteredDiplomas2: IDiploma[];
  page:number=1;
  page_:number=1;
  statusBtn: boolean = false;

  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  
  set searchTerm(value: string) {
    this._searchTerm = value;
    if (value === '') {
      this.filteredDiplomas = this.diplomas;
    }
    // this.filteredAllCourses = this.filteredCourses(value);
  }



  constructor(
    private DiplomaServe: DiplomaService,
    private whishlistServe: WishlistService,
    private messageService: MessageService,
    private basketServe :BasketService,
    private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.getAllDiplom();
    this.breadCrumb = { title: this.translate.instant('DIPLOMAS') };

  }

  getAllDiplom() {
    this.DiplomaServe.getDeploma().subscribe(data => {
      this.diplomas = data;
      this.filteredDiplomas = data;
      this.filteredDiplomas2 = data;
    })
  }
  initBreadCrumb() {

  }
  onSearch() {
    this.filteredDiplomas = this.filteredArticalsList(this.searchTerm);
  }

  filteredArticalsList(searchString: string): IDiploma[] {
    return this.diplomas.filter(
      (artical) =>
        artical.name
          .toLocaleLowerCase()
          .indexOf(this.searchTerm.toLocaleLowerCase()) !== -1
    );
  }
  
  addDiplomaToBasket(diploma: any) {
    let result = this.basketServe.addDiploamaBasketItem(diploma);
    if (result) {
      let courseNameSlice = diploma.name.slice(0, 20);
      let courseName =
        diploma.name.length > 20 ? `${courseNameSlice}...` : diploma.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'success',
          summary: 'معهد الدرسات النفسية',
          detail: `الي السلة ${courseName} تم إضافة الدبلومة`,
          life: 4000,
        });
      }, 2000);
    } else {
      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMessageWarning',
          severity: 'info',
          summary: 'معهد الدرسات النفسية',
          detail: 'هذه الدبلومة مضافة من قبل الي السلة',
        });
      }, 800);
    }
  }


  //WishList Toggle Function 

  toggleWishlist(event: any, course: any) {
    debugger;
    this.statusBtn = !this.statusBtn;
    const addtoWishList = this.heartBtn.nativeElement.classList.contains('in-withlist');

    if (addtoWishList) {
      //call remove
      this.removeFromWishlist(course)
    } else {
      //call add 
      this.addTowhishlist(course);
    }
  }




  addTowhishlist(diploma: IDiploma) {
    debugger
    let result = this.whishlistServe.addDiploamaBasketItem(diploma);
    if (result) {
      let courseName =
        diploma.name.length > 20 ? `${diploma.name.slice(0, 20)}...` : diploma.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: `الي المفضلة ${courseName} تم إضافة دبلومة`,
          life: 4000,
        });
      }, 2000);
    }

  }

  removeFromWishlist(diploma: any) {
    debugger;
    let result = this.whishlistServe.removeItemFromWishlist_forDiploma(diploma);

    if (result) {
      let courseName =diploma.name.length > 20 ? `${diploma.name.slice(0, 20)}...` : diploma.name;
      // setTimeOut Here

      setTimeout(() => {
        this.messageService.add({
          key: 'AddToCartMS',
          severity: 'warn',
          summary: 'معهد الدراسات النفسية',
          detail: `من المفضلة ${courseName} تم إزالة دورة`,
          life: 4000,
        });
      }, 2000);
    }

  }
}
