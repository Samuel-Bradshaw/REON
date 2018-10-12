import { Component, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogComponent } from '../dialog.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements AfterViewInit{

  title:string;
  article: string;
  /*article_image = null;
  article_image_url: any;
  */
  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router, private adminService: AdminService) { }

  ngAfterViewInit(){
    if(!this.adminService.isLogged()){
      this.router.navigate(['/admin/login']);
    }
  }

/*
  onImageSelected(event):void{
  	this.article_image = <File>event.target.files[0];
    console.log(this.article_image);

  }*/

  uploadArticle():void{

  	/*if(this.article_image!=null){
     this.uploadImage(this.article_image,this.article_image.name, "Articles");
 	   }*/
     this.insertNewArticle();

  }

  insertNewArticle():void{

  	/*let pic = null;
  	if(this.article_image != null){
  		pic = "Articles/"+this.article_image.name;
  	}*/

    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        title: this.title,
        article: this.article,
       // image_filepath: pic,
        
      },
      url: any = 
      /////////////////
      'http://reonsynth.com/php/insert_new_article.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
      	console.log("response:"+ data);
      	if(data === "Success!"){
        this.openDialog("Successfully Added new Article!");
        location.reload();
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

   openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message,
      }
    });

}
}