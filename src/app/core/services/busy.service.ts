import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;
  constructor(private spinnerServ: NgxSpinnerService) { }

  ShowBusy() {
    this.busyRequestCount++;
    this.spinnerServ.show(undefined, {
      type: 'line-spin-clockwise-fade',
      bdColor: 'rgba(250,250,250,0.95)',
      color: '#d21212',
      fullScreen:true,
      size:'medium'

    });
  }

  HideBusy() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerServ.hide();
    }
  }

















}
