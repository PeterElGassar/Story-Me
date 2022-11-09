import { Component, OnInit } from '@angular/core';
import { IAboutUs } from '../shared/models/AboutUs';
import { ICertificate } from '../shared/models/certificate';
import { IContactUs } from '../shared/models/contact-us';
import { IContactForm } from '../shared/models/ContactForm';
import { ISiteWork } from '../shared/models/SiteWork';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashServe: DashboardService) {
    this.getContactUsData();
   
  }

  contactUsObj: IContactUs=null;
  aboutUsObj: IAboutUs;
  contactFormObj: IContactForm;
  //full crud
  certificateFormObj: ICertificate;
  siteWorkFormObj: ISiteWork;
  totalAmountNumber:any;  
  totalAmountStudentNumber:any;  

  ngOnInit(): void {
    this.initializData();
    this.getContactUsData();

  }

  updateSpec() {}



  closeEmpModal() {}

  getContactUsData() {
    this.dashServe.getSingleContactUs().subscribe((res) => {
      debugger;
      this.contactUsObj = res;
      console.log(this.contactUsObj);

    });
  }

  initializData() {
    this.contactUsObj={
      address:'',
      phone:'',
      email:'',
      work_hours:''
    }
  }


}
