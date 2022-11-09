import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'change-password-strudent',
  templateUrl: './change-password-strudent.component.html',
  styleUrls: ['./change-password-strudent.component.css']
})
export class ChangePasswordStrudentComponent implements OnInit {


  currentPassword:string;
  newPassword:string;
  ConfirmNewPassword:string;
  constructor() { }

  ngOnInit(): void {
  }




  
  ChangePassword(){

  }
}
