import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

	product_name: string;
	short_description: string;
	price: number;
	detail: string="";
	details: string[]=[];

  constructor() { }

  ngOnInit() {
  }

  addDetail(): void{
  	if(this.detail.length > 0){
  		this.details.push(this.detail);
  	}
	}

	trackByFn(index: any, item: any) {
   	return index;
	}

	deleteDetail(i: number):void{
	this.details.splice(i,1);
}

}
