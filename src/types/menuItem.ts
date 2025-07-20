export interface MenuItem {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  is_available: boolean;
  is_new?: boolean;
  is_best_seller?: boolean;
}