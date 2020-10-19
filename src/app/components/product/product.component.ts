import { CatalogueService } from './../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  size:number=9;
  page:number=0;
  products: any;

  constructor(private catalogueService:CatalogueService) { 

  }

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this.catalogueService.getData("products/search/productSelected?page="+this.page+"&size="+this.size)
    .subscribe(data=>{
      this.products=data;
      console.log(this.products);
    },error=>{
      console.log(error);
    })
    
  }

}
