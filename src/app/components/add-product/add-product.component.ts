import { Product } from './../../classes/product';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Category } from './../../classes/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productModule:Product={
    code: 0,
    name: '',
    description:'',
   currentPrice: 0,
    photoName: 'uncknown.jpg',
   available: false,
   selected: false,
    promotion:false
  }
  productSaved:Product={
    code: 0,
    name: '',
    description:'',
   currentPrice: 0,
    photoName: 'uncknown.jpg',
   available: false,
   selected: false,
    promotion:false
  };
  categorie:Category={code:0,name:'',description:'',photoName:'unknown.jpg'};
  userFile: any;
  selectedFiles: any;
  message: string;
  imgURL: string | ArrayBuffer;
  categories:any;
  currentCategorie:any;
  progress: number;
  currentFileUpload: any;
  currentProduct: any;
  codeCategorieSelected:any;

  constructor(private cataloguesServices:CatalogueService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.cataloguesServices.getData('categories').subscribe(data=>{
      this.categories=data;
    },error=>{
      console.log(error);
    })
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles=event.target.files;
      //si la photo est selected
      if(event.target.files[0].name!==undefined){
        this.productModule.photoName=event.target.files[0].name;
      }
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
 
  onSubmitProduct():void{
    console.log('on submit catSelected :'+this.codeCategorieSelected);
    this.cataloguesServices.createData(this.productModule,"products/addProduct/"+parseInt(this.codeCategorieSelected))
    .subscribe(data=>{
      this.currentProduct=data;
      this.uploadPhotoProduct();
     this.productSaved={
      code: data['code'],
      name: data['nom'],
      description:data['description'],
     currentPrice: data['currentPrice'],
      photoName: data['photoName'],
     available: data['available'],
     selected: data['selected'],
      promotion:data['promotion']

     }
    },error=>{
      console.log(error)
    })
  }

  
  uploadPhotoProduct(){
    this.progress=0;
    this.currentFileUpload=this.selectedFiles.item(0);
     this.cataloguesServices.uploadDonnesProducts(this.currentFileUpload,this.currentProduct.code)
     .subscribe(event=>{
       if(event.type===HttpEventType.UploadProgress){
         this.progress=Math.round(100 * event.loaded /event.total);
       }else if(event instanceof HttpResponse){
         console.log("Photo downloaded successfully :)");
       }
     },erro=>{
           alert('Bad request');
     });
      
  }

  //categorie Selected
  selectCategorie(selectedValue:number){
    this.codeCategorieSelected=selectedValue;
  }
  findCategorie(id:number){
    this.cataloguesServices.findOne("categories/"+id).subscribe(data=>{
      this.currentCategorie=data;
      this.categorie={code:this.currentCategorie.code,
        name:this.currentCategorie.name,
        description:this.currentCategorie.description,
        photoName:this.currentCategorie.photoName};
        console.log(this.categorie);
    },error=>{
      console.log(error);
    })
  }

  onGetAllProducts()
  { this.router.navigate(['admin/produits']);
  }

  log(x){
    console.log(x);
  }
}
