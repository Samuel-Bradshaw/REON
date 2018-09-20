import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../product';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';


@Component({
  selector: 'app-add-range',
  templateUrl: './add-range.component.html',
  styleUrls: ['./add-range.component.css'],

})
export class AddRangeComponent implements OnInit {

	@Output() range_added: EventEmitter<Category>;

	max_post_size: number = 100000000;

	new_category: Category;
  	new_cat_id: number;
	category_name: string;
	category_description: string;

	range_link_image = null;
	range_link_image_url: any;
	range_link_position: number = 50;

	range_page_image = null;
	range_page_image_url: any;
	opaque_height:number = 33;

  constructor(private http: HttpClient, public dialog: MatDialog, private elementRef:ElementRef) {  
            this.range_added = new EventEmitter(); 
          }

  ngOnInit() {
  }

  mousemove(e):void {
        let height = e.target.clientHeight;
        let mouseY = e.offsetY;
        this.range_link_position = (100*mouseY)/height;
        this.range_link_position = parseFloat(this.range_link_position.toFixed(2));
        this.opaque_height = this.range_link_position - 34/2;   
    }

    addNewProductRange():void {
    let pic1 = "images/"+this.category_name.replace(/ /g,'_')+"/"+this.range_link_image.name;
    let pic2 =  "images/"+this.category_name.replace(/ /g,'_')+"/"+this.range_page_image.name;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        category_name: this.category_name,
        category_description: this.category_description,
        picture_1_filepath: pic1,
        picture_2_filepath: pic2,
        tile_picture_position: this.range_link_position},
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
                              picture_2_filepath: pic2,
                              tile_picture_position: this.range_link_position};
         
         //Pass to parent component
         this.range_added.emit(this.new_category);

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


    openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message,
      }
    });

 
  }


}
