import { CatalogueService } from './../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: Object;

  constructor(private catalogueService:CatalogueService) { }

  ngOnInit(): void {

    this.getAllCategories();
  }
  getAllCategories() {
    this.catalogueService.getData("categories")
    .subscribe(data=>{
      this.categories=data;
      console.log(this.categories);
    },error=>{
      console.log(error);
    })
  }

}
