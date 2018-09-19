import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogComponent } from './dialog.component';
import { MatDialog } from '@angular/material';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username:string;
	password: string;

  constructor(	
  	public http: HttpClient,
  	public dialog: MatDialog,
  	private adminService: AdminService,
  	private router: Router,
  	) { }

  ngOnInit() {
  }

  login():void{
  	const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = { username: this.username, 
      				   password: this.password },
      /////////////////////////////////////////////
      url: any = 'http://localhost:80/REON/php/admin_login.php';
	//////////////////////////////////////
    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
      	//If login successful
        this.adminService.setUser(this.username);
        this.openDialog('Logging in...');
        this.router.navigateByUrl('/admin');
      },
      (error: any) => {
        // If the supplied username and password do not match, notify the user.
        this.openDialog('Error logging in!');
      }
    );

  }

    openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message: message,}
    });

	}
}
