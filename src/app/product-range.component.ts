import { Component, OnInit } from '@angular/core';
import {Product} from './product';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductService } from './product.service';

@Component({
  selector: 'app-product-range',
  templateUrl: './product-range.component.html',
  styleUrls: ['./product-range.component.css']
})
export class ProductRangeComponent implements OnInit {


    products: Product[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.getProducts();
      }

   getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}
