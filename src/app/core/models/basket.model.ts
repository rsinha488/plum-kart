// export class CartModel {
//     constructor(
//       public productTitle: string,
//       public productId: string,
//       public productDesc: string,
//       public _id?: string, // _id is present if editing or returning from DB
//     ) { }
//   }
import { ProductModel } from './product.model';

export class BasketModel {
  id: number;
  productId: number;
  productName: string;
  qty: number;
  price: number;

  constructor(id: number, product: ProductModel, qty = 1) {
    this.id = id;
    this.productId = product.id;
    this.productName = product.name;
    this.price = product.price;
    this.qty = qty;
  }
}
