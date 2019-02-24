import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HttpClient} from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

	country:string;
	language:string;

  constructor(/*private http: HttpClient*/) {
  	this.language = window.navigator.language;
}

ngAfterViewInit(){




                        
  setTimeout(function(){
    $("#google_translate_element").css("display", "inline-block");


    $("#google_translate_element img").eq(0).css("background-image", "");
    $("#google_translate_element img").eq(0).attr("src", "./assets/images/google.jpg");
    $("#urlLeftIcon").val('');

    $("#google_translate_element img").eq(0).css("mix-blend-mode", "multiply");
    $("#google_translate_element img").eq(0).css("height", "15px");
    $("#google_translate_element img").eq(0).css("width", "15px");


    $("#google_translate_element span").css("border", "none");
    $("#google_translate_element div").eq(1).css("border", "none");
    $("#borderColor").val('');
/*
  var borderColor = "none";
    $("#google_translate_element span").css("border-color", borderColor);
    $("#google_translate_element div").eq(1).css("border-color", borderColor);
    $("#borderColor").val('');
*/
  var borderRadius = "3px";
    $("#google_translate_element span").css("border-radius", borderRadius);
    $("#google_translate_element div").eq(1).css("border-radius", borderRadius);

  var backgroundColor = "rgba(200,200,200,0.9)";
 
    $("#google_translate_element div").eq(1).css("background-color", backgroundColor);
    $("#backgroundColor").val('');
  
  var textColor = "white";
    $("#google_translate_element a").css("color", textColor);
    $("#textColor").val('');

 

    $("#google_translate_element a").css("text-shadow", "1px 1px 1px #000000");

    $("#google_translate_element a").css("font-family", "Questrial");
  
  var textSize = "12px";
  
    $("#google_translate_element a").css("font-size", textSize);
    $("#textSize").val('');
  
} , 1000) ;          

}
/*
  ngOnInit() {
  	//this.getLocation();
  }
 */
/*
  getLocation(){
  	this.http.get(
        ////////////////////////////
        'http://ip-api.com/json/'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.country = data.country;
          console.log(this.country);
        }, (error: any) => { console.log(error);}
        );    
  }
*/
/*
stylemenu():void{
  setTimeout(function(){
    console.log($("iframe table"));
   // $("iframe").css("width", "100%");
    //$("iframe").css("height", "");
    $("iframe .goog-te-menu2-item").css("background-color", "black");
  } , 1000) ;   
}*/


}
