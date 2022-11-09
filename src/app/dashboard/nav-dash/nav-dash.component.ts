import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'nav-dash',
  templateUrl: './nav-dash.component.html',
  styleUrls: ['./nav-dash.component.css']
})
export class NavDashComponent implements OnInit {
  currentUser$: Observable<any>;

  constructor(    private authServe: AuthService,
    ) { 

    this.currentUser$ = this.authServe.currentUser$;

  }

  ngOnInit(): void {
  }

}
