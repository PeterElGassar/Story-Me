import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICurriculumSection } from 'src/app/shared/models/CurriculumSection';

@Component({
  selector: 'diploma-luctrues',
  templateUrl: './diploma-luctrues.component.html',
  styleUrls: ['./diploma-luctrues.component.css']
})
export class DiplomaLuctruesComponent implements OnInit {

  @Input() diplomaCourse: any[];
  @Input() isTakenDiploma: boolean;

  @Output() lessonlinkForVideo:EventEmitter<string> = new EventEmitter<string>();
  constructor() { }


  ngOnInit(): void {
    debugger;

    console.log(this.diplomaCourse);
    
  }

onLessonClick(link:string){
 this.lessonlinkForVideo.emit(link)
}


}
