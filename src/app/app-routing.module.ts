import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { DashboardComponent }   from './dashboard.component';
import { ProductDetailComponent }  from './product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home.component';
import { NewsComponent } from './news.component';
import { SupportComponent } from './support.component';
import { BuyComponent } from './buy.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },	
  { path: 'news', component: NewsComponent },	
  { path: 'products', component: ProductComponent },
  { path: 'support', component: SupportComponent },
  { path: 'about', component: DashboardComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'new_product', component: AddProductComponent},
  { path: '', redirectTo: '/about', pathMatch: 'full' } //sets default URL to about


];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]

})
export class AppRoutingModule { }
