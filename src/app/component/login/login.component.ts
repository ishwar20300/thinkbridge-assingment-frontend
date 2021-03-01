import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/providers/dataService/dataService';
import { AppConstant } from 'src/app/providers/app-constant/app-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any;
  currentSessionData: any = {};
  loginData: any = {};
  loginDetails: any = {};
  deviceInfo = null;
  constructor(public router: Router,
    public appConstant: AppConstant,
    public dataService: DataService,
    ) {
    this.currentSessionData = JSON.parse(sessionStorage.getItem('currentUser'));

  }

  ngOnInit() {}

  login() {
    this.dataService.appConstant.showLoadder();
    this.dataService.postData(this.appConstant.SERVER_URLS['LOGIN'], this.loginData).subscribe((response => {
      this.data = response;
      this.appConstant.hideLoader()
      if (this.data.status == 200) {
        this.loginDetails = this.data.response;
        localStorage.setItem('sessionUser', JSON.stringify(this.loginDetails));
        this.router.navigate(['/']);
        this.appConstant.sucessTost(this.data.message)
      }
      else { 
        this.appConstant.erroTost(this.data.message)
      }
    }), err => {
      this.appConstant.erroTost(err)
      this.appConstant.hideLoader()
    });
  }

}
