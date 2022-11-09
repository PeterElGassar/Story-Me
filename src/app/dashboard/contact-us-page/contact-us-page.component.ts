import { Component, OnInit } from '@angular/core';
import { IContactUs } from 'src/app/shared/models/contact-us';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent implements OnInit {

  constructor(private dashServe: DashboardService) {
    this.getContactUsData();
  }

  contactUsObj: IContactUs;
  address:string;
  phone:string;
  email:string;
  work_hours:string;
  // aboutUsObj: IAboutUs;
  // contactFormObj: IContactForm;
  // //full crud
  // certificateFormObj: ICertificate;
  // siteWorkFormObj: ISiteWork;

  ngOnInit(): void {
    this.getContactUsData();
  }




  getContactUsData() {
    this.dashServe.getSingleContactUs().subscribe((res) => {
    if(res){
this.phone=res.phone;
this.email=res.email;
this.address=res.address;
this.work_hours=res.work_hours;
    }
    });
  }

  editContactUs(formData:any) {
    console.log(formData.value)
    this.dashServe.editContactUs(formData.value).subscribe((res) => {
      alert(res);
    },error=>{
      console.log(error)
    });
  }

}
