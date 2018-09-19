import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../product';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit  {

  max_post_size: number = 100000000;

	categories: Category[];
	category: Category;
  new_category: Category;
  new_cat_id: number;
	category_name: string;
	category_description: string;

  range_link_image = null;
  range_link_image_url: any;
  range_page_image = null;
  range_page_image_url: any;

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
              public dialog: MatDialog) { }

  ngOnInit() {
  	this.getCategories();
  }

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
        'http://localhost:80/REON/php/get_product_ranges.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.categories = data;
        }, (error: any) => { console.log(error);}
        );
  }


  //Category upload

  addNewProductRange():void{
    let pic1 = "/images/"+this.category_name.replace(/ /g,'_')+"/"+this.range_link_image.name;
    let pic2 =  "/images/"+this.category_name.replace(/ /g,'_')+"/"+this.range_page_image.name;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        category_name: this.category_name,
        category_description: this.category_description,
        picture_1_filepath: pic1,
        picture_2_filepath: pic2,
        
      },
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/add_new_range.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
         this.new_cat_id = data;
         this.new_category = {category_id: this.new_cat_id, 
                              category_name: this.category_name, 
                              category_description:this.category_description, 
                              picture_1_filepath: pic1, 
                              picture_2_filepath: pic2};
         this.category = this.new_category;
         this.openDialog("New range "+this.category_name+" added to database.");
      },
      (error: any) => {
        this.openDialog(error);
      }
    );

  }

    //Uploads range pics to server
    categoryImagesUpload(){

      if(this.range_link_image.size + this.range_page_image.size > this.max_post_size){
         this.openDialog("The file selected are too big to upload:\n Maximum combined size of images = "+this.max_post_size/1000000+"MB.");}
      else {

      const formdata = new FormData();
      formdata.append('dir', this.category_name); //will be used to create a new directory for range images on server
      formdata.append('range_link_image', this.range_link_image, this.range_link_image.name);
      formdata.append('range_page_image', this.range_page_image, this.range_page_image.name);

      const headers = new HttpHeaders();
      headers.set('Content-Type', null);
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      this.http.post(
        /*////////////////*/
        'http://localhost:80/REON/php/upload_range_images.php',
        ////////////////////////////
        formdata, {headers: headers})
        .subscribe(res => {
            let result = res;
            console.log(result);
            if(result === "Sucess! Images uploaded"){
              //upload new category to database
              this.openDialog("Images "+ this.range_page_image.name +",\n"+ this.range_page_image.name +"\nsuccessfully uploaded.");
              this.addNewProductRange();
              }
            },
          (error: any) => {
            this.openDialog(error);}
        );}
      }

    onRangeLinkImageSelected(event){
      this.range_link_image = <File>event.target.files[0];
      console.log(this.range_link_image);

      //Display pictures on pages before uploading 
      if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      //target:EventTarget;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
        this.range_link_image_url = imgsrc.target.result;
      }
    }

   
    }

   onRangePageImageSelected(event){
    this.range_page_image = <File>event.target.files[0];
    console.log(this.range_page_image);

       //Display pictures on pages before uploading 
      if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
     // target:EventTarget;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
        this.range_page_image_url = imgsrc.target.result;
      }
    }
  }  

   
 //PRODUCT UPLOAD


  //UPLOADS IMAGES AND UPDATES DATABASE
    productImagesUpload():void {

     this.uploadImage(this.product_main_image,this.product_main_image.name, this.category.category_name+"/"+this.product_name);
      for(let i = 0; i < this.product_images.length; i++){
        this.uploadImage(this.product_images[i], this.product_images[i].name, this.category.category_name+"/"+this.product_name);
      }
      this.insertNewProduct();
    }

  insertNewProduct():void{

    let pic = "/images/"+this.category.category_name.replace(/ /g,'_')+"/"+this.product_name.replace(/ /g,'_')+"/"+this.product_main_image.name;
    
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
      'http://localhost:80/REON/php/insert_new_product.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        console.log("Successfully inserted new product data");
         this.new_product_id = data;
         console.log(data);
         if(this.new_product_id == null){
           this.success = 0; 
         }
         this.insertDetails();
         this.insertImageInfo();
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
     //for(let i = 0; i < this.details.length; i++){
      //   opts["detail"+i] = this.details[i];
      //}

    opts["details"]=this.details;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = opts,     
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/insert_details.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        console.log(data);
        if(data !== "Product details added to database"){
         this.success = 0;
       }
      },
      (error: any) => {
        this.openDialog("Error inserting product details.");
        this.success = 0;
      }
    );
    
  }


  insertImageInfo():void{

    //Define options for post request 
    let opts = {};
    opts["product_id"] = this.new_product_id;
    const filepaths = [];
     for(let i = 0; i < this.product_images.length; i++){

         filepaths.push("/images/"+this.category.category_name.replace(/ /g,'_')+
             "/"+this.product_name.replace(/ /g,'_')+"/"+this.product_images[i].name);
      }

    opts["image_filepaths"]= filepaths;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = opts,     
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/insert_image_info.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        console.log(data);
        if(data ==="Image details added to database"){}
          else{this.success = 0};
      },
      (error: any) => {
        this.openDialog("Error inserting image info to database");
        this.success = 0;
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

  uploadImage(file: File, fileName: string, directory: string):void{

      if(this.product_main_image.size > this.max_post_size){
         this.openDialog("The files selected are too big to upload:\n"+
                           "Combined size of images = "+this.product_main_image.size/1000000+"MB.\n"+
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

      this.http.post(
        /*////////////////*/
        'http://localhost:80/REON/php/upload_image.php',
        ////////////////////////////
        formdata, {headers: headers})
        .subscribe((data: any) => {
            console.log(data);
            if(data === "Success!"){
              console.log("Image "+fileName+" successfully uploaded.");
              } else {
                this.openDialog(data);
              }
            },
          (error: any) => {
            console.log(error);
            this.openDialog('Error uploading image.\n See console for details.');}
        );}
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