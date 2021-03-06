import { Product } from './../../classes/product';
import { CatalogueService } from './../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  size: number = 9;
  page: number = 0;
  products: any;
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  title:string='';
  categoryName:string='';
  categorie:any;
  timeSt:number=0;
  constructor(private catalogueService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
        
        this.timeSt=Date.now();
        this.route.paramMap.subscribe(params=>{
          console.log(params);
          let idCategorie=params.get('idCategorie');
          let  p1=+params.get('p1');
          if (p1 == 1) {
            this.title="Produits sélectionné :";
            this.getAllProduct("products/search/productSelected?page=" + this.page + "&size=" + this.size);
          } else if (p1==2) {
            //récupération idCategorie
            let idCategorie=this.route.snapshot.params.idCategorie;
            this.getCategory(idCategorie);
            this.getAllProduct("categories/" + idCategorie + "/products?page=" + this.page + "&size=" + this.size);
          }else if(p1 == 4){
            this.title="Produits disponible :";
            this.getAllProduct("products/search/productDisponible?page="+this.page+"&size="+this.size);
          }else if(p1 == 5){
            this.title="Produits en promotion :";
            this.getAllProduct("products/search/productEnPromotion?page="+this.page+"&size="+this.size);
            
          }else if(p1==3){
              this.title='Produits disponible :';
              this.getAllProduct("products/search/productDisponible?page="+this.page+"&size="+this.size);  
          }
          
          if (p1 == 1) {
            this.title='Produits sélectionné :';
            this.getAllProduct("products/search/productSelected?page=" + this.page + "&size=" + this.size);
          }   
        });            
          
  }
  getAllProduct(url) {
    this.catalogueService.getData(url)
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      })

  }

  onEditPhoto(product){
    this.currentProduct=product;
    this.editPhoto=true;
  }

    onShowProduct(product:Product){
      this.router.navigateByUrl('/product/'+product.code);
    }

    getCategory(idCategorie:number){
      this.catalogueService.findOne('/categories/'+idCategorie)
      .subscribe(cat=>{
        this.categorie=cat;
        this.categoryName=cat['name'];
        this.title="Produits de la catégorié :" + this.categoryName;
      },error=>{
        console.log(error);
      })
    }

    getTimeStamps(){
      return this.timeSt;      
    }
}
