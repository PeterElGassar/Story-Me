import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptor/loading.interceptors';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrModule } from 'ngx-toastr';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'primeng/carousel';
import { ChipsModule } from 'primeng/chips';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DashboardModule } from './dashboard/dashboard.module';
import {BadgeModule} from 'primeng/badge';
import {RatingModule} from 'primeng/rating';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(), // ToastrModule added ,
    CarouselModule,
    ChipsModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    NgxSpinnerModule,
    DashboardModule,
    FormsModule ,
    BadgeModule,
    RatingModule,
    DialogModule,
    ButtonModule,
    CalendarModule
    // NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    DatePipe

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
