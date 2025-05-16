export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any; // optional — covers extras like image, description, etc.
}