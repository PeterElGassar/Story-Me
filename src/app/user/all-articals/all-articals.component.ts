import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticalService } from 'src/app/dashboard/DashServices/artical.service';
import { IArtical } from 'src/app/shared/models/artical';
import { IBreadbrumb } from 'src/app/shared/models/breadcrumb';

@Component({
  selector: 'app-all-articals',
  templateUrl: './all-articals.component.html',
  styleUrls: ['./all-articals.component.css']
})
export class AllArticalsComponent implements OnInit {
  breadCrumb: IBreadbrumb;
  articals: IArtical[];
  filteredArticals: IArtical[];

  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  
  set searchTerm(value: string) {
    this._searchTerm = value;
    if (value === '') {
      this.filteredArticals = this.articals;
    }
    // this.filteredAllCourses = this.filteredCourses(value);
  }
  constructor(private aricalServe: ArticalService,private translate :TranslateService) { }

  ngOnInit(): void {
    this.getAllArticals();
    this.breadCrumb = { title: this.translate.instant('ARTICALS') };
  }
  
  getAllArticals() {
    this.aricalServe.getArticals().subscribe(data => {
      debugger
      this.articals = data;
      this.filteredArticals = data;
    })
  }

  onSearch() {
    this.filteredArticals = this.filteredArticalsList(this.searchTerm);
  }

  filteredArticalsList(searchString: string): IArtical[] {
    return this.articals.filter(
      (artical) =>
        artical.address
          .toLocaleLowerCase()
          .indexOf(this.searchTerm.toLocaleLowerCase()) !== -1
    );
  }
}
