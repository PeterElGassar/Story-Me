import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IArtical } from 'src/app/shared/models/artical';
import { ArticalService } from '../../DashServices/artical.service';

@Component({
  selector: 'show-articals',
  templateUrl: './show-articals.component.html',
  styleUrls: ['./show-articals.component.css'],
    providers: [MessageService,ConfirmationService],

})
export class ShowArticalsComponent implements OnInit {

  articals: IArtical[];
  artical: IArtical;
  //pagination
  rows = 5;
  recourdNumber: number;
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;

  constructor(private dashServe: ArticalService,
    private messageService: MessageService,
    private confirmationServ:ConfirmationService
    ) {
    debugger
    if(this.articals != null){

    
    this.recourdNumber = this.articals.length;
    }
  }

  ngOnInit(): void {
    this.getArticals();
  }


  getArticals() {
    this.dashServe.getArticals().subscribe(
      (response) => {
        this.articals = response;       
      },(error) => {
        console.log(error);
      }
    );
  }


  clear(table: Table) {
    table.clear();
  }

  addNewClick() {
    this.modalTitle = 'إضافة  مقال';
    this.ActivateAddEditEmpComp = true;
    this.artical = {
      id: 0,
      address: '',
      description: '',
      img_path:'http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png',
          
    };
  }

  editClick(art: any) {
    this.modalTitle = 'تعديل بيانات المقال';
    this.ActivateAddEditEmpComp = true;
    debugger
    this.artical = art;
  }

  closeEmpModal() {
    this.ActivateAddEditEmpComp = false;
    //because Refill modal next time
    this.artical = null
    //does not exist yet
    this.getArticals();
  }

  deleteClick(courseId: number) {
    // if (confirm("are you sure")) {
    //   debugger
    //   this.dashServe.deleteArtical(courseId.toString()).subscribe(res => {
    //     debugger

    //     this.getArticals();
    //     alert(res.toString());

    //   });
    // }


    this.confirmationServ.confirm({
      target: event.target,
      message: 'هل تريد حذف المقالة ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
          this.dashServe.deleteArtical(courseId.toString()).subscribe(res => {
            debugger;
            //Alerts
            this.messageService.add({
              key: 'removeArtical',
              severity: 'success',
              summary: 'معهد الدراسات النفسية',
              detail: 'تم حذف المقالة',
            });
            //refresh
            this.getArticals()
          });
      },
      reject: () => {
          //reject action
      }
  });




  }




}
