import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { ProductComponent } from './components/product/product.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ShowCategoryComponent } from './components/show-category/show-category.component';
import { ListeCategoryComponent } from './components/liste-category/liste-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

import { ListeProductComponent } from './components/liste-product/liste-product.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    CategorieComponent,
    ProductComponent,
    ShowProductComponent,
    PageNotFoundComponent,
    EditCategoryComponent,
    ShowCategoryComponent,
    ListeCategoryComponent,
    AddProductComponent,
    EditProductComponent,
    DetailProductComponent,
    AddCategoryComponent,
    ListeProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
