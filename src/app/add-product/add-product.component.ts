import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../product';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';
import { AddRangeComponent } from '../add-range/add-range.component';

import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, AfterViewInit {

  max_post_size: number = 80000000;

	categories: Category[];
	category: Category;
  /*new_category: Category;
  new_cat_id: number;*/
	category_name: string;
	category_description: string;

  range_page_image = null;
  range_page_image_url: any;
  opaque_height:number = 33;

  product_main_image = null;
  product_images: any[] = [];

	product_name: string;
	short_description: string;
	price: number;
	detail: string="";
	details: string[]=[];
  long_description: string;
  youtube_url: string;
	availability: string;

  new_product_id: number;

  success: number = 1;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private elementRef:ElementRef,
              private router: Router,
              private adminService: AdminService,
              ) { }

  ngAfterViewInit(){
    if(!this.adminService.isLogged()){
      this.router.navigate(['/admin/login']);
    }
  }

  ngOnInit() {
  	this.getCategories();
  }

  visitNewRangePage(e){
    if(e == 'The product is from a new range'){
      this.openDialog("Relocating to New Range page...");
      this.router.navigate(['/admin/add_range']);
    }
  }
/*
  onOutput(new_category: Category){
    this.new_cat_id = new_category.category_id;
    this.new_category = new_category;
    this.category = new_category;
  }*/

  addDetail(): void{
  	if(this.detail.length > 0){
  		this.details.push(this.detail);
  	}
    this.detail = "";
	}

	trackByFn(index: any, item: any) {
   	return index;
	}

	deleteDetail(i: number):void{
	this.details.splice(i,1);
}

  getCategories(): void {
    this.http.get(
      	////////////////////////////
        'http://REONsynth.com/php/get_product_ranges.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.categories = data;
        }, (error: any) => { console.log(error);}
        );
  }


 
 //PRODUCT UPLOAD


  //UPLOADS IMAGES AND UPDATES DATABASE
    productImagesUpload():void {

      let promises = [];

      promises.push(this.uploadImage(this.product_main_image,this.product_main_image.name, this.category.category_name+"/"+this.product_name));
      for(let i = 0; i < this.product_images.length; i++){
        promises.push(this.uploadImage(this.product_images[i], this.product_images[i].name, this.category.category_name+"/"+this.product_name));
      }
      Promise.all(promises)
        .then(values => {
          this.insertNewProduct();
        });
    }

  insertNewProduct():void{

    let pic = "images/"+this.category.category_name.replace(/ /g,'_')+"/"+this.product_name.replace(/ /g,'_')+"/"+this.product_main_image.name;
    
    console.log(this.youtube_url);
    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        name: this.product_name,
        description: this.short_description,
        price: this.price,
        available: this.availability,
        category_id: this.category.category_id,
        leading_photo_filepath: pic,
        long_description: this.long_description,
        youtube_url: this.youtube_url,
        
      },
      url: any = 
      /////////////////
      'http://reonsynth.com/php/insert_new_product.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        let num = Number(data);
        if(Number.isInteger(num)){
        console.log("Successfully inserted new product data");
         this.new_product_id = data;
         console.log(data);
         this.insertDetails();
       }else{
         this.openDialog("Error inserting product data: "+data);
       }
      },
      (error: any) => {
        this.openDialog("Error inserting product data.");
        this.success = 0;
      }
    );
  }  

  insertDetails():void{

    //Define options for post request 
    let opts = {};
    opts["product_id"] = this.new_product_id;
    opts["details"]=this.details;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = opts,     
      url: any = 
      /////////////////
      'http://REONsynth.com/php/insert_details.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        console.log(data);
        if(data === "Product details added to database"){
         this.insertImageInfo();
       }else{
         this.openDialog("Error adding details to database: "+ data);
       }
      },
      (error: any) => {
        this.openDialog("Error inserting product details. See console for details");
        console.log(error);
      }
    );
    
  }


  insertImageInfo():void{

    //Define options for post request 
    let opts = {};
    opts["product_id"] = this.new_product_id;
    const filepaths = [];
     for(let i = 0; i < this.product_images.length; i++){

         filepaths.push("images/"+this.category.category_name.replace(/ /g,'_')+
             "/"+this.product_name.replace(/ /g,'_')+"/"+this.product_images[i].name);
      }

    opts["image_filepaths"]= filepaths;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = opts,     
      url: any = 
      /////////////////
      'http://REONsynth.com/php/insert_image_info.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        console.log(data);
        if(data ==="Image details added to database"){
         this.openDialog('Product successfully added!');
         location.reload();
        }
          else{this.openDialog("Error inserting image details to database: "+data)};
      },
      (error: any) => {
        this.openDialog("Error inserting image info to database. See console for details.");
        console.log(error);
      }
    );
    
  }

  onMainImageSelected(event){
    this.product_main_image = <File>event.target.files[0];
    console.log(this.product_main_image);
  }  

    onProductImageSelected(event){
      for(let i = 0; i < event.target.files.length; i ++){
        this.product_images.push(<File>event.target.files[i]);
      }

    console.log(this.product_images);
  }  

  uploadImage(file: File, fileName: string, directory: string){

      if(file.size > this.max_post_size){
         this.openDialog("The files selected are too big to upload:\n"+
                           "Combined size of images = "+file.size/1000000+"MB.\n"+
                              "Maximum combined size of images = "+this.max_post_size/1000000+"MB.");
       } else {

      //send main image
      const formdata = new FormData();
      formdata.append('dir', directory.replace(/ /g, '_')); //will be used to create a new directory for range images on server
      formdata.append('FileToUpload', file, fileName);

      const headers = new HttpHeaders();
      headers.set('Content-Type', null);
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      return new Promise((resolve, reject) => {
        this.http.post(
        /*////////////////*/
        'http://REONsynth.com/php/upload_image.php',
        ////////////////////////////
        formdata, {headers: headers})
        .subscribe((data: any) => {
            console.log(data);
            if(data === "Success!"){
              console.log("Image "+fileName+" successfully uploaded.");
              resolve(data);
              }else if(data.trim() === "Upload failed:  Error: File already exists.") {
                resolve(data);
              } else {
                this.openDialog(data);
                reject(data);
              }
            },
          (error: any) => {
            console.log(error);
            this.openDialog('Error uploading image.\n See console for details.');
            reject('Error uploading image.\n See console for details.');
          });
      })
    }
  }

  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message,
      }
    });

 
  }


}
