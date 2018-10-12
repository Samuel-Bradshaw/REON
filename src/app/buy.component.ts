import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

	dealers: Dealer[];

  constructor( public sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit() {
  	this.getDealers();
  }

  getDealers(){
  	this.http.get(
        ////////////////////////////
        'http://reonsynth.com/php/get_dealers.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.dealers = data;
        }, (error: any) => { console.log(error);}
        );    
  }

}

interface Dealer{
	id: number;
	name: string;
	link: string;
}