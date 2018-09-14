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
	category: string;
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
    let pic1 = "/images/"+this.category_name.replace(' ','_')+"/"+this.range_link_image.name;
    let pic2 =  "/images/"+this.category_name.replace(' ','_')+"/"+this.range_page_image.name;

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
         this.category = this.category_name;
         this.openDialog("New range added to database.");
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
              this.openDialog("Images successfully uploaded.");
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

    //product upload

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


    productImagesUpload():void{
      this.uploadImage(this.product_main_image,this.product_main_image.name, this.category);
      for(let i = 0; i < this.product_images.length; i++){
        this.uploadImage(this.product_images[i], this.product_images[i].name, this.category);
      }
    }

  addNewProduct():void{

  }  

  uploadImage(file: File, fileName: string, directory: string):void{

      if(this.product_main_image.size > this.max_post_size){
         this.openDialog("The files selected are too big to upload:\n"+
                           "Combined size of images = "+this.product_main_image.size/1000000+"MB.\n"+
                              "Maximum combined size of images = "+this.max_post_size/1000000+"MB.");
       } else {

      //send main image
      const formdata = new FormData();
      formdata.append('dir', directory); //will be used to create a new directory for range images on server
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
            if(data === "Sucess!"){
              this.openDialog("Image "+fileName+" successfully uploaded.");
              }
            },
          (error: any) => {
            console.log(error);
            this.openDialog('Error');}
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
