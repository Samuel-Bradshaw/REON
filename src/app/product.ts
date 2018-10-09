export class Product {
  product_id: number;
  name: string;
  description:string;
  price:number;
  available:string;
  category_id: number;
  category_name: string;
  leading_photo_filepath: string;
  long_description: string;
  youtube_url: string;
}

export interface Category{
	category_id: number;
	category_name: string;
	category_description: string;
	main_page_picture: string;
  product_page_picture: string;
}