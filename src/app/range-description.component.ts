import { Component, OnInit, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import{ Category } from './product';

@Component({
  selector: 'app-range-description',
  templateUrl: './range-description.component.html',
  styleUrls: ['./range-description.component.css']
})
export class RangeDescriptionComponent implements OnInit, AfterViewInit {
	category: Category;
  @Output() loadedEvent = new EventEmitter<string>();

  constructor(private http: HttpClient,  private route: ActivatedRoute,) { 
    route.params.subscribe(val => {
      this.getRange();
    });}

  ngOnInit() {
  }

  ngAfterViewInit(){
    setTimeout(() => {
     this.loadedEvent.emit('loaded');
   }, 600);
  }


  getRange(): void {
        const headers: any = new HttpHeaders({
            'Content-Type': 'application/json'
          }),
          options: any = {
              category_id:  +this.route.snapshot.url[1].path,
          },
      url : any = 'http://reonsynth.com/php/get_range.php';
      this.http.post(url , JSON.stringify(options), headers).subscribe(
          (data: any) => {
            this.category = data;
            this.category.category_description = this.category.category_description.replace(/(?:\r\n|\r|\n)/g, '<br>');
            this.category.category_description = this.category.category_description.replace(/&#10;/g, '<br>');
          },

          //TODO:
          //Handle error!
      
      );
    }


}
