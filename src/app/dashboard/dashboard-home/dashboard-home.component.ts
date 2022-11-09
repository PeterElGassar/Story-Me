import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  totalAmountNumber:any;  
  totalAmountStudentNumber:any;  

  constructor(private dashServe :DashboardService) { }

  ngOnInit(): void {
    
    this.totalAmountStudent();
    this.totalAmount();
  }


  totalAmountStudent() {
    debugger;

    this.dashServe.totalAmount().subscribe((res:any)=>{
      debugger;
      if(res){
        debugger;
      
         this.totalAmountNumber = res.totalAmount;

      }
    },error=>{
      console.log(error)
    })
  }

  totalAmount() {
    debugger;

    this.dashServe.totalAmountStudent().subscribe((res:any)=>{
      debugger;
      if(res){
        debugger;
         this.totalAmountStudentNumber = res.totalAmount

      }
    },error=>{
      console.log(error)
    })
  }
}
