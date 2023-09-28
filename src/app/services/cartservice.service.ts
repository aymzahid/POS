import { Router } from '@angular/router';
import { GlobalVariable } from './../../global';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  refundData: any;
  refundCheck: boolean = false;

  private saleCartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  sale_cartItems$ = this.saleCartSubject.asObservable();

  private purchaseCheckSubject = new BehaviorSubject<boolean>(false);
  purchaseCheck$ = this.purchaseCheckSubject;

  private purchaseCartSubject = new BehaviorSubject<any>([]);
  purchase_cartItems$ = this.purchaseCartSubject.asObservable();

  // private RefundCheckSubject = new BehaviorSubject<boolean>(false);
  // refundCheck$ = this.RefundCheckSubject;

  constructor(private globals: GlobalVariable, private router: Router) {}

  addToCart(product: any, quantity: any) {
    let duplicate_product: boolean = false;

    let item = {
      product_id: product.id,
      name: product.name,
      s_price: product.s_price,
      quantity: quantity,
      unit: product.unit_of_measurement,
      total_price: product.s_price,
    };

    const currentCartItems = this.saleCartSubject.value;
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

    this.saleCartSubject.next(currentCartItems);
  }

  addPurchaseCart(product: any, quantity: any) {
    let duplicate_product: boolean = false;

    let item = {
      product_id: product.id,
      name: product.name,
      p_price: product.p_price,
      s_price: product.s_price,
      unit: product.unit_of_measurement,
      quantity: quantity,
      total_price: product.s_price,
    };

    const currentCartItems = this.purchaseCartSubject.value;
    if (currentCartItems.length != 0) {
      for (let item of currentCartItems) {
        if (item.product_id == product.id) {
          duplicate_product = true;

          item.quantity = item.quantity + quantity;

          break;
        }
      }

      if (!duplicate_product) {
        currentCartItems.push(item);
      }
    } else {
      currentCartItems.push(item);
    }

    this.saleCartSubject.next(currentCartItems);
  }

  resetCart() {
    const currentCartItems = this.saleCartSubject.value;
    this.saleCartSubject.value.length = 0;
    this.saleCartSubject.next(currentCartItems);

    console.log(
      'reseting cart',
      this.purchase_cartItems$,
      this.sale_cartItems$
    );
  }

  setPurchaseCheck(value: boolean) {
    this.purchaseCheckSubject.next(value);
  }

  getPurchaseCheck() {
    return this.purchaseCheckSubject.asObservable();
  }

  // setRefundCheck(value: boolean) {
  //   this.purchaseCheckSubject.next(value);
  // }

  // getRefundCheck() {
  //   return this.purchaseCheckSubject.asObservable();
  // }

  setRefundData(data: any) {
    this.refundData = data;
  }

  getRefundData() {
    return this.refundData;
  }
}
