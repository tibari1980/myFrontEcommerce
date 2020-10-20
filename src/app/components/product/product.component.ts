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
  constructor(private catalogueService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
        this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd) {
            let url = val.url;        
            let p1 = this.route.snapshot.params.p1;
            console.log("tibari last"+p1);
            if (p1 == 1) {
              this.title="Produits sélectionné :";
              this.getAllProduct("products/search/productSelected?page=" + this.page + "&size=" + this.size);
            } else if (p1 == 2) {
              //récupération idCategorie
              let idCat = this.route.snapshot.params.idCategorie;
              this.title= 'Produits de la catégorié : '+idCat;
              this.getAllProduct("categories/" + idCat + "/products?page=" + this.page + "&size=" + this.size);
            }else if(p1==3){
                console.log('je suis ici bravo !!!!!!')
                this.title='Produits disponible :';
                this.getAllProduct("products/search/productDisponible?page="+this.page+"&size="+this.size);  
            }else if(p1==4){
               this.title='Produits en promotion :';
               this.getAllProduct("products/search/productEnPromotion?page="+this.page+"&size="+this.size);
            }

          }
        });
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.title='Produits sélectionné :';
          this.getAllProduct("products/search/productSelected?page=" + this.page + "&size=" + this.size);
        }      
  }
  getAllProduct(url) {
    this.catalogueService.getData(url)
      .subscribe(data => {
        this.products = data;
        console.log(this.products);
      }, error => {
        console.log(error);
      })

  }

  onEditPhoto(product){
    this.currentProduct=product;
    this.editPhoto=true;
  }
  onSelectedFile(event){
    this.selectedFiles=event.target.files;
  }

  uploadPhotoProduct(){
    this.progress=0;
     this.currentFileUpload=this.selectedFiles.item(0);;
      this.catalogueService.uploadDonnesProducts(this.currentFileUpload,this.currentProduct.code)
      .subscribe(event=>{
        if(event.type===HttpEventType.UploadProgress){
          this.progress=Math.round(100 * event.loaded /event.total);
        }else if(event instanceof HttpResponse){
          alert('Photo dowloaded successfully!:');
        }
      },erro=>{
            alert('Bad request');
      });
      
    }
}
