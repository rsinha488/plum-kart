import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../../../core/models/product.model';
import {ApiService } from '../../../core/api.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: ProductModel
  constructor(private msg: ApiService) { }

  ngOnInit() {
  }
  
  handleAddToBasket(){
    this.msg.sendMsg(this.productItem)
  }

}
