import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from '../dialog.component';
@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.css']
})
export class AddDealerComponent implements OnInit {

	name: string;
	link: string;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
  }

  addDealer(){

  	  const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        name: this.name,
        link: this.link,
        },
      url: any = 
      /////////////////
      'http://localhost:80/REON/php/add_dealer.php';
      /////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
         if(data === "Success!"){
         	this.openDialog("Dealer info added!");
         	this.name = null;
         	this.link = null;
         }else{
         this.openDialog("Error adding dealer to database: "+ data );
     		}		
      },
      (error: any) => {
        this.openDialog("Error adding dealer to database - see console for details.");
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

}
