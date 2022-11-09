import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, delay } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


    constructor(private router: Router) {


    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if (error.status === 400) {

                    }
                    if (error.status === 500) {

                    }

                }

                return throwError(error);
            })
        )
    }

}