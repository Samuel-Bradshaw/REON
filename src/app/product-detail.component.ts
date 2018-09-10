import { Component, OnInit, Input, Inject } from '@angular/core';

import { Product } from './product';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { ProductService }  from './product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogModalData {
  product: Product;
  photoNumber: number;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  slideIndex = 1;
  display1: string; slide1: string;
  display2: string; slide2: string;
  display3: string; slide3: string;
  display4: string; slide4: string; 


  constructor( 
  	private route: ActivatedRoute,
  	private productService: ProductService,
  	private location: Location,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
  	) { }

  ngOnInit() {

    this.getProduct();
    this.showDivs(this.slideIndex);
  }

  getProduct(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
    .subscribe(product => this.product = product);
  }

save(): void {
   this.productService.updateProduct(this.product)
     .subscribe(() => this.goBack());
 }

  goBack(): void {
    this.location.back();
  }


plusDivs(n: number): void {
  this.slideIndex += n;
  if(this.slideIndex > 4){this.slideIndex = 1}
  if(this.slideIndex < 1){this.slideIndex = 4}
  this.showDivs(this.slideIndex);
}

currentDiv(n: number):void {
  this.slideIndex = n;
  this.showDivs(this.slideIndex);
}

showDivs(n: number):void {

        if(n == 1){
          this.display1 = "block"; this.slide1 = "highlight";
          this.display2 = "none"; this.display3 = "none"; this.display4="none";
          this.slide2=""; this.slide3 = "", this.slide4 = ""}

        if(n == 2){
          this.display2 = "block"; this.slide2 = "highlight";
          this.display1 = "none"; this.display3 = "none"; this.display4="none";
          this.slide1=""; this.slide3 = "", this.slide4 = ""}


        if(n == 3){
         this.display3 = "block"; this.slide3 = "highlight";
         this.display1 = "none"; this.display2 = "none"; this.display4="none";
         this.slide1=""; this.slide2 = "", this.slide4 = ""}


        if(n == 4){
          this.display4 = "block"; this.slide4 = "highlight";
          this.display1 = "none"; this.display2 = "none"; this.display3="none";
          this.slide1=""; this.slide2 = "", this.slide3 = ""}
        }


}

