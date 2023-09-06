import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from '../services/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  constructor(private cartService: CartserviceService, private router: Router) {
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

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  pay() {
    console.log('cart item', this.cartItems);
  }
}
