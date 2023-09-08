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
  discount: any;
  total_bill: any = 0;
  constructor(private cartService: CartserviceService, private router: Router) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calBill();
    });
  }

  ngOnInit() {}
  removeItem(productindex: any) {
    this.cartItems.splice(productindex, 1);

    console.log('after cart item', this.cartItems);

    this.get_bill();
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  pay() {
    console.log('cart item', this.cartItems);
    // window.print()
  }

  get_bill() {
    let total_discount: number = 0;
    if (this.discount != 0) {
      total_discount = (this.discount / 100) * this.calBill();
      if (isFinite(total_discount)) {
        total_discount = total_discount;
      } else {
        total_discount = 0;
      }
      console.log(
        'total discount',
        total_discount,
        'total bill is -->',
        this.calBill()
      );

      this.total_bill = this.calBill() - total_discount;
      this.total_bill = Number(this.total_bill).toFixed(2);
    } else {
      this.total_bill = this.calBill();
      this.total_bill = Number(this.total_bill).toFixed(2);
    }
  }

  calBill() {
    let sub_bill: number = 0;

    console.log('total cart items', this.cartItems);

    this.cartItems.forEach((element: any) => {
      sub_bill += Number(element.s_price);
    });

    return Number(sub_bill);
  }
}
