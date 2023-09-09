import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: any, quantity: any) {
    let cart_array: any = [];

    let item = {
      product_id: product.id,
      name: product.name,
      s_price: product.s_price,
      quantity: quantity,
      total_price: product.s_price,
    };
    const currentCartItems = this.cartItemsSubject.value;
    currentCartItems.push(item);
    this.cartItemsSubject.next(currentCartItems);
  }
}
