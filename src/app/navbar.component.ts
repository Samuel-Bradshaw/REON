import { Component, OnInit } from '@angular/core';
import { Category } from './product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.getCategories();
  }

  toggleMenu():void{
  	let x = document.getElementById("topnavbar");
  	 if (x.className === "nav-bar") {
        x.className += " responsive";
    } else {
        x.className = "nav-bar";
    }

  }

/*
  getCategories(): void {
    this.http.get(
        ////////////////////////////
        'http://localhost:80/REON/php/get_product_ranges.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.categories = data;
        }, (error: any) => { console.log(error);}
        );
  }
*/
}
