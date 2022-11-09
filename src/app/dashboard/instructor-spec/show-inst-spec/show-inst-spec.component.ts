import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IInstructorSpec } from 'src/app/shared/models/instructorSpec';
import { InstructorSpecService } from '../../DashServices/instructor-spec.service';

@Component({
  selector: 'show-inst-spec',
  templateUrl: './show-inst-spec.component.html',
  styleUrls: ['./show-inst-spec.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class ShowInstSpecComponent implements OnInit {

  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  instructorSpecs: IInstructorSpec[];

  spec: IInstructorSpec;
  //pagination
  rows = 5;
  recourdNumber: number;

  constructor(
    private dashServe: InstructorSpecService,
    private messageService: MessageService,
    private confirmationServ:ConfirmationService
    ) {
    debugger
    if(this.instructorSpecs != null){

    
    this.recourdNumber = this.instructorSpecs.length;
    }
  }

  ngOnInit(): void {
    this.getInstructorSpecs();
  }




  getInstructorSpecs() {
    this.dashServe.getInstructorSpec().subscribe(
      (response) => {      
        this.instructorSpecs = response;      
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
    this.modalTitle = 'إضافة تخصص جديد';
    this.ActivateAddEditEmpComp = true;

    this.spec={
      id:0,
      name:''
    }
  }


  editClick(specInstructor: any) {

    this.modalTitle = 'تعديل بيانات التخصص';
    this.ActivateAddEditEmpComp = true;
    debugger;
    this.spec = specInstructor;
  }

  closeEmpModal() {
    this.ActivateAddEditEmpComp = false;
    this.spec = null;
    //refresh
    this.getInstructorSpecs();
  }

  deleteClick(item: IInstructorSpec) {

    // if (confirm("are you sure")) {
    //   debugger
    //   this.dashServe.deleteInstructorSpec(item.id.toString()).subscribe(res => {
    //     debugger
    //     alert(res.toString());
    //     this.getInstructorSpecs();
    //   });}



    this.confirmationServ.confirm({
      target: event.target,
      message: 'هل تريد حذف التخصص ؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
          this.dashServe.deleteInstructorSpec(item.id.toString()).subscribe(res => {
            debugger;
            //Alerts
            this.messageService.add({
              key: 'removeInstructorSpec',
              severity: 'success',
              summary: 'معهد الدراسات النفسية',
              detail: 'تم حذف التخصص',
            });
            //refresh
            this.getInstructorSpecs()
          });
      },
      reject: () => {
          //reject action
      }
  });





  }










}
