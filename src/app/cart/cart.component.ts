import { ServiceService } from './../services/service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';
import { CartserviceService } from '../services/cartservice.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChild('badge') badge: any = ElementRef;
  name_col: string = '4';
  qty_col: string = '5';
  p_unit_col: string = '3';
  total_col: string = '3';

  cartPageCheck = false;
  cartItems: any = [];
  purchaseCart: any = [];
  purchaseCheck: any;
  discount: any = 0;
  total_bill: any = 0;
  user = 'Guest';
  user_phone: any = '-';
  constructor(
    private cartService: CartserviceService,
    private router: Router,
    private globals: GlobalVariable,
    private service: ServiceService,
    private navCtrl: NavController
  ) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      // this.get_bill();
      // this.animateCss();
      console.log('total cart items', this.cartItems);

      this.cartSwitch();
    });

    this.cartService.getPurchaseCheck().subscribe((items) => {
      this.purchaseCheck = items;
      console.log('Purchase Check', this.purchaseCheck);
    });

    this.cartService.purchase_cartItems$.subscribe((items) => {
      this.purchaseCart = items;
      // this.get_bill();
      // this.animateCss();
      // console.log('total Purchase cart items', this.cartItems);
      this.cartSwitch();
    });
  }

  ionViewWillEnter() {
    this.cartSwitch();
    this.cartPageCheck = true;

    this.pageLayout();
  }
  ionViewWillLeave() {
    this.cartPageCheck = false;
    this.pageLayout();
  }

  pageLayout() {
    if (this.cartPageCheck) {
      this.name_col = '3';
      this.qty_col = '4';
      this.p_unit_col = '2';
      this.total_col = '2';
    }
  }

  cartSwitch() {
    if (this.purchaseCheck) {
      this.cartItems = this.purchaseCart;

      console.log('assign purchase cart', this.cartItems);
    } else {
      console.log('it is POS cart');
    }
    this.get_bill();
    this.animateCss();
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

        setTimeout(() => {
          item.quantity = Number(product.quantity_in_stock);
        }, 50);
      } else if (item.quantity == 0 || item.quantity == null) {
        setTimeout(() => {
          item.quantity = 1;
        }, 500);

        this.globals.presentToast(
          'Quantity Can not be 0 or Null',
          '',
          'danger'
        );
      } else {
      }
    }
    setTimeout(() => {
      this.get_bill();
    }, 100);
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }
  goBack() {
    this.navCtrl.back();
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

    if (!this.purchaseCheck) {
      this.cartItems.forEach((element: any) => {
        element.total_price = Number(
          element.s_price * element.quantity
        ).toFixed(2);

        sub_bill += Number(element.total_price);
      });
    } else {
      this.cartItems.forEach((element: any) => {
        element.total_price = Number(
          element.p_price * element.quantity
        ).toFixed(2);

        sub_bill += Number(element.total_price);
      });
    }

    return Number(sub_bill);
  }

  searchUser() {
    let title;
    let user_type;

    if (!this.purchaseCheck) {
      title = 'Customers';
      user_type = this.globals.global_array.customers;
    } else {
      title = 'Vendors';
      user_type = this.globals.global_array.vendors;
    }

    this.globals.searchUserModal(user_type, title).then((res) => {
      if (!res) {
        console.log('guest');
      } else {
        console.log(res);
        this.user = res.name;
        this.user_phone = res.phone;
      }
    });
  }

  pay() {
    if (this.cartItems.length != 0) {
      console.log('cart item', this.cartItems);

      const currentDate = new Date().toLocaleString('en-US');

      let data = {
        items: this.cartItems,
        total_amount: this.calBill().toFixed(2),
        payment_amount: Number(this.total_bill).toFixed(2),
        customer: {
          name: this.user,
          phone: this.user_phone,
        },
        sale_id: this.globals.global_array.saleId,
        date: currentDate,
        discounts: [
          { discount_type: 'Percentage', discount_value: this.discount },
        ],
      };

      localStorage.setItem('bill_data', JSON.stringify(data));

      console.log('sale payload', data);
      this.service.addSale(data).subscribe(
        (res) => {
          if (localStorage.getItem('bill_data') != null) {
            this.printInvoice(
              JSON.parse(localStorage.getItem('bill_data') || '{}')
            );
          }

          this.refreshAPI();
          this.resetCart();
        },
        (err) => {
          // setTimeout(() => {
          //   this.globals.dismiss();
          // }, 2000);

          this.globals.presentToast(
            'Something went wrong, try again later',
            '',
            'danger'
          );
        }
      );
    } else {
      this.globals.presentToast('Cart is Empty', '', 'warning');
    }
  }

  printInvoice(data: any) {
    this.globals.invoiceModal(data).then((res) => {
      if (!res) {
      } else {
      }
    });
  }

  resetCart() {
    this.cartItems = [];
    this.discount = 0;
    this.total_bill = 0;
    this.user = 'Guest';
    this.user_phone = '-';
    this.cartService.resetCart();
  }

  animateCss() {
    setTimeout(() => {
      this.badge.nativeElement.classList.remove('animated', 'bounce');

      setTimeout(() => {
        this.badge.nativeElement.classList.add('animated', 'bounce');
      }, 100);
    }, 100);
  }

  refreshAPI() {
    this.service.getProductsList().subscribe(
      (res: any) => {
        if (res.status) {
          // setTimeout(() => {
          //   this.globals.dismiss();
          // }, 2000);

          this.globals.global_array = res.data;

          console.log('API refreshed', this.globals.global_array);
          this.globals.product_list = this.globals.global_array.products;
        }
      },
      (err: any) => {
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
  }

  ///////// Purchase Functionality
  Purchasepay() {
    console.log('purchase');

    if (this.cartItems.length != 0) {
      if (this.user === 'Guest' || this.user === '') {
        this.globals.presentToast('Add Vendor Details', '', 'warning');
      } else {
        console.log('cart item', this.cartItems);

        const currentDate = new Date().toLocaleString('en-US');

        let data = {
          items: this.cartItems,
          total_amount: this.calBill().toFixed(2),
          payment_amount: Number(this.total_bill).toFixed(2),
          vendor: {
            name: this.user,
            phone: this.user_phone,
          },
          purchase_id: this.globals.global_array.purchase_id,
          date: currentDate,
          discounts: [
            { discount_type: 'Percentage', discount_value: this.discount },
          ],
        };

        localStorage.setItem('bill_data', JSON.stringify(data));

        console.log('purchase payload', data);
        this.service.addPurchase(data).subscribe(
          (res) => {
            if (localStorage.getItem('bill_data') != null) {
              this.printInvoice(
                JSON.parse(localStorage.getItem('bill_data') || '{}')
              );
            }

            this.refreshAPI();
            this.resetCart();
          },
          (err) => {
            // setTimeout(() => {
            //   this.globals.dismiss();
            // }, 2000);
            this.resetCart();
            this.globals.presentToast(
              'Something went wrong, try again later',
              '',
              'danger'
            );
          }
        );
      }
    } else {
      this.globals.presentToast('Purchase Cart is Empty', '', 'warning');
    }
  }
}
