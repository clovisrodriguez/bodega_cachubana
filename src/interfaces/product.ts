export default interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  state?: string;
}
