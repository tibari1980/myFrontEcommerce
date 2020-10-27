import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { Category } from './../../classes/category';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { error } from 'protractor';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-liste-category',
  templateUrl: './liste-category.component.html',
  styleUrls: ['./liste-category.component.css']
})
export class ListeCategoryComponent implements OnInit {
  title:string='';
  page:number=0;
  size:number=20;
  categories: Object;
  showDataSpinner:boolean=false;
  mySubscription:any;
  constructor(private cataloguesService:CatalogueService,
              private route:Router,private router:ActivatedRoute) {
              
              }

  ngOnInit(): void {
   
    this.getAllCategories();
    this.showDataSpinner=true;
    setTimeout(()=>{
      this.showDataSpinner=false;
    },2000);
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
  onDelete(codeCat:number){
    const con=confirm('Êtes-vous sûr de vouloir supprimer la catégorie numéro : '+codeCat);
      if(con){
        this.cataloguesService.deleteData("categories/"+codeCat)
        .subscribe(data=>{
           alert('Categorie deleted successfully!:)');
          this.getAllCategories();
        },error=>{
          alert("error"+error);
        })
      }
  }


  onEditCategorie(code:number){
    this.route.navigate(['admin/categorie/edit/'+code]);
  }
 
  showCategory(item){
    console.log(item);
  }

}
