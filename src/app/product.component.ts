
import { Component, OnInit } from '@angular/core';
import {Product, Category} from './product';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    categories: Category[] = [];
    products: Product[];
    range_pics: string[];

    constructor(private productService: ProductService, private http: HttpClient, private route: Router) { }

    ngOnInit() {
      this.getProductRanges();
      this.getProducts();
      }

   getProductRanges(): void {
    this.productService.getProductRanges()
      .subscribe(categories => {
        this.categories = categories;
        if(this.categories.length = 1){
          //this.route.navigate(['/products/'+this.categories[0].category_id]);
        }}
        );
  }

  getProducts():void{
   this.http.get(
        ////////////////////////////
        'http://localhost:80/REON/php/get_all_products.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.products = data;
        }, (error: any) => { console.log(error);}
        );
        
  }

  getRangePictures():void{
    this.http.get(
        ////////////////////////////
        'http://localhost:80/REON/php/get_range_pics.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.range_pics = data;
        }, (error: any) => { console.log(error);}
        );
        

  }

}

