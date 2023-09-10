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
  customer = 'Guest';
  customer_phone: any = '';
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
    item.quantity = item.quantity + 1;
    this.validateStockLimit(item);
  }

  dec_quantity(item: any) {
    if (item.quantity == 1) {
    } else {
      item.quantity = item.quantity - 1;
      this.get_bill();
    }
  }

  validateStockLimit(item: any) {
    if (this.globals.product_list != null || undefined) {
      let product = this.globals.product_list.find(
        (element: any) => element.id == item.product_id
      );

      if (item.quantity > Number(product.quantity_in_stock)) {
        this.globals.presentToast('Stock Limit Exceeded', '', 'danger');
        item.quantity = Number(product.quantity_in_stock);
      } else if (item.quantity == 0 || item.quantity == null) {
        setTimeout(() => {
          item.quantity = 1;
        }, 1000);

        this.globals.presentToast(
          'Quantity Can not be 0 or Null',
          '',
          'danger'
        );
      } else {
      }
    }
    this.get_bill();
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
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

      sub_bill += Number(element.total_price);
    });

    return Number(sub_bill);
  }

  searchUser() {
    this.globals.openModal(this.globals.global_array.customers).then((res) => {
      if (!res) {
        console.log('guest');
      } else {
        console.log(res);
        this.customer = res.name;
        this.customer_phone = res.phone;
      }
    });
  }

  pay() {
    console.log('cart item', this.cartItems);

    const currentDate = new Date().toLocaleString('en-US');

    let sale = {
      items: this.cartItems,
      totalAmount: this.calBill(),
      paymentAmount: this.total_bill,
      customer: {
        name: this.customer,
        phone: this.customer_phone,
      },
      timestamp: currentDate,
      discounts: [{ name: 'Percentage', value: this.discount }],
    };

    console.log('sale payload', sale);
  }
}
