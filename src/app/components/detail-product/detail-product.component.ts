import { Product } from './../../classes/product';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product:any;
  constructor(public catalogueService: CatalogueService, private route: Router,private router: ActivatedRoute) { }

  ngOnInit(): void {
    let codeProduct=this.router.snapshot.params.id;
    this.catalogueService.getData("products/"+codeProduct).subscribe(data=>{
      this.product=data;
    },error=>{
      console.log(error);
    })
  }


  onGetAllProduct(){
    this.route.navigate(['admin/produits']);
  }
}
