import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ArticalService } from 'src/app/dashboard/DashServices/artical.service';
import { IArtical } from 'src/app/shared/models/artical';

@Component({
  selector: 'articals',
  templateUrl: './articals.component.html',
  styleUrls: ['./articals.component.css'],
})
export class ArticalsComponent implements OnInit {
  articals: IArtical[];

  constructor(private serve: ArticalService) {}

  ngOnInit(): void {

    this.getArticals();
  }

  getArticals() {
    this.serve.getArticals().subscribe((data) => {
      this.articals = data;
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
