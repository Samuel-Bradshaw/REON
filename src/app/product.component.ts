
import { Component, OnInit } from '@angular/core';
import {Product, Category} from './product';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    categories: Category[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.getProductRanges();
      }

   getProductRanges(): void {
    this.productService.getProductRanges()
      .subscribe(categories => this.categories = categories);
  }


}

