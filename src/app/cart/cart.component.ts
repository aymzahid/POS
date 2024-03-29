import { ServiceService } from './../services/service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';
import { CartserviceService } from '../services/cartservice.service';
import { NavController, ModalController } from '@ionic/angular';

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
  saleCart: any = [];
  purchaseCart: any = [];
  displayCart: any = [];
  purchaseCheck: boolean = false;
  discount: any = 0;
  total_bill: any = 0;
  user = 'Guest';
  user_phone: any = '-';
  constructor(
    public cartService: CartserviceService,
    private router: Router,
    private globals: GlobalVariable,
    private service: ServiceService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
    this.cartService.getPurchaseCheck().subscribe((items) => {
      this.purchaseCheck = items;
    });

    this.cartService.sale_cartItems$.subscribe((items) => {
      this.saleCart = items;
      this.cartSwitch();
    });

    this.cartService.purchase_cartItems$.subscribe((items) => {
      this.purchaseCart = items;
      this.cartSwitch();
    });
  }

  ionViewWillEnter() {
    this.cartPageCheck = true;
    this.pageLayout();

    if (this.cartService.refundCheck) {
      this.getRefundCart();
    }
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
      this.displayCart = this.purchaseCart;

      console.log('PurchaseCart', this.displayCart);
    } else {
      this.displayCart = this.saleCart;
      console.log('POS cart');
    }

    this.get_bill();
    this.animateCss();
  }

  ngOnInit() {}
  removeItem(productindex: any) {
    this.displayCart.splice(productindex, 1);

    console.log('after cart item', this.displayCart);

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
    if (!this.purchaseCheck) {
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
    } else {
      if (item.quantity == 0 || item.quantity == null) {
        setTimeout(() => {
          item.quantity = 1;
        }, 500);

        this.globals.presentToast(
          'Quantity Can not be 0 or Null',
          '',
          'danger'
        );
      }
    }

    setTimeout(() => {
      this.get_bill();
    }, 100);
  }

  goToCart() {
    if (this.cartService.refundCheck) {
      this.close();
    } else {
      this.router.navigateByUrl('/cart');
    }
  }
  goBack() {
    if (this.cartService.refundCheck) {
      this.close();
    } else {
      this.navCtrl.back();
    }
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
      this.displayCart.forEach((element: any) => {
        element.total_price = Number(
          element.s_price * element.quantity
        ).toFixed(2);

        sub_bill += Number(element.total_price);
      });
    } else {
      this.displayCart.forEach((element: any) => {
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
    this.globals.loader();
    if (this.displayCart.length != 0) {
      console.log('cart item', this.displayCart);

      const currentDate = new Date().toLocaleString('en-US');

      let data = {
        items: this.displayCart,
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
          setTimeout(() => {
            this.globals.dismiss();
          }, 1500);
          if (localStorage.getItem('bill_data') != null) {
            this.printInvoice(
              JSON.parse(localStorage.getItem('bill_data') || '{}')
            );
          }

          this.refreshAPI();
          this.resetCart();
        },
        (err) => {
          setTimeout(() => {
            this.globals.dismiss();
          }, 1500);

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
    this.displayCart = [];
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

    if (this.displayCart.length != 0) {
      if (this.user === 'Guest' || this.user === '') {
        this.globals.presentToast('Add Vendor Details', '', 'warning');
      } else {
        this.globals.loader();
        console.log('cart item', this.displayCart);

        const currentDate = new Date().toLocaleString('en-US');

        let data = {
          items: this.displayCart,
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
            setTimeout(() => {
              this.globals.dismiss();
            }, 1500);
            if (localStorage.getItem('bill_data') != null) {
              this.printInvoice(
                JSON.parse(localStorage.getItem('bill_data') || '{}')
              );
            }

            this.refreshAPI();
            this.resetCart();
          },
          (err) => {
            setTimeout(() => {
              this.globals.dismiss();
            }, 1500);

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

  //Refund

  getRefundCart() {
    let data = this.cartService.getRefundData();
    console.log('data', data);

    this.displayCart = data.items;
    this.discount = data.discounts[0].discount_value;
    this.user = data.customer.name;
    this.user_phone = data.customer.phone;

    this.get_bill();

    this.refreshAPI();
  }

  refund() {
    this.globals.loader();
    let return_id = this.globals.global_array.return_id;
    console.log('return id', this.globals.global_array.return_id);
    let data = this.cartService.getRefundData();
    data.return_id = return_id;
    console.log('after return id', data);
    this.service.refundSale(data).subscribe(
      (res) => {
        setTimeout(() => {
          this.globals.dismiss();
        }, 1500);
        this.refreshAPI();
        this.resetCart();
        this.close();
        this.globals.presentToast('Refunded Successfully', '', 'success');
      },
      (err) => {
        setTimeout(() => {
          this.globals.dismiss();
        }, 1500);

        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
