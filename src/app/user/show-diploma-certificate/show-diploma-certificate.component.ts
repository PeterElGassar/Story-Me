import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DiplomaService } from 'src/app/dashboard/DashServices/diploma.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-show-diploma-certificate',
  templateUrl: './show-diploma-certificate.component.html',
  styleUrls: ['./show-diploma-certificate.component.css']
})
export class ShowDiplomaCertificateComponent implements OnInit {

  currentUser$: Observable<any>;
  diplomaId: number;
  course: any;
  constructor(
    private authServe: AuthService,
    private diplomaServe: DiplomaService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentUser$ = this.authServe.currentUser$;
  }

  ngOnInit(): void {
    this.diplomaId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadCourse();
  }
  
  loadCourse() {
    this.diplomaServe.getSingleDiploma(this.diplomaId).subscribe(
      (cour: any) => {
        this.course = cour;
        console.log("Diploma "+this.course);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
