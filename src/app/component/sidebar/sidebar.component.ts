import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public activeTab:any;
  public subtab:any;
  public openSubContaner:boolean = false;


  constructor() { 
    this.activeTab = 'Dashborad'
  }

  ngOnInit() {
  }

  public selectTab(tab):void{
    this.activeTab = tab;
    if(tab == 'Master'){
      if(this.openSubContaner){
      this.openSubContaner = false;
      }else{
        this.openSubContaner = true;
      }
    }
  }

  selectSubTab(tab){
    this.subtab = tab;
  }

  logout(){
    localStorage.clear()
  }
  

}
