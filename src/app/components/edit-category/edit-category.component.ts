import { Category } from './../../classes/category';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryModule:Category={code:0,name:'',description:'',nomPhoto:'unknown.jpg'};
  categorie:any;
  selectedFiles: any;
  userFile: any;
  message: string;
  imgURL: string | ArrayBuffer;
  constructor(private catalogueService:CatalogueService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    let code=this.router.snapshot.params.id;
    this.catalogueService.findOne('categories/'+code).subscribe(data=>{
       this.categorie=data;
       this.categoryModule={
         code:this.categorie.code,
         name:this.categorie.name,
         description:this.categorie.description,
         nomPhoto:this.categorie.nomPhoto
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
  
  }
}
