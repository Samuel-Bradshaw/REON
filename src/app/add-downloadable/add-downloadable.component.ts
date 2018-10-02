import { Component, OnInit } from '@angular/core';
import{Product} from '../product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';
@Component({
  selector: 'app-add-downloadable',
  templateUrl: './add-downloadable.component.html',
  styleUrls: ['./add-downloadable.component.css']
})
export class AddDownloadableComponent implements OnInit {

	products:Product[];
	product: Product;
	name: string;
	files: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog,) { }

  ngOnInit() {
  	this.getProducts();
  }

    getProducts():void{
   this.http.get(
        ////////////////////////////
        'http://localhost:80/REON/php/get_all_products.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.products = data;
        }, (error: any) => { console.log(error);}
        );
        
  }

  onFilesSelected(event):void{
  	   for(let i = 0; i < event.target.files.length; i ++){
        this.files.push(<File>event.target.files[i]);
      }
    console.log("files selected:...");
    console.log(this.files);

  }

  uploadFileInfo(folder: string):void{

  	let filepath = 'support/'+folder.replace(/ /g,'_');

	  	//Define options for post request 
	    let opts = {};
	    opts["folder"] = folder;
	    const filepaths = [];
	     for(let i = 0; i < this.files.length; i++){
	         filepaths.push(
	         	"support/"+folder.replace(/ /g,'_')+"/"+this.files[i].name
	         	);
	      }

	    opts["filepaths"]= filepaths;
	    opts["product_id"] =  this.product.product_id;

	    const headers: any = new HttpHeaders({
	        'Content-Type': 'application/json'
	      }),
	      options: any = opts,     
	      url: any = 
	      /////////////////
	      'http://localhost:80/REON/php/insert_support_docs.php';
	      /////////////////
	    this.http.post(url, JSON.stringify(options), headers).subscribe(
	      (data: any) => {
	        console.log(data);
	        if(data ==="File details added to database"){
	        	this.openDialog("Support docs successfully added!");
	        } else{
	        	this.openDialog("Error adding file data:  See console for details");
	      		console.log(data);
	      		};
	      },
	      (error: any) => {
	        this.openDialog("Error inserting file info to database. See console for details");
	        console.log(error);
	      }
	    );

  }

  addNewFiles():void{

  	let folder;
  	if(this.name){ folder = this.name;}
  	else{ folder = this.product.name; }



  	var promises = [];
  	for(let i = 0; i < this.files.length; i++){
  		let promise = this.uploadFile(this.files[i], this.files[i].name, folder.replace(/ /g,'_'));
  		promises.push(promise);
  	}
  	Promise.all(promises)
  		.then(values => {
  			this.uploadFileInfo(folder)
  		});

  }


   uploadFile(file: File, fileName: string, directory: string){

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
	        'http://localhost:80/REON/php/upload_file.php',
	        ////////////////////////////
	        formdata, {headers: headers})
	        .subscribe((data: any) => {
	            console.log(data);
	            if(data === "Success!"){
	              console.log("File "+fileName+" successfully uploaded.");
	              resolve(data);
	              } else {
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



  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message,
      }
    });

 
  }

}
