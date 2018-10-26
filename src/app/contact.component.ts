import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig,  MatDialogRef  } from '@angular/material';
import { DialogComponent } from './dialog.component';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	message: string = '';
	email: string; 

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {

    
  }

  send():void{

  	document.getElementById("emailerror").style.display = "none";
  	document.getElementById("msgerror").style.display = "none";

  	if(!this.validateEmail(this.email)){
  		document.getElementById("emailerror").style.display = "block";
  	} else if(this.message.length < 2){
  		document.getElementById("msgerror").style.display = "block";
  	}else{
  		//Send email

  		const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        email: this.email,
        message: this.message,
        },
      url: any = 'http://REONsynth.com/php/email.php';
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
         if(data === "success"){
         	console.log("success!");
         	this.message = null;
         	this.email = null;
          this.openDialog("Thank you for your message! \n\nWe will aim to respond as soon as possible.");
         }else{
         console.log("Error sending message.");
     		}		
      },
      (error: any) => {
        console.log(error);
      }
    );
  	}

  }

  validateEmail(email:string):boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
