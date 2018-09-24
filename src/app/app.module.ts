import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DialogComponent } from './dialog.component';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar.component';
import { NewsComponent } from './news.component';
import { SupportComponent } from './support.component';
import { BuyComponent } from './buy.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login.component';
import { NeedAuthGuard } from './login-auth.guard';
import { ProductRangeComponent } from './product-range.component';
import { AddRangeComponent } from './add-range/add-range.component';
import { RangeDescriptionComponent } from './range-description.component';
import { NewArticleComponent } from './new-article/new-article.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AddProductComponent,
    DialogComponent,
    HomeComponent,
    NavbarComponent,
    NewsComponent,
    SupportComponent,
    BuyComponent,
    AdminComponent,
    LoginComponent,
    ProductRangeComponent,
    AddRangeComponent,
    RangeDescriptionComponent,
    NewArticleComponent,
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    //HttpClientInMemoryWebApiModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [NeedAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
