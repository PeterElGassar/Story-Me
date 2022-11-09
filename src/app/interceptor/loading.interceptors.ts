import { BusyService } from './../core/services/busy.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


    constructor(private busyServe:BusyService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyServe.ShowBusy();
        return next.handle(req).pipe(
            delay(500),
            finalize(()=>{
                this.busyServe.HideBusy();
            })
        )
       
    }

}