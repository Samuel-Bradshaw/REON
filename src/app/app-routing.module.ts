import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';



const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } //sets default URL to dashboard

];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]

})
export class AppRoutingModule { }
