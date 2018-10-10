import { Pipe, PipeTransform } from '@angular/core';
import { Article } from './news.component';

@Pipe({
  name: 'filterarticle'
})
export class FilterarticlePipe implements PipeTransform {

  transform(items: Article[], searchText: string): Article[] {

    if(!items) return [];

    if(!searchText) return items;

   	let filteredItems: Article[] = [];

	searchText = searchText.toLowerCase();


	for(let i = 0; i < items.length; i++){

		if (items[i].title.toLowerCase().includes(searchText) || 
			items[i].article.toLowerCase().includes(searchText)) {
        filteredItems.push(items[i]);
      }

	}

	return filteredItems;
   }

}