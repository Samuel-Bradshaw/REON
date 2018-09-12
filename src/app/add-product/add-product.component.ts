import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

	categories: Category[];
	category: string;

	category_name: string;
	category_description: string;

	category_tile_pic: File = null;
	category_page_pic: File = null;

  selectedFile = null;


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
    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        category_name: this.category_name,
        category_description: this.category_description,

        picture_1_filepath: "",
        picture_2_filepath: "",
        
      },
      url: any = 
      /////////////////
      'localhost:80/REON/php/add_new_range.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        //this.addAuction(data);
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
      /*////////////////*/
      'http://localhost:80/REON/php/upload_image.php',
      ////////////////////////////
      formdata, {headers: headers})
      .subscribe(res => {
        console.log(res)},

        (error: any) => { console.log(error);}
      );}


}
