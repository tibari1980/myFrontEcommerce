
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from './../../classes/category';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryModule:Category={code:0,name:'',description:'',photoName:'unknown.jpg'};
  categorieSaved={code:0,name:'',description:'',photoName:''};
  selectedFiles: any;
  userFile: any;
  message: string;
  imgURL: string | ArrayBuffer;
  progress: number;
  currentFileUpload: any;
  currentCategorie: any;
  constructor( private catalogueService:CatalogueService,
                private router:Router,
                private maDialog:MatDialog) { }

  ngOnInit(): void {
   
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles=event.target.files;
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

  onSubmitCat(){
     this.catalogueService.createData(this.categoryModule,'categories')
     .subscribe(data=>{
        this.currentCategorie=data;
        this.uploadPhotoCategorie();
        this.categorieSaved={code:this.currentCategorie.code,
                        name:this.currentCategorie.name,
                        description:this.currentCategorie.description,
                        photoName:this.currentCategorie.photoName};
     },error=>{
       alert(error);
       console.log(error);
     })
  }
  
  uploadPhotoCategorie(){
    this.progress=0;
    this.currentFileUpload=this.selectedFiles.item(0);
     this.catalogueService.uploadDonnesCategories(this.currentFileUpload,this.currentCategorie.code)
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

  onGetAllCategories(){
    this.router.navigate(['admin/categories']);
  }
}
