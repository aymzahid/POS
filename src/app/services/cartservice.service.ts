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

  addToCart(product: any) {
    const currentCartItems = this.cartItemsSubject.value;
    currentCartItems.push(product);
    this.cartItemsSubject.next(currentCartItems);
  }
}
