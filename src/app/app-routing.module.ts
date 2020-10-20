import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';

const routes: Routes = [
  {path:'products/:p1/:idCategorie',component:ProductComponent},
  {path:'',redirectTo:'products/1/0',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
