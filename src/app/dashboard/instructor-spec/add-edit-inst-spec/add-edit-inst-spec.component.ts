import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IInstructorSpec } from 'src/app/shared/models/instructorSpec';
import { InstructorSpecService } from '../../DashServices/instructor-spec.service';

@Component({
  selector: 'add-edit-inst-spec',
  templateUrl: './add-edit-inst-spec.component.html',
  styleUrls: ['./add-edit-inst-spec.component.css'],
  providers: [MessageService,ConfirmationService],

})
export class AddEditInstSpecComponent implements OnInit {
  // @Input() instructorSpeces: IInstructorSpec;

  id: 0;
  name: string;

  formData = new FormData();

  @Input() inputSpec: IInstructorSpec;

  ngOnInit(): void {
    debugger;
    this.id = this.inputSpec.id;
    this.name = this.inputSpec.name;
  }

  constructor(
    private dashServe: InstructorSpecService,
    private messageService: MessageService,

  ){
    
  }

  addSpec() {
    this.formData.append('name', this.name);
    debugger;
    this.dashServe.addInstructorSpec(this.formData).subscribe((res) => {
      this.messageService.add({
        key: 'addSpec',
        severity: 'success',
        summary: 'معهد الدراسات النفسية',
        detail: 'تم تعديل بيانات المدرب بنجاح ',
      });      // this.toastr.success(res.toString());
      // this.inputSpec = null;
    });
  }

  updateSpec() {
    this.formData.append('name', this.name);
    this.dashServe
      .editInstructorSpec(this.formData, this.id)
      .subscribe((res) => {

        this.messageService.add({
          key: 'addSpec',
          severity: 'success',
          summary: 'معهد الدراسات النفسية',
          detail: 'تم تعديل أسم التخصص',
        });
      });
  }
}
