import { CatalogueService } from './../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: Object;
  currentCategorie;

  constructor(private catalogueService:CatalogueService,
              private router:Router) { }

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

  getProductByCategorie(categorie){
    this.router.navigateByUrl('/products/2/'+categorie.code);
  }
}
