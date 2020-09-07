import { Component, OnInit } from '@angular/core';

import { ApiService} from '../../../app/core/api.service';
import { ProductModel } from '../../../app/core/models/product.model'
@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductComponent implements OnInit {

  productList: ProductModel[] = []

  constructor(private product: ApiService) { }

  ngOnInit() {
    this.productList = this.product.getProducts()
  }

}
