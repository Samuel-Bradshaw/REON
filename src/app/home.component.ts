import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  page_components: any;
  //@ViewChild('homeimage') homeimage: ElementRef;

  ngOnInit() {
  	this.getPageInfo();
  }


    getPageInfo(){

        
     const headers: any = new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        options: any = {
          page_id:  1,
        },
    url : any = 'http://localhost:80/REON/php/get_page.php';
    this.http.post(url , JSON.stringify(options), headers).subscribe(
        (data: any) => {
          this.page_components = data;
          if(this.page_components.video_url !== null){
          		this.page_components.video_url =  "https://www.youtube.com/embed/"+this.page_components.video_url; 
      	  }
          //add image to page
          /*
            if(this.page_components.image_filepath !== null){

                let img = document.createElement("img");
                img.src = "http://localhost/REON/"+this.page_components.image_filepath;

                let container = this.homeimage.nativeElement;
              //  container.appendChild(img);
                img.style.maxWidth = "100%";

                img.addEventListener('load', function(){
                let aspectRatio = img.clientWidth / img.clientHeight;

                 if(aspectRatio > 1.1){
                    container.classList.add("wideimg");
                 }else{
                    container.classList.add("tallimg");
                   }
                });
                */

               
   
       
        },(error: any) => { console.log(error);}
        
    );   
  }
}
