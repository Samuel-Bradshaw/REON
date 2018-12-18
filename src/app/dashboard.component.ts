import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { ProductService } from './product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page_components: any;

  selectedProduct: Product;

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.getPageInfo();
  }

  getPageInfo(){

        
     const headers: any = new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        options: any = {
          page_id:  2,
        },
    url : any = 'http://reonsynth.com/php/get_page.php';
    this.http.post(url , JSON.stringify(options), headers).subscribe(
        (data: any) => {
          this.page_components = data;
          this.page_components.copy = this.page_components.copy.replace(/(?:\r\n|\r|\n)/g, '<br>');
          if(this.page_components.video_url !== null){
          		this.page_components.video_url =  "https://www.youtube.com/embed/"+this.page_components.video_url; 
      	  }
       
        },(error: any) => { console.log(error);}
        
    );   
  }


 
}
