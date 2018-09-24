import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  max_post_size: number = 100000000;
  title:string;
  article: string;
  article_image = null;
  article_image_url: any;

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }

  onImageSelected(event):void{
  	this.article_image = <File>event.target.files[0];
    console.log(this.article_image);

  }

  uploadArticle():void{

  	if(this.article_image!=null){
     this.uploadImage(this.article_image,this.article_image.name, "Articles");
 	}
     this.insertNewArticle();

  }

  insertNewArticle():void{

  	let pic = null;
  	if(this.article_image != null){
  		pic = "Articles/"+this.article_image.name;
  	}

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        title: this.title,
        article: this.article,
        image_filepath: pic,
        
      },
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/insert_new_article.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
      	console.log("response:"+ data);
      	if(data === "Success!"){
        this.openDialog("Successfully Added Article");
   		}else{
   		this.openDialog("Error adding article: "+data);
   		}
      },
      (error: any) => {
      	console.log(error);
        this.openDialog("Error Inserting Article: See Console for details");
      }
    );




  }

   uploadImage(file: File, fileName: string, directory: string):void{

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
