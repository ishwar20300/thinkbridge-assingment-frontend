import { Component, OnInit } from "@angular/core";
import { AppConstant} from '../../../providers/app-constant/app-constant';
import { DataService} from '../../../providers/dataService/dataService';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  
  list: any = [];
  public item:any = {};
  public selectedId:any;
  public user: any;
  public pagination: any = { pageNum: 1, numPerPage: 10,ids :[] }
  public data: any;
  public isLoading:boolean = false;
  public recordCount:any = 0;
  public categories:any = [];
  public isSearchResult:boolean = false;
  public searchBy:any;
  constructor(
    public appConstant:AppConstant,
    public dataService:DataService
  ) {
    this.pagination.catId = "null";
    
  }

  ngOnInit() {
    console.log('product')
    this.getProducts();
    this.categoryList();
  }


  /******************GET ALL ACTIVE CATEGORIES ******************** */
  categoryList() {
    this.dataService.postRequest(this.appConstant.SERVER_URLS['ACTIVE_CATEGORIES'], this.pagination).subscribe((response => {
      this.data = response;
      if (this.data.status == 200) {
        this.categories = this.data.response;
      }
      else { }
    }), err => {

    })
  }

  onSelectCategory() {
    this.pagination.ids =[]
   this.pagination.ids.push(this.pagination.catId)
   this.searchProducts();
  }

  
  search(){
    this.pagination.searchBy = this.searchBy;
    this.searchProducts();
  }

  
public changeStatus(id):void{
  this.dataService.getRequest(this.appConstant.SERVER_URLS['CHANGE_PROUDCT_STATUS']+id).subscribe()
}



public changeStock(id):void{
  this.dataService.getRequest(this.appConstant.SERVER_URLS['CHANGE_STOCK_STATUS']+id).subscribe()

}



public changeUnitStatus(id):void{
  this.dataService.getRequest(this.appConstant.SERVER_URLS['CHANGE_PRODUCT_UNIT_STATUS']+id).subscribe()
}

public deleteProduct(id,i):void{
  this.dataService.appConstant.showLoadder()
  this.dataService.deleteRequest(this.appConstant.SERVER_URLS['DELETE_PRODUCT']+id).subscribe((response => {
    this.data = response;
    this.dataService.appConstant.hideLoader()
    if (this.data.status == 200) {
      this.list.splice(i, 1)
    }else{
      this.dataService.appConstant.erroTost("Product already in used. Catn't Detele")
    }
  }), err => {

  })
}






public selectItem(i):void{
  this.item = this.list[i];
  this.selectedId = this.item.productId
}


public pageChanged(event){
  this.pagination.pageNum = event;
  this.getProducts();
}


/*****************User This method in case of search******************** */
searchProducts(){
  this.dataService.postRequest(this.appConstant.SERVER_URLS['ALL_PRODUCT'], this.pagination).subscribe((response => {
    this.data = response;
    this.appConstant.hideLoader();
    if (this.data.status == 200) {
      this.isSearchResult = true;
      this.list = this.data.response;
      this.list.forEach(element => {
           element.finalPrice = element.productUnit[0].finalPrice
      });
      this.recordCount = this.data.count;
    }
    else {}
  }), err => {

  })
}




/******************GET ALL PRODUCT DETAIL******************** */
getProducts(){
  this.isLoading = true;
  this.appConstant.showLoadder();
  this.dataService.postRequest(this.appConstant.SERVER_URLS['ALL_PRODUCT'], this.pagination).subscribe((response => {
    this.data = response;
    this.isLoading = false;
    this.isSearchResult = false;
    this.appConstant.hideLoader();
    if (this.data.status == 200) {
      this.list = this.data.response;
      this.list.forEach(element => {
           element.finalPrice = element.productUnit[0].finalPrice
      });
      this.recordCount = this.data.count;
    }
    else {}
  }), err => {

  })
}
}


