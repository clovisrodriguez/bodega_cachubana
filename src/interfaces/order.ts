import Product from './product';

export default interface Order {
  _id: string;
  user: User;
  region_code: string;
  routeId: string;
  slot: string;
  products: Array<Product>;
  products_quantity?: number;
  state?: number;
}

interface User {
  name: string;
}
