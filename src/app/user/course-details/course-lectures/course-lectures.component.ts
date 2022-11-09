import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';

@Component({
  selector: 'course-lectures',
  templateUrl: './course-lectures.component.html',
  styleUrls: ['./course-lectures.component.css']
})
export class CourseLecturesComponent implements OnInit {

 @Input() CurrSection: ICurriculumSection[];
 @Input() isTakenCourse: boolean;

@Output() lessonlinkForVideo:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.CurrSection);
    
  }

onLessonClick(link:string){
  debugger
 this.lessonlinkForVideo.emit(link)
}








  
}
