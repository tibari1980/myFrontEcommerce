import { Router } from '@angular/router';
import { Category } from './../../classes/category';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryModule:Category={code:0,nom:'',description:'',nomPhoto:''};
  selectedFiles: any;
  userFile: any;
  message: string;
  imgURL: string | ArrayBuffer;
  constructor( private catalogueService:CatalogueService,
                private router:Router) { }

  ngOnInit(): void {
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

  onSubmitCat(){
    const formData=new FormData();
    const categorie=this.categoryModule;
    formData.append('categorie',JSON.stringify(categorie));
    formData.append('file',this.userFile);
    this.catalogueService.createData(formData,'categories')
    .subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })    
  }
}
