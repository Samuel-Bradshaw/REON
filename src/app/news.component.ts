import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

	articles: Article[] = [];
  searchText: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  	this.getArticles();
  }

  getArticles():void{

  	    this.http.get(
      	////////////////////////////
        'http://reonsynth.com/php/get_news.php'
        ///////////////////////////////
      ).subscribe( (data: any) => {
          this.articles = data;
       
        }, (error: any) => { console.log(error);}
        );

  }

  displayArticle(e){
  	let arrow = e.children[1].children[0];
  	if(!e.classList.contains("active-article")){
  		let currentActive = document.querySelector(".active-article");
  		if(currentActive){
  			currentActive.classList.remove("active-article");
  			currentActive.children[1].children[0].innerHTML="&#xFE40;";
  		}
  		arrow.innerHTML= "&#xFE3F;";
  		e.classList.add("active-article");
  	}else{
	
  		e.classList.remove("active-article");
  		arrow.innerHTML="&#xFE40;";
  	}
  
  }

}

export interface Article{
	article_id: number;
	title: string;
	article: string;
	date: Date;
	image_filepath :string;
}
