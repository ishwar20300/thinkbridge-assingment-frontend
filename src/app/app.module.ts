import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./component/login/login.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { HeaderComponent } from "./component/header/header.component";
import { DatePipe } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { AppConstant } from "./providers/app-constant/app-constant";
import { DataService } from "./providers/dataService/dataService";
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule, 
    HttpClientModule, 
    AppRoutingModule, 
    NgxUiLoaderModule, 
    FormsModule],
  providers: [DataService, AppConstant,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
