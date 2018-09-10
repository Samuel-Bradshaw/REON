import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { DashboardComponent }   from './dashboard.component';
import { ProductDetailComponent }  from './product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';



const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'about', component: DashboardComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'new_product', component: AddProductComponent},
  { path: '', redirectTo: '/about', pathMatch: 'full' } //sets default URL to about


];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]

})
export class AppRoutingModule { }
