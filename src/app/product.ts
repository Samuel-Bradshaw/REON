export class Product {
  id: number;
  name: string;
}

export interface Category{
	category_id: number;
	category_name: string;
	category_description: string;
	picture_1_filepath: string;
	tile_picture_position:number;
	picture_2_filepath: string;

}