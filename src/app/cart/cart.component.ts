import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';
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
  constructor(
    private cartService: CartserviceService,
    private router: Router,
    private globals: GlobalVariable
  ) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.get_bill();
    });
  }

  ngOnInit() {}
  removeItem(productindex: any) {
    this.cartItems.splice(productindex, 1);

    console.log('after cart item', this.cartItems);

    this.get_bill();
  }

  inc_quantity(item: any) {
    // console.log('inc', item);

    if (this.globals.product_list != null || undefined) {
      let product = this.globals.product_list.find(
        (element: any) => element.id == item.product_id
      );

      if (item.quantity < Number(product.quantity_in_stock)) {
        item.quantity = item.quantity + 1;
      } else {
        this.globals.presentToast('Stock Limit Exceeded', '', 'danger');
      }
    }
  }

  dec_quantity(item: any) {
    // console.log('dec', item);

    if (item.quantity == 1) {
      this.globals.presentToast('Quantity Can not be 0', '', 'danger');
    } else {
      item.quantity = item.quantity - 1;
    }
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
      element.total_price = Number(element.s_price * element.quantity).toFixed(
        2
      );

      sub_bill += Number(element.total_price * element.quantity);
    });

    return Number(sub_bill);
  }

  // sale = {
  //   saleId: '12345',
  //   items: [
  //     { name: 'Product A', quantity: 2, price: 10.99 },
  //     { name: 'Product B', quantity: 1, price: 7.99 },
  //   ],
  //   totalAmount: 29.97,
  //   paymentMethod: 'Credit Card',
  //   paymentAmount: 30.0,
  //   changeDue: 0.03,
  //   customer: {
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //   },
  //   employeeId: 'EMP001',
  //   timestamp: '2023-09-09 14:30:00',
  //   receiptNumber: 'R123456',
  //   discounts: [{ name: 'Coupon 10OFF', amount: 3.0 }],
  //   taxes: [{ name: 'Sales Tax', rate: 0.07, amount: 2.1 }],
  // };
}
