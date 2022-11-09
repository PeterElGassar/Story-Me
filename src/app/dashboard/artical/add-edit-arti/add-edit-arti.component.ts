import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IArtical } from 'src/app/shared/models/artical';
import { ArticalService } from '../../DashServices/artical.service';

@Component({
  selector: 'add-edit-artical',
  templateUrl: './add-edit-arti.component.html',
  styleUrls: ['./add-edit-arti.component.css'],
  providers: [MessageService,ConfirmationService],

})
export class AddEditArtiComponent implements OnInit {
  @Input() artical: IArtical;

  selectedFile: File = null;
  formData: FormData = new FormData();
  id: 0;
  address: string;
  description: string;
  img_path: string;

  ngOnInit(): void {
    debugger;
    this.id = this.artical.id;
    this.address = this.artical.address;
    this.description = this.artical.description;
    this.img_path = this.artical.img_path;
  }
  constructor(
    private dashServe: ArticalService,
    private messageService: MessageService

    ) {}

  addCourse() {

    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }else{
      this.messageService.add({
        key: 'ImageErrorMs',
        severity: 'error',
        summary: 'معهد الدراسات النفسية',
        detail: 'اختر صورة المقال',
      });
      return 
    }

    this.formData.append('address', this.address);
    this.formData.append('description', this.description);

    debugger;
    this.dashServe.addArtical(this.formData).subscribe((res) => {
      debugger;

      this.messageService.add({
        key: 'addArtical',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم إضافة المقال بنجاح',
      });
    });
  }

  updateCourse() {
    if (this.selectedFile != null) {
      this.formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    this.formData.append('address', this.address);
    this.formData.append('description', this.description);

    debugger;
    this.dashServe.editArtical(this.formData, this.id).subscribe((res) => {
      debugger;
      this.messageService.add({
        key: 'addArtical',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل المقال بنجاح',
      });    });
  }
  //just for refresh Input file
  uploadPhoto(event) {
    debugger;
    if (event.files[0] && event.files) {
      this.selectedFile = <File>event.files[0];
      debugger;
      let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (e: any) => {
        this.img_path = e.target.result;
      };
    }


  }
}
