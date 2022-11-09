import { Component, OnInit, Input } from '@angular/core';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

@Input() breadcrumb :IBreadbrumb;

title:string;
  constructor() { }

  ngOnInit(): void {
    this.title = this.breadcrumb.title;
  }

}
