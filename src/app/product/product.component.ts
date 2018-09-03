
import { Component, OnInit } from '@angular/core';
import {Product} from '../product';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



    products: Product[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.getProducts();
      }

   getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products.slice(1, 5));
  }


}

