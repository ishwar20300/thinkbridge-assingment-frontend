import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstant } from "../app-constant/app-constant";

@Injectable()
export class DataService {
  timeZone: any;

  constructor(public http: HttpClient, public appConstant: AppConstant) {
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }



  getRequest(url: string): Observable<any> {
    return this.http.get<any>(this.appConstant.BASE_URL + url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Bearer': this.appConstant.securityHeader(),
        timezone: this.timeZone,
      }),
    });
  }



  postRequest(url: string,data: any): Observable<any> {
    return this.http.post<any>(this.appConstant.BASE_URL+url, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Bearer': this.appConstant.securityHeader(),
        timezone: this.timeZone,
      }),
    });
    
  }


  postData(url: string,data: any): Observable<any> {
    return this.http.post<any>(this.appConstant.BASE_URL+url, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        timezone: this.timeZone,
      }),
    });
  }



  

  putRequest(url: string,data: any, ): Observable<any> {
    return this.http.put<any>(this.appConstant.BASE_URL+url, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Bearer': this.appConstant.securityHeader(),
        timezone: this.timeZone,
      }),
    });
  }



  deleteRequest(url: string): Observable<any> {
    return this.http.delete<any>(this.appConstant.BASE_URL + url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Bearer': this.appConstant.securityHeader(),
        timezone: this.timeZone,
      }),
    });
  }
}
