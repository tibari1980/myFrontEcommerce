import { AddProductComponent } from './components/add-product/add-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListeProductComponent } from './components/liste-product/liste-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ListeCategoryComponent } from './components/liste-category/liste-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { ShowCategoryComponent } from './components/show-category/show-category.component';

const routes: Routes = [
  {path:'products/:p1/:idCategorie',component:ProductComponent},
  {path:'product/:id',component:ShowProductComponent},
  {path:'',redirectTo:'products/1/0',pathMatch:'full'},
 
  {path:'admin/categories',component:ListeCategoryComponent},
  {path:'admin/categorie/edit/:id',component:EditCategoryComponent},
  {path: 'admin/categorie/detail/:id',component:ShowCategoryComponent},
  {path: 'admin/categorie/addCategorie',component:AddCategoryComponent},
  {path:'admin/produits',component:ListeProductComponent},
  {path:'admin/produit/edit/:id',component:EditProductComponent},
  {path:'admin/produit/detail/:id',component:DetailProductComponent},
  {path:'admin/product/addProduit',component:AddProductComponent},


  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
