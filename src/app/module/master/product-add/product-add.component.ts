import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../../../providers/app-constant/app-constant';
import { DataService } from '../../../providers/dataService/dataService';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
import { timeStamp } from 'console';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  public formData: any = { productImages: [], categoryIds: [] };
  public productPrice: any = [{ unit: '', mrp: 0, size: '', taxinclusive: true, status:true, taxPrice: 0, finalPrice: 0 }];
  public productInfo: any = [{ title: '', description: '' }];
  public user: any;
  public pagination: any = { pageNum: 1, numPerPage: 10 }
  public data: any;
  public parentCategoryList: any = [];
  public brandList: any = [];
  public subCategoryList: any = [];
  public selectedSubCat: any = []
  public selectedBrand: any = [];
  searchSource:any;

  constructor(
    public appConstant: AppConstant,
    public dataService: DataService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.getParentCategory();
    this.getAllBrand();
    this.route.queryParams.subscribe((params) => {
      if (params.productId) {
        this.getProductDetail(params.productId)
      }
    });

  }

  ngOnInit() {}


  newPrice() {
    let item = { unit: '', mrp: 0, size: '', taxinclusive: true, status:true, taxPrice: 0, finalPrice: 0 };
    this.productPrice.push(item)
  }

  removePrice(i, productPrice) {
     if(this.productPrice.length > 1){
      if (productPrice.productUnitId) {
        this.dataService.appConstant.showLoadder()
        this.dataService.deleteRequest(this.appConstant.SERVER_URLS['DELETE_PRODUCT_UNIT'] + productPrice.productUnitId).subscribe((response => {
          this.data = response;
          this.dataService.appConstant.hideLoader()
          if (this.data.status == 200) {
            this.productPrice.splice(i, 1)
          }
          else { }
        }), err => {
        })
      } else {
        this.productPrice.splice(i, 1)
      }
     }else{
       this.dataService.appConstant.erroTost("At lease 1 price is required.")
     }
  }

  newAbout() {
    let item = { title: '', description: '' };
    this.productInfo.push(item)
  }

  removeAbout(i,about) {
    if (about.productInformationId) {
      this.dataService.appConstant.showLoadder()
      this.dataService.deleteRequest(this.appConstant.SERVER_URLS['DELETE_PRODUCT_INFORMATION'] + about.productInformationId).subscribe((response => {
        this.data = response;
        this.dataService.appConstant.hideLoader()
        if (this.data.status == 200) {
          this.productInfo.splice(i, 1)
        }
        else { }
      }), err => {
      })
    } else {
      this.productInfo.splice(i, 1)
    }
  }



    /******************DELETE PRODUCT IMAGE ******************** */
    deleteProdImage(i,item) {
      if (item.imageId) {
        this.dataService.appConstant.showLoadder()
        this.dataService.deleteRequest(this.appConstant.SERVER_URLS['DELETE_PRODUCT_IMAGE'] + item.imageId).subscribe((response => {
          this.data = response;
          this.dataService.appConstant.hideLoader()
          if (this.data.status == 200) {
            this.formData.productImages.splice(i, 1)
          }
          else { }
        }), err => {
        })
      } else {
        this.formData.productImages.splice(i, 1)
      }
    }




  onSelectCategory() {
    this.subCategoryList = [];
    this.parentCategoryList.forEach(element => {
      if(element.categoryId == this.formData.parentCatId){
        this.subCategoryList = element.subCategory;
      }
    });
  }


  /*******************UPLOAD BASE 64 IMAGE*********************** */
  changeListener(event: any) {
    const Img = new Image();
    const filesToUpload = (event.target.files);
    Img.src = URL.createObjectURL(filesToUpload[0]);

    Img.onload = (e: any) => {
      let imgFiles = event.target.files;
      for (var i = 0; i < event.target.files.length; i++) {
        var imgname = event.target.files[i].name;
        var imageSize = event.target.files[i].size;
      }
      if (imageSize > '5024000') {
        alert('Please select image size less than 5MB');
        return false;
      } else {
        if (imgFiles) {
          for (const file of imgFiles) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent) => {
              const result = (<FileReader>event.target).result;
              let img = { base64: null, imageName: '' };
              img.base64 = result;

              if (imgname) {
                img.imageName = imgname;
              }
              this.formData.productImages.push(img)
            }
            reader.readAsDataURL(file);
          }
        }
      }
    }

  }




  /******************SUBMIT PRODUCT ******************** */
  submit(form: NgForm) {
      if (this.formData.productId && this.formData.productId > 0) {
        this.updateProduct(form)
      } else {
        this.addProduct(form)
      }
  }

  addProduct(form: NgForm) {
    this.formData.categoryIds = []
    this.formData.categoryIds.push(this.formData.subCategoryId)
    this.formData.categoryIds.push(this.formData.parentCatId)
    this.formData.productUnit = this.productPrice;
    this.formData.productInformation = this.productInfo;
    this.appConstant.showLoadder();
    this.dataService.postRequest(this.appConstant.SERVER_URLS['ADD_PRODUCT'], this.formData).subscribe((response => {
      this.data = response;
      this.appConstant.hideLoader()
      if (this.data.status == 200) {
        this.appConstant.sucessTost("Product Added Successfully")
        this.router.navigate(['/']);
        form.reset()
      }
      else { 
        this.appConstant.erroTost(this.data.message)
      }
    }), err => {
      this.appConstant.erroTost(this.data.message)
      this.appConstant.showLoadder();
    })
  }


  updateProduct(form: NgForm) {
    this.formData.categoryIds = []
    this.formData.categoryIds.push(this.formData.subCategoryId)
    this.formData.categoryIds.push(this.formData.parentCatId)
    this.formData.productUnit = this.productPrice;
    this.formData.productInformation = this.productInfo;
    this.appConstant.showLoadder();
    this.dataService.putRequest(this.appConstant.SERVER_URLS['UPDATE_PRODUCT'], this.formData).subscribe((response => {
      this.data = response;
      this.appConstant.hideLoader()
      if (this.data.status == 200) {
        form.reset()
        this.appConstant.sucessTost("Product Updated Successfully")
        this.router.navigate(['master']);
      }
      else { 
        this.appConstant.erroTost(this.data.message)
      }
    }), err => {
      this.appConstant.erroTost(this.data.message)
      this.appConstant.showLoadder();
    })
  }




  getProductDetail(id) {
    this.appConstant.showLoadder();
    this.dataService.getRequest(this.appConstant.SERVER_URLS['GET_PRODUCT_DETAIL'] + id).subscribe((response => {
      this.data = response;
      this.appConstant.hideLoader()
      if (this.data.status == 200) {
        this.formData = this.data.response
        this.getParentCategory();
        this.parentCategoryList.forEach(element => {
          this.formData.categoryIds.forEach(element1 => {
            if (element.categoryId == element1) {
                this.formData.parentCatId = element.categoryId;
                this.subCategoryList = element.subCategory
            }
          });

          element.subCategory.forEach(element2 => {
            this.formData.categoryIds.forEach(element3 => {
              if (element2.categoryId == element3) {
                    this.formData.subCategoryId = element2.categoryId;
              }
            });
          });          
        });

        if(this.formData.brand){
          this.formData.brandName = this.formData.brand.name;
        }
        this.productPrice = this.formData.productUnit;
        this.productInfo = this.formData.productInformation;
      }
      else { }
    }), err => {

    })
  }


  /******************GET ALL ACTIVE CATEGORIES ******************** */
  getAllBrand() {
    this.dataService.postRequest(this.appConstant.SERVER_URLS['ACTIVE_BRANDS'], this.pagination).subscribe((response => {
      this.data = response;
      if (this.data.status == 200) {
        this.brandList = this.data.response;
      }
      else { }
    }), err => {

    })
  }




  /******************GET ALL ACTIVE CATEGORIES ******************** */
  getParentCategory() {
    this.dataService.postRequest(this.appConstant.SERVER_URLS['ACTIVE_CATEGORIES'], this.pagination).subscribe((response => {
      this.data = response;
      if (this.data.status == 200) {
        this.parentCategoryList = this.data.response;
      }
      else { }
    }), err => {

    })
  }




  /*************CALCULATE FINAL PRICE OF UNIT************** */

   calulateFinalPrice(i){
     console.log('d')
    if(this.productPrice[i].sellingPrice && this.productPrice[i].sellingPrice  > 0){
      this.productPrice[i].finalPrice = this.productPrice[i].sellingPrice;

      //APPLY TAX
      if(this.productPrice[i].taxPercent && this.productPrice[i].taxPercent > 0){
        let taxAmount =  (this.productPrice[i].finalPrice * this.productPrice[i].taxPercent ) / 100
        this.productPrice[i].finalPrice =  ( this.productPrice[i].finalPrice + taxAmount) 
      }

      //calculate Discount 
       if(this.productPrice[i].offerable){
        if(this.productPrice[i].discountType && this.productPrice[i].discountType > 0){
          if(this.productPrice[i].discountValue && this.productPrice[i].discountValue > 0){
               //% Discount caltulation
              if(this.productPrice[i].discountType == 1){
                let discountAmount =  (this.productPrice[i].finalPrice * this.productPrice[i].discountValue ) / 100;
                this.productPrice[i].finalPrice -=  discountAmount
              }
              if(this.productPrice[i].discountType == 2){
                this.productPrice[i].finalPrice -=   this.productPrice[i].discountValue
              }
          
          }
        }
       }
    }
   }




   /***
    * CHECK SKU CODE AVAILABLE OR NOT
    * 
    */

    
   checkSKU(i) {
    this.dataService.getRequest(this.appConstant.SERVER_URLS['CHECK_SKU_AVAILABALITY']+this.productPrice[i].sku).subscribe((response => {
      this.data = response;
      if(this.data){
        this.productPrice[i].skuAvailable = 1;
      }else{
        this.productPrice[i].skuAvailable = 2;
      }
        
    }))
  }

}
