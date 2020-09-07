import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {

  @Input() basketItem: any

  constructor() { }

  ngOnInit() {
  }

}
