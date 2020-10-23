import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Product } from './../../classes/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  product: any;
  title: string = '';
  category: any;
  userFile: any;
  imgURL: any;
  public message: string;
  public imagePath: any;
  imgUrl: any;
  showFormEditFile: boolean=false;
  progress: number;
  currentFileUpload: any;
  selectedFiles: any;
  currentProduct: any;
  showPhoto: boolean=false;
  constructor(private catalogueService: CatalogueService, 
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    let code = this.route.snapshot.params['id'];

    this.catalogueService.findOne("/products/" + code)
      .subscribe(data => {
        this.product = data;
        this.title = "Détail produit :" + data['name'];
        this.catalogueService.findOne("/products/" + data['code'] + "/category")
          .subscribe(catResponce => {
            this.category = catResponce;
            this.title += " Category :" + catResponce['name'];
          }, error => {
            alert('Problème est survenu lors du chargement du catégory');
            console.log(error);
          })
      }, error => {
        console.log(error);
      })
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles=event.target.files;
      console.log("tibari tibari tarik "+event.target.files[0])
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.imgURL = myReader.result;
        console.log(myReader.result);
      }
      myReader.readAsDataURL(file);
    }
  }
  
  onShowFormEditFile(product){
    this.currentProduct=product;
    this.showFormEditFile=true;
  }


  uploadPhotoProduct(){
    this.progress=0;
    console.log("tibari tibari toto :"+this.selectedFiles.item(0));
    this.currentFileUpload=this.selectedFiles.item(0);
     this.catalogueService.uploadDonnesProducts(this.currentFileUpload,this.product.code)
     .subscribe(event=>{
       if(event.type===HttpEventType.UploadProgress){
         this.progress=Math.round(100 * event.loaded /event.total);
       }else if(event instanceof HttpResponse){
         alert('Photo dowloaded successfully!:');
         this.showPhoto=true;
       }
     },erro=>{
           alert('Bad request');
     }); 
  }

  showProductsSelected(){
    this.router.navigateByUrl('/products/1/0');    
  }
}


