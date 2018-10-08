import { Pipe, PipeTransform } from '@angular/core';
import {Product} from './product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Product[], searchText: string): Product[] {

    if(!items) return [];

    if(!searchText) return items;

   	let filteredItems: Product[] = [];

	searchText = searchText.toLowerCase();


	for(let i = 0; i < items.length; i++){

		if (items[i].name.toLowerCase().includes(searchText) || 
			items[i].description.toLowerCase().includes(searchText) || 
			items[i].category_name.toLowerCase().includes(searchText) ||
			items[i].long_description.toLowerCase().includes(searchText)) {
        filteredItems.push(items[i]);
      }

	}

	return filteredItems;
   }

}