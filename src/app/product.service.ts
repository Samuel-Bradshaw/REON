import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product, Category } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import{ MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	//  private productsUrl = 'api/products';  // URL to web api



  constructor(private messageService: MessageService,
  	          private http: HttpClient) { }


getProducts (id: number): Product[] {

   const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        category_id: id
      },
  url : any = 'http://reonsynth.com/php/get_products.php';
  this.http.post(url , JSON.stringify(options), headers).subscribe(
      (data: any) => {
        let products: Product[];
        products = data;
        return products;
      },
    catchError(this.handleError<Product>(`getProducts id=${id}`))
  );
  return;
  
   /* return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(products => this.log('fetched products')),
      catchError(this.handleError('getProducts', []))
    );*/
}





getProductRanges():Observable<Category[]>{
   const url = 'http://reonsynth.com/get_product_ranges.php';
   return this.http.get<Category[]>(url)
    .pipe(
      tap(categories => this.log('fetched categories')),
      catchError(this.handleError('getProductRanges', []))
    );



}
/*
getRange(id: number): Category {
    const headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      options: any = {
        category_id: id
      },
  url : any = 'http://localhost:80/REON/php/get_range.php';
  this.http.post(url , JSON.stringify(options), headers).subscribe(
      (data: any) => {
       //let category: Category;
        //
                  
        return data;

      },
    catchError(this.handleError<Category>(`getRange id=${id}`))
  );
  return;
}
*/




private log(message: string) {
  this.messageService.add(`ProductService: ${message}`);
}

 /* Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** PUT: update the hero on the server 
updateProduct (product: Product): Observable<any> {
  return this.http.put(this.productsUrl, product, httpOptions).pipe(
    tap(_ => this.log(`updated product id=${product.id}`)),
    catchError(this.handleError<any>('updateProduct'))
  );
}
*/
}
