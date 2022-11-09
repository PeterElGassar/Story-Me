import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { BasketService } from '../basket.service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  userID: number;
  acceptToken: string;
  safeAcceptToken: SafeUrl;
  currentUser$: Observable<any>;
  iframeUrl: string = '';
  constructor(
    private basketServe: BasketService,
    private authServe: AuthService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    debugger;
    this.currentUser$ = this.authServe.currentUser$;

    this.getPaymentToke();
  }

  getPaymentToke() {
    const basketId = localStorage.getItem('basket_id');

    this.currentUser$.subscribe((data: any) => {
      debugger;
      if (data){ 
        
        this.userID = data.user.id
        debugger;
        this.basketServe.initalSubscribe(this.userID).subscribe((res: any) => {
            debugger;
            console.log(res);
            if (res.token) {
  
              debugger;
              this.acceptToken = res.token;
              this.iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/49791?payment_token=${this.acceptToken}`;
              this.safeAcceptToken = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
            }
          });
      };
    });

    
     
    
  }

}
