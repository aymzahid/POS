import { GlobalVariable } from './../../global';
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

  private purchaseCheckSubject = new BehaviorSubject<boolean>(false);
  purchaseCheck$ = this.purchaseCheckSubject;

  constructor(private globals: GlobalVariable) {}

  addToCart(product: any, quantity: any) {
    let duplicate_product: boolean = false;

    let item = {
      product_id: product.id,
      name: product.name,
      s_price: product.s_price,
      quantity: quantity,
      total_price: product.s_price,
    };

    const currentCartItems = this.cartItemsSubject.value;
    if (currentCartItems.length != 0) {
      for (let item of currentCartItems) {
        if (item.product_id == product.id) {
          duplicate_product = true;
          if (item.quantity < Number(product.quantity_in_stock)) {
            item.quantity = item.quantity + 1;
          } else {
            this.globals.presentToast('Stock Limit Reached', '', 'danger');
          }
          break;
        }
      }

      if (!duplicate_product) {
        currentCartItems.push(item);
      }
    } else {
      currentCartItems.push(item);
    }

    this.cartItemsSubject.next(currentCartItems);
  }

  resetCart() {
    const currentCartItems = this.cartItemsSubject.value;
    this.cartItemsSubject.value.length = 0;
    this.cartItemsSubject.next(currentCartItems);
    console.log('reseting cart ', this.cartItems$);
  }

  setPurchaseCheck(value: boolean) {
    const currentValue = this.purchaseCheckSubject.value;
    this.purchaseCheckSubject.next(value);
  }

  getPurchaseCheck() {
    return this.purchaseCheckSubject.asObservable();
  }
}
