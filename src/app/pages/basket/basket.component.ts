import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ProductModel } from 'app/core/models/product.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketItems = [
    // {id: 1, productId: 1, desc:'Tis is Product 1', productName: 'Product 1', qty: 2, price: 100},
    // {id: 2, productId: 2, desc:'Tis is Product 2 ', productName: 'Product 2', qty: 2, price: 100}
  ];
  basketTotal=0;
  
  constructor(private msg: ApiService) { }

  ngOnInit() {
    this.msg.getMsg().subscribe((product: ProductModel) => {
     this.addProductToBasket(product)
    })
  }

  addProductToBasket(product : ProductModel){
    console.log(product)
    this.basketItems.push({
      productId: product.id,
      productName: product.name,
      qty:1,
      price: product.price
    })
    console.log(this.basketItems)
    this.basketTotal=0
    this.basketItems.forEach(item =>{
      this.basketTotal= (item.qty * item.price)
    })
  }
}
