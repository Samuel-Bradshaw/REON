
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

    searchText: string;

    constructor(private productService: ProductService, private http: HttpClient, private route: Router) { }

    ngOnInit() {
      this.getCategories();
      this.getProducts();
      }

  getProducts():void{
   this.http.get(
        ////////////////////////////
        'http://reonsynth.com/php/get_all_products.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.products = data;
        }, (error: any) => { console.log(error);}
        );
        
  }

    getCategories(): void {
    this.http.get(
        ////////////////////////////
        'http://reonsynth.com/php/get_product_ranges.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.categories = data;
          if(this.categories.length%2 == 1){
            document.getElementById("range-tiles").classList.add("odd-children");

          }
          if(this.categories.length == 1){
            document.getElementById("range-tiles").classList.add("single-child");
          }
        }, (error: any) => { console.log(error);}
        );
  }

}

