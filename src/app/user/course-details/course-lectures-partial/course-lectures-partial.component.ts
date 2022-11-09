import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from 'src/app/dashboard/DashServices/student.service';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';

@Component({
  selector: 'course-lectures-partial',
  templateUrl: './course-lectures-partial.component.html',
  styleUrls: ['./course-lectures-partial.component.css']
})
export class CourseLecturesPartialComponent implements OnInit {

  @Input() CurrSection: ICurriculumSection[];
  @Input() isTakenCourse: boolean;
  
  @Input() USERId: any;
  @Input() COURSEId: any;
 
 @Output() lessonlinkForVideo:EventEmitter<string> = new EventEmitter<string>();
 opendLecture:any;
   constructor(private studentServe:StudentService) { }
 
   ngOnInit(): void {
     console.log(this.CurrSection);
     this.getOpendLuctrue();
   }
 
 onLessonClick(link:string){
   debugger
  this.lessonlinkForVideo.emit(link)
 }
 

  getOpendLuctrue() {
    debugger;
      this.studentServe.getStudent_payment(this.USERId,this.COURSEId).subscribe((response) => {
        this.opendLecture = response;
        console.log(this.opendLecture);
      },err=>{
        console.log(err)
      });
  }
  

}
