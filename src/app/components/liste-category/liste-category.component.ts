import { Router } from '@angular/router';
import { Category } from './../../classes/category';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-liste-category',
  templateUrl: './liste-category.component.html',
  styleUrls: ['./liste-category.component.css']
})
export class ListeCategoryComponent implements OnInit {
  title:string='';
  page:number=0;
  size:number=8;
  categories: Object;
  constructor(private cataloguesService:CatalogueService,
              private route:Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }
  //all Categories
  getAllCategories(){
    this.cataloguesService.getData("/categories?page="+this.page+"&size="+this.size)
    .subscribe(data=>{
        this.categories=data;
        console.log(this.categories);
    },error=>{
      console.log(error);
    })
  }

  onCreateCategorie(){
    this.route.navigate(['/admin/categorie/addCategorie']);
  }
}
