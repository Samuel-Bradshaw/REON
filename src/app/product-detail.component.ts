import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import{ RangeDescriptionComponent} from './range-description.component'; 


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

  product: Product;
  details: string[] = [];
  product_images: string[] = []; 

  slideIndex = 1;
  refresh: boolean;
  display1: string; slide1: string;
  display2: string; slide2: string;
  display3: string; slide3: string;
  display4: string; slide4: string; 

  @ViewChild(RangeDescriptionComponent) descComp;
  @ViewChild('scrollto') elemref: ElementRef;


  constructor( 
    private http: HttpClient,
  	private route: ActivatedRoute,
  	private productService: ProductService,
  	private location: Location,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
  	) {      route.params.subscribe(val => {
          this.refresh = true;
          });
   
    }

  ngOnInit() {

    this.getProduct();
    this.getDetails();
    this.getImages();
    this.showDivs(this.slideIndex);
      

  }

  
  isLoaded($event){
    if(this.refresh){
      this.elemref.nativeElement.scrollIntoView( {behavior: 'smooth' , block: "start", inline: "nearest"});
    }
  }

  getProduct(): void{
    const id = +this.route.snapshot.paramMap.get('id');
        
     const headers: any = new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        options: any = {
          product_id:  id,
        },
    url : any = 'http://localhost:80/REON/php/get_product_by_id.php';
    this.http.post(url , JSON.stringify(options), headers).subscribe(
        (data: any) => {
          this.product = data;
          this.product.youtube_url = "https://www.youtube.com/embed/"+this.product.youtube_url; 
      
       
        },
          //TODO:
          //Handle error!
    );   
  }

  getDetails():void{
     const id = +this.route.snapshot.paramMap.get('id');
        
     const headers: any = new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        options: any = {
          product_id:  id,
        },
    url : any = 'http://localhost:80/REON/php/get_product_details.php';
    this.http.post(url , JSON.stringify(options), headers).subscribe(
        (data: any) => {
           for(let i = 0; i < data.length; i++){
            this.details.push(data[i].detail);
          }
       
        },
          //TODO:
          //Handle error!
    ); 

  }


  getImages():void{
       const id = +this.route.snapshot.paramMap.get('id');
        
     const headers: any = new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        options: any = {
          product_id:  id,
        },
    url : any = 'http://localhost:80/REON/php/get_product_images.php';
    this.http.post(url , JSON.stringify(options), headers).subscribe(
        (data: any) => {
          for(let i = 0; i < data.length; i++){
            this.product_images.push(data[i].filepath);
          }
       
        },
          //TODO:
          //Handle error!
    ); 

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

