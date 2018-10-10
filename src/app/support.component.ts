import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders}  from '@angular/common/http';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  url: string = "http://localhost:80/REON";

	downloads: any[];

  	constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getDownloads();

  }

  getDownloads(){

  	this.http.get(
      	////////////////////////////
        'http://localhost:80/REON/php/get_downloads.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.downloads = data;
        }, (error: any) => { console.log(error);}
        );
  }

}
