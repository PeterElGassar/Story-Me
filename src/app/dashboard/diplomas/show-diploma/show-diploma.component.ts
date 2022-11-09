import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IDiploma } from 'src/app/shared/models/Diploma';
import { DiplomaService } from '../../DashServices/diploma.service';

@Component({
  selector: 'show-diploma',
  templateUrl: './show-diploma.component.html',
  styleUrls: ['./show-diploma.component.css'],
  providers: [MessageService,ConfirmationService],

})
export class ShowDiplomaComponent implements OnInit {

  deplomas: IDiploma[];
  bestSellerDeplomas: any;
  lessSellerDeplomas: any;
  
  deploma: IDiploma;
  //pagination
  rows = 5;
  recourdNumber: number;
  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;

  constructor(
    
    private dashServe: DiplomaService,
    private messageService: MessageService,
    private confirmationServ:ConfirmationService
    ) {
    debugger;
    if (this.deplomas != null) this.recourdNumber = this.deplomas.length;
  }

  ngOnInit(): void {
    this.getDiploma();
    this.getBestSellerDeploma();
    this.getLessSellerOfDiploma();
  }

  getDiploma() {
    this.dashServe.getDeploma().subscribe(
      (response) => {
        debugger;
        this.deplomas = response;
        console.log(this.deplomas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  addNewClick() {
    this.modalTitle = 'إضافة دبلومة دورة';
    this.ActivateAddEditEmpComp = true;
    this.deploma = {
      id:0,
      name: "",
      description: "",
      courses_number: 0,
      rate_instructor: 0,
      price_before_discount: 0.00,
      price_after_discount: 0.00,
      img: "http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png",
      created_at: "",
      img_path: "http://psychiatry.ajathy.com/public/uploads/placeholders/placeholder.png"
  
    };
  }

  editClick(depl: any) {
    this.modalTitle = 'تعديل بيانات الدبلومة';
    this.ActivateAddEditEmpComp = true;
    debugger;
    this.deploma = depl;
  };

  closeCourseModal() {
    this.ActivateAddEditEmpComp = false;
    debugger;
    //because Refill modal next time
    this.deploma = null;
    //refresh
    this.getDiploma();
  }


  
  deleteClick(courseId: number) {
    // if (confirm("are you sure")) {
    //   this.dashServe.deleteDeploma(courseId.toString()).subscribe(res => {
    //     this.getDiploma();
    //     alert(res.toString());
    //   });
    // }




    this.confirmationServ.confirm({
      target: event.target,
      message: 'هل تريد حذف الدبلومة ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
          this.dashServe.deleteDeploma(courseId.toString()).subscribe(res => {
            debugger;
            //Alerts
            this.messageService.add({
              key: 'removeInstructor',
              severity: 'success',
              summary: 'معهد الدراسات النفسية',
              detail: 'تم حذف الدبلومة',
            });
            //refresh
            this.getDiploma()
          });
      },
      reject: () => {
          //reject action
      }
  });


  }

  
  getBestSellerDeploma() {
    this.dashServe.getBestSellerDeploma().subscribe((response) => {
        debugger;
        this.bestSellerDeplomas = response;
        console.log(this.deplomas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLessSellerOfDiploma() {
    this.dashServe.getLessSellerOfDiploma().subscribe((response) => {
        debugger;
        this.lessSellerDeplomas = response;
        console.log(this.deplomas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
