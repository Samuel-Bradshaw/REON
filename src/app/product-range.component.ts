import { Component, OnInit } from '@angular/core';
import {Product, Category} from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-range',
  templateUrl: './product-range.component.html',
  styleUrls: ['./product-range.component.css']
})
export class ProductRangeComponent implements OnInit {

    category: Category;
    products: Product[] = [];

    constructor(private productService: ProductService,   private route: ActivatedRoute, private http: HttpClient) {
      route.params.subscribe(val => {
      this.getRange();
      this.getProducts();

    }); }

    ngOnInit() {
      }

  
  getProducts() {

     const headers: any = new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        options: any = {
          category_id:  +this.route.snapshot.url[1].path,
        },
    url : any = 'http://reonsynth.com/php/get_products.php';
    this.http.post(url , JSON.stringify(options), headers).subscribe(
        (data: any) => {
          this.products = data;
        
        },
      
    );
  }

  getRange(): void {
        const headers: any = new HttpHeaders({
            'Content-Type': 'application/json'
          }),
          options: any = {
              category_id:  +this.route.snapshot.url[1].path,
          },
      url : any = 'http://reonsynth.com/php/get_range.php';
      this.http.post(url , JSON.stringify(options), headers).subscribe(
          (data: any) => {
            this.category = data;
          },

          //TODO:
          //Handle error!
      
      );
    }


}
