import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentCategorie=undefined;
  titreBoutique="Shopping By Tibari";
  constructor(private router:Router) { }

  ngOnInit(): void {
  this.onSelectedProduct();
  }

  onSelectedProduct(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/1/0');
  }
  onGetProductPromotion(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/4/0');
  }

  onGetProductDisponible(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/3/0');
  }
}
