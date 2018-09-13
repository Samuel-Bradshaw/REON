import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit  {

	categories: Category[];
  new_category: string;
	category: string;
  new_cat_id: number;

	category_name: string;
	category_description: string;

  selectedFile = null;

  range_link_image = null;
  range_link_image_url: any;
  range_page_image = null;
  range_page_image_url: any;


	product_name: string;
	short_description: string;
	price: number;
	detail: string="";
	details: string[]=[];
  long_description: string;
	availability: string;

  constructor(private http: HttpClient) { }

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
         this.new_category = this.category_name;
         this.category = this.new_category;
      },
      (error: any) => {
        // If there is an error, notify the user.
       // this.openDialog(
        //  'Something went wrong when adding the item, please try again!',
         // '',
         // false
        //);
      }
    );

  }
/*
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    const formdata = new FormData();
    formdata.append('fileToUpload', this.selectedFile, this.selectedFile.name);

    const headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.http.post(
      ////////////////
      'http://localhost:80/REON/php/upload_image.php',
      ////////////////////////////
      formdata, {headers: headers})
      .subscribe(res => {
        console.log(res)},

        (error: any) => { console.log(error);}
      );}
*/
    //Uploads range pics to server
    categoryImagesUpload(){
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
              this.addNewProductRange();
              }
            },
          (error: any) => { console.log(error);}
      );
      }

    onRangeLinkImageSelected(event){
      this.range_link_image = <File>event.target.files[0];
      console.log(this.range_link_image);

      //Display pictures on pages before uploading 
      if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      target:EventTarget;
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
      target:EventTarget;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
        this.range_page_image_url = imgsrc.target.result;
      }
    }
  }


}
