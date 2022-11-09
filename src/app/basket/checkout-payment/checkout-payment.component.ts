import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css'],
})
export class CheckoutPaymentComponent implements OnInit {
  userID: number;
  acceptToken: string;
  safeAcceptToken: SafeUrl;
  currentUser$: Observable<any>;
  iframeUrl: string = '';
  constructor(
    private basketServe: BasketService,
    private authServe: AuthService,
    private sanitizer: DomSanitizer
  ) {
   

  }
  ngOnInit(): void {
    debugger;
    this.authServe.currentUser$.subscribe((data: any) => {
      debugger;
      if (data) {
        debugger;

        this.userID = data.user.id;
        this.getPaymentToke();
      }
    });
    }

  getPaymentToke() {
    const basketId = localStorage.getItem('basket_id');

    // this.currentUser$

    if (localStorage.getItem('basket_id') !== null) {
      debugger;
      this.basketServe.initalCheckout(this.userID, basketId).subscribe((res: any) => {
          debugger;

          console.log(res);
          if (res.token) {
            debugger;

            this.acceptToken = res.token;
            console.log(this.acceptToken)
            this.iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/49791?payment_token=${this.acceptToken}`;
            this.safeAcceptToken= this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
            
            debugger;

          }
        });
    }
  }
}
