export class Product {
  id: number;
  name: string;
  description:string;
  price:number;
  available:string;
  category_id: number;
  leading_photo_filepath: string;
  long_description: string;
  youtube_url: string;
}

export interface Category{
	category_id: number;
	category_name: string;
	category_description: string;
	picture_1_filepath: string;
	tile_picture_position:number;
	picture_2_filepath: string;
	tile_picture2_position: number;
	main_page_picture: string;

}