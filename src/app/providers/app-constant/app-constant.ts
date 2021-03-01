import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class AppConstant {
  public BASE_URL: string = environment.baseUrl;
  
  

  constructor(private ngxService : NgxUiLoaderService) {}

  /*********Capitalize 1st letter********** */
  transform(value: string, args: any[]): string {
    if (value === null) return "Not assigned";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


  showLoadder(){
     this.ngxService.start();
  }

  showLoader(){
    this.ngxService.start();
 }

  hideLoader(){
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 1);

 }

   erroTost(message){
    var x = document.getElementById("error-snackbar");
    x.innerHTML =
      '<i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;' +
      message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
   }

   sucessTost(message){
    var x = document.getElementById("success-snackbar");
    x.innerHTML =
      '<i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;' +
      message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }


  successTost(message){
    var x = document.getElementById("success-snackbar");
    x.innerHTML =
      '<i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;' +
      message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  
  errorTost(message){
    var x = document.getElementById("error-snackbar");
    x.innerHTML =
      '<i class="fa fa-window-close" aria-hidden="true"></i>&nbsp;&nbsp;' +
      message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
   }



  public securityHeader() {
    if (localStorage.getItem('sessionUser')) {
      var user = JSON.parse(localStorage.getItem('sessionUser'));
      return btoa(
        user.accessToken + ':' + user.authToken + ':' + user.uuid
      );
    } else {
      return null;
    }
  }


  /*=================API LIST================== */

  public SERVER_URLS: any = {
    GET_IMAGE: this.BASE_URL+"file/",
    DOWNLOAD: this.BASE_URL+"file/download/",



    ADD_CATEGORY:"category/add",
    UPDATE_CATEGORY:"category/update",
    CHANGE_CATEGORY_STATUS:"category/change-status/",
    DELETE_CATEGORY:"category/delete/",
    ACTIVE_CATEGORIES:"category/web/active-parent-category",
    MASTER_CATEGORY_DATA:"category/admin/master-category",
    DELETE_IMAGE:"category/delete-category-image/",
    UPDATE_SEQUNCE:"category/update_sequence",

    
    ACTIVE_BRANDS:"brand/web/all-active-brand",
    ADD_BRAND:"brand/add",
    UPDATE_BRAND:"brand/update",
    CHANGE_BRAND_STATUS:"brand/change-status/",
    ALL_BRAND_LIST:"brand/admin/all-brand",
    DELETE_BRAND:"brand/delete/",
  

    ALL_PRODUCT:"product/admin/product-list",
    ADD_PRODUCT:"product/add",
    UPDATE_PRODUCT:"product/update",
    GET_PRODUCT_DETAIL:"product/",
    CHANGE_PROUDCT_STATUS:"product/change-status/",
    DELETE_PRODUCT:"product/delete/",
    CHANGE_STOCK_STATUS:"product/change-stock-status/",
    CHANGE_PRODUCT_INFOMATION_STATUS:"product/change-information-status/",
    CHANGE_PRODUCT_UNIT_STATUS:"product/change-product-unit-status/",
    CHANGE_PRODUCT_UNIT_STOCK:"product/change-unit-stock-status/",
    DELETE_PRODUCT_IMAGE:"product/delete-product-image/",
    DELETE_PRODUCT_INFORMATION:"product/delete-product-information/",
    DELETE_PRODUCT_UNIT:"product/delete-product-unit/",
    REMOVE_PROUDUCT_CATEGORY:"product/remove-product-category/",
    CHECK_SKU_AVAILABALITY:"product/check-sku-available/",


    //REPORTS
    REPORT_PRODUCT:"product/admin/report-product-list",
    USER_REPORT:"user/admin-user-report",

    //PRAMOTIONAL
    ADD_PRAMOTIONAL:"pramotional/add",
    UPDATE_PRAMOTIONAL:"pramotional/update",
    GET_PRAMOTIONAL:"pramotional/",
    PRAMOTIONAL_LIST:"pramotional/admin-list",
    CHANGE_STATUS:"pramotional/change-status/",
    DELETE_PRAMOTIONAL:"pramotional/delete/",
    SHOW_ON_TOP:"pramotional/show-on-top/",
    UPDATE_SEQUNCE_PROMO:"pramotional/update-seuence",


    //ORDER
    ORDER_LIST:"order/orders",
    ORDER_STATUS_CHANGE:"order/change-orders-status",
    CHECK_SHIPMENT_AVAILABALITY:"order/check-shipment/",
    PLACE_SHIPMENT_ORDER:"order/place_shipment_order",
    CANCEL_REFUND_ORDER:"order/cancel_refund_order",

    LOGIN:"authentication/login-with-password",

    //USER LIST
    USER_LIST:"user/admin-user-list",

    FEEDBACK_LIST:"feeback/list",


    //SLIDER
    ADD_SLIDER:"slider/add",
    UPDATE_SLIDER: "slider/update",
    DELETE_SLIDER:"slider/delete/",
    CHANGE_STATUS_SLIDER:"slider/change-status/",
    LIST_SLIDER:"slider/list",


    //TESTIMONIALS 
    ADD_TESTIMONIALS :"testimonials/add",
    UPDATE_TESTIMONIALS : "testimonials/update",
    UPDATE_TESTIMONIALS_POSITION : "testimonials/update-position",
    DELETE_TESTIMONIALS :"testimonials/delete/",
    CHANGE_STATUS_TESTIMONIALS :"testimonials/change-status/",
    LIST_TESTIMONIALS :"testimonials/list",
    
    
    STORE_LOCATION:"store/list",
    UPDATE_LOCATION:"store/update-list",
    DELETE_LOCATION:"store/delete-store/",


    //NOTIFICATION
    NOTIFICATION_SETTING_UPDATE:"appsetting/update_notification_setting",
    NOTIFICATION_DELETE:"appsetting/delete-notification/",
    NOTIFICATION_LIST:"appsetting/list",
    ADD_APPSETTING:"appsetting/add",
    APP_SETTING_LIST:"appsetting/appsetting-list/",

    EXPORT_PRODUCT:"export/product",
    EXPORT_CUSTOMER:"export/customer",

    //DASHBOARD
    ORDER_ANALYSIS:"dashboard/order-analysis",
    ORDER_STATUS_ANALYSIS:"dashboard/order-status-analysis",
    ORDER_DAYWISE_ANALYSIS:"dashboard/order-daywise-analysis",
    ORDER_MONTH_ANALYSIS:"dashboard/order-monthwise-analysis",

    SHIPMENT_PICKUP_ADDRESS:"order/get-pickup-location",
    

    //MASTER CHARGES
    ADD_MASTER_CHARGES:"master-charges/add",
    ADD_MASTER_DELETE:"master-charges/delete/",
    ADD_MASTER_LIST:"master-charges/list/"
    

  };
}
