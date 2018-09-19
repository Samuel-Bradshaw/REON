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
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login.component';
import { NeedAuthGuard } from './login-auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //sets default URL to home
  { path: 'home', component: HomeComponent },	
  { path: 'news', component: NewsComponent },	
  { path: 'products', component: ProductComponent },
  { path: 'support', component: SupportComponent },
  { path: 'about', component: DashboardComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  //admin pages
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin/new_product', component: AddProductComponent, canActivate: [NeedAuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [NeedAuthGuard]},


];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]

})
export class AppRoutingModule { }
