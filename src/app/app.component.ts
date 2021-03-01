import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentSessionData: any = {};
  constructor(public router: Router) {
    this.currentSessionData = JSON.parse(localStorage.getItem('sessionUser'));
  }

  ngOnInit() {
    this.currentSessionData = JSON.parse(localStorage.getItem('sessionUser'));
    if (this.currentSessionData && this.currentSessionData.userId) {
    }else {
      this.router.navigate(["/login"]);
    }
  }
}
