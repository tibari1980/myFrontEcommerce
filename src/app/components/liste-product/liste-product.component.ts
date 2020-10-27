import { Product } from './../../classes/product';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-liste-product',
  templateUrl: './liste-product.component.html',
  styleUrls: ['./liste-product.component.css']
})
export class ListeProductComponent implements OnInit {
   page:number=0;
   size:number=8;
  products:any;
  showDataSpinner:boolean=false;
  constructor(private catalogueService:CatalogueService,private route:Router,private router:ActivatedRoute) { }

  ngOnInit(): void {
     this.getAllProducts();
     this.showDataSpinner=true;
     setTimeout(()=>{
      this.showDataSpinner=false;
     },3000)
  }

  //getAllProducts
  getAllProducts(){
    this.catalogueService.getData("products?page="+this.page+"&size="+this.size)
    .subscribe(data=>{
      this.products=data;
    },error=>{
      console.log(error);
    })

  }
  //créé un produit
  onCreateProduct():void{
    this.route.navigate(['admin/product/addProduit']);

  }

  //suppirmer un produit
  onDeleteProduct(item:Product):void{
       const conf=confirm('Êtes-vous sur de vouloir supprimer ce produit :'+item.code);
       alert(conf);
       if(conf){
         this.catalogueService.deleteData("products/"+item.code)
         .subscribe(data=>{
           console.log('Product deleted successfully!:)');
           this.getAllProducts();
         },error=>{
           console.log(error);
         })
       }
  }
  showProduct():void{

  }

  onEditProduct(code:number):void{
     this.route.navigateByUrl("admin/produit/edit/"+code);

  }
}
