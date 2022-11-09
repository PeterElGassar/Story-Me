import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/dashboard/DashServices/student.service';

@Component({
  selector: 'app-watch-live',
  templateUrl: './watch-live.component.html',
  styleUrls: ['./watch-live.component.css'],
})
export class WatchLiveComponent implements OnInit {
  notificationId: number;
  notification: any;
  videoSrc: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private sanitizer: DomSanitizer,
    private router: Router

  ) {
    this.notificationId = +this.activatedRoute.snapshot.paramMap.get('id');
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.notificationId) {
      debugger;
      this.getNotificationDetails(this.notificationId);
    }
  }

  getNotificationDetails(notificationId) {
    this.studentService.getLinkNotificationById(notificationId).subscribe(
      (res:any) => {
        this.notification = res;

        this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(res.link_live);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
