import { CartserviceService } from '../services/cartservice.service';
import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  productArray: any = [
    { name: 'abc', price: '40', image_path: 'assets/images/1.jpg' },
    { name: 'abc', price: '50', image_path: 'assets/images/3.jpg' },
    { name: 'abc', price: '123', image_path: 'assets/images/2.jpg' },
    { name: 'abc', price: '123', image_path: 'assets/images/3.jpg' },
    { name: 'abc', price: '123', image_path: 'assets/images/1.jpg' },
    { name: 'abc', price: '123', image_path: 'assets/images/2.jpg' },
    { name: 'abc', price: '123', image_path: 'assets/images/3.jpg' },
    { name: 'abc', price: '123', image_path: 'assets/images/2.jpg' },
  ];

  constructor(private cartService: CartserviceService) {}
  ionViewWillEnter() {}

  addToCart(product: any) {
    console.log('product',product);

    this.cartService.addToCart(product);
  }
}
