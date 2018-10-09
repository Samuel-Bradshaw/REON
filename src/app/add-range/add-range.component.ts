import { Component, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../product';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-range',
  templateUrl: './add-range.component.html',
  styleUrls: ['./add-range.component.css'],

})
export class AddRangeComponent implements AfterViewInit {

	@Output() range_added: EventEmitter<Category>;

	max_post_size: number = 100000000;

	new_category: Category;
  new_cat_id: number;
	category_name: string;
	category_description: string;

 // category_images: any[] = [];
    category_image: any;
	range_page_image = null;
	range_page_image_url: any;


  constructor(private http: HttpClient, public dialog: MatDialog, private elementRef:ElementRef, 
    private adminService: AdminService,  private router: Router
    ) {  
            this.range_added = new EventEmitter(); 
          }

  ngAfterViewInit(){
    if(!this.adminService.isLogged()){
      this.router.navigate(['/admin/login']);
    }
  }
 

    addNewProductRange():void {

    var promises = [];

    let promise1 = this.uploadImage(this.range_page_image, this.range_page_image.name,  this.category_name);
    promises.push(promise1);

    let promise2 = this.uploadImage(this.category_image, this.category_image.name,  this.category_name);
    promises.push(promise2);

    Promise.all(promises)
      .then(values => {

          let pic1 =  "images/"+this.category_name.replace(/ /g,'_')+"/"+this.range_page_image.name;
          let pic2 = "images/"+this.category_name.replace(/ /g,'_')+"/"+this.category_image.name;


          const headers: any = new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            options: any = {
              category_name: this.category_name,
              category_description: this.category_description,
              main_page_picture: pic1,
              product_page_picture: pic2},
            url: any = 
        /////////////////
        'http://localhost:80/REON/php/add_new_range.php';
        /////////////////
          this.http.post(url, JSON.stringify(options), headers).subscribe(
            (data: any) => {
               this.new_cat_id = data;
           //this.uploadImages();
               this.openDialog("New range "+this.category_name+" added to database.");
               location.reload();
            },
            (error: any) => {
              this.openDialog(error);
            }
          );
    });

  }

  uploadImages(){
/*
    for(let i = 0; i < this.category_images.length; i++){
        this.uploadImage(this.category_images[i], this.category_images[i].name, this.category_name);
    }

      //Define options for post request 
    let opts = {};
    opts["category_id"] = this.new_cat_id;
    const filepaths = [];
     for(let i = 0; i < this.category_images.length; i++){

         filepaths.push("images/"+this.category_name.replace(/ /g,'_')+
             "/"+this.category_images[i].name);
      }

    opts["image_filepaths"]= filepaths;

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = opts,     
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/insert_range_image_info.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        this.openDialog("Error inserting image info to database");
      }
    );*/
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

     return new Promise((resolve, reject) => { this.http.post(
        /*////////////////*/
        'http://localhost:80/REON/php/upload_image.php',
        ////////////////////////////
        formdata, {headers: headers})
        .subscribe((data: any) => {
            console.log(data);
            if(data === "Success!"){
              console.log("Image "+fileName+" successfully uploaded.");
              resolve(data);
              } else {
                this.openDialog(data);
                reject(data);
              }
            },
          (error: any) => {
            console.log(error);
            this.openDialog('Error uploading image.\n See console for details.');
            reject('Error uploading image.\n See console for details.');}
       );
       })
   }
  }

   onCategoryImageSelected(event){
      /*for(let i = 0; i < event.target.files.length; i ++){
        this.category_images.push(<File>event.target.files[i]);
      }

    console.log(this.category_images);*/
    this.category_image = <File>event.target.files[0];
    console.log(this.category_image);
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
