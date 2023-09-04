import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../services/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  constructor(private cartService: CartserviceService) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnInit() {}
  removeItem(productindex: any) {
    console.log('product', productindex);
    console.log('cart item', this.cartItems);

    this.cartItems.splice(productindex, 1);

    console.log('after cart item', this.cartItems);
  }
}
