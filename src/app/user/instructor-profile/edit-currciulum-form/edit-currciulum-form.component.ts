import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'edit-currciulum-form',
  templateUrl: './edit-currciulum-form.component.html',
  styleUrls: ['./edit-currciulum-form.component.css']
})
export class EditCurrciulumFormComponent implements OnInit {

  @Input() CourseID;
  @Input() curric:any;
  constructor() { }

  ngOnInit(): void {
    debugger;
    console.log(this.CourseID);
    console.log(this.curric);
    
  }

}
