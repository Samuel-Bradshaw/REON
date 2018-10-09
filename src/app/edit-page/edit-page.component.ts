import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

	pages: Page[];
	page: Page;
	image: any = null;
  video_url: string;


  constructor(private http: HttpClient, public dialog: MatDialog, private route: Router,private adminService: AdminService) { }

  ngOnInit() {
  	this.getPages();
  }

    ngAfterViewInit(){
    if(!this.adminService.isLogged()){
      this.route.navigate(['/admin/login']);
    }
  }

  getPages(){

  	   this.http.get(
        ////////////////////////////
        'http://localhost:80/REON/php/get_pages.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.pages = data;
        }, (error: any) => { console.log(error);}
        );
  }

  onImageSelected(event){
    this.image = <File>event.target.files[0];
    console.log(this.image);
  }

  removeVideo(){
    this.page.video_url = null;
  }

  removeImg(){
    this.page.image_filepath = null;
  }

  updatePage():void{
    if(this.image !== null){
      let promise = this.uploadImage(this.image, this.image.name, 'pages');
      promise.then(values => {
          this.updateDatabase('images/pages/'+this.image.name);
        });
    }else{
      this.updateDatabase(this.page.image_filepath);
    }
  }

  updateDatabase(ImgFilepath: string):void{

    let video_url;
    if(this.video_url){
      video_url = this.video_url;
    }else{
      video_url = this.page.video_url;
    }


    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        page_id: this.page.page_id,
        copy: this.page.copy,
        video_url: video_url,
        image_filepath: ImgFilepath, 
      },
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/update_page.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        if(data==="Success!"){
         this.openDialog(this.page.page_name+' page updated!');
         this.route.navigate(['/'+this.page.page_name+'/']);
         
      
       }else{
         this.openDialog("Error updating page:" + data);
       }
      },
      (error: any) => {
        this.openDialog("Error updating page. See console for details");
        console.log(error);
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

  
   uploadImage(file: File, fileName: string, directory: string){

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
          ////////////////
          'http://localhost:80/REON/php/upload_image.php',
          ////////////////////////////
          formdata, {headers: headers})
          .subscribe((data: any) => {
              console.log(data);
              if(data === "Success!"){
                console.log("File "+fileName+" successfully uploaded.");
                resolve(data);
                } 
                else if(data === "Upload failed: "+" Error: File "+this.image.name+" already exists."){
                  resolve(data);
                }
                else if(data==="Upload failed:  Error: File already exists."){
                  resolve(data);
                }else {
                  this.openDialog('Error uploading File.\n See console for details.');
                  console.log(data);
                  reject('Error uploading File.\n See console for details.');
                }
              },
            (error: any) => {
              console.log(error);
              this.openDialog('Error uploading Files.\n See console for details.');
              reject("Error uploading Files.\n See console for details.");}
          );
          })
      
  }

}

interface Page{
  page_id: number;
  page_name: string;
  copy: string;
  video_url: string;
  image_filepath: string
}
