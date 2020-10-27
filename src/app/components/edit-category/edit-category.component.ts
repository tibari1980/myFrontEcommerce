import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Category } from './../../classes/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { stringify } from 'querystring';
import { Route } from '@angular/compiler/src/core';
import { Location } from '@angular/common';
import { from } from 'rxjs';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryModule:Category={code:0,name:'',description:'',photoName:'unknown.jpg'};
  categorie:any;
  selectedFiles: any;
  userFile: any;
  message: string;
  imgURL: string | ArrayBuffer;
  currentFileUpload: any;
  progress: number;
  categorieSaved={code:0,name:'',description:'',photoName:''};
  constructor(public catalogueService:CatalogueService,
              private router:ActivatedRoute,
              private route:Router) { }

  ngOnInit(): void {
    let code=this.router.snapshot.params.id;
    this.catalogueService.findOne('categories/'+code).subscribe(data=>{
       this.categorie=data;
       this.categoryModule={
         code:this.categorie.code,
         name:this.categorie.name,
         description:this.categorie.description,
         photoName:this.categorie.photoName
       };
      
    },error=>{
      alert(error);
    })
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles=event.target.files;
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        alert(this.message);
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

  onSubmitCat(){
   this.catalogueService.updateData(this.categoryModule,"categories",this.categoryModule.code)
   .subscribe(data=>{
    this.categorie=data;
    if(this.imgURL!==undefined){
      this.uploadPhotoCategorie();
      this.categorieSaved={code:this.categorie.code,
        name:this.categorie.name,
        description:this.categorie.description,
        photoName:this.categorie.photoName};
    }else{
      this.categorieSaved={code:this.categorie.code,
        name:this.categorie.name,
        description:this.categorie.description,
        photoName:this.categorie.photoName};
    }
      console.log("last categroei"+this.categorieSaved);
   },error=>{
     alert(error);
   })
  }

  uploadPhotoCategorie(){
    this.progress=0;
    this.currentFileUpload=this.selectedFiles.item(0);
     this.catalogueService.uploadDonnesCategories(this.currentFileUpload,this.categoryModule.code)
     .subscribe(event=>{
       if(event.type===HttpEventType.UploadProgress){
         this.progress=Math.round(100 * event.loaded /event.total);
       }else if(event instanceof HttpResponse){
         console.log('Photo updated successfully:)');
       }
     },erro=>{
           alert('Bad request');
     }); 
  }

  onGetAllCategories(){
    this.route.navigate(['admin/categories'])
    
  }
}
