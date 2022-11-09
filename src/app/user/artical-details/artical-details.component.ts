import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticalService } from 'src/app/dashboard/DashServices/artical.service';
import { IArtical } from 'src/app/shared/models/artical';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';

@Component({
  selector: 'app-artical-details',
  templateUrl: './artical-details.component.html',
  styleUrls: ['./artical-details.component.css'],
})
export class ArticalDetailsComponent implements OnInit {
  articalId: number;
  artical: IArtical;

  breadCrumb: IBreadbrumb;

  constructor(
    private articalServe: ArticalService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.articalId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadArtical();
    this.breadCrumb = { title: this.translate.instant('ARTICAL_DETAILS') };
  }

  loadArtical(productId?: number) {
    this.articalServe.getSingleArtical(this.articalId).subscribe(
      (artic: any) => {
        this.artical = artic;
        console.log(this.artical);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
