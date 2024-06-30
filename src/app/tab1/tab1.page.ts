import { ServiceService } from './../services/service.service';
import { CartserviceService } from '../services/cartservice.service';
import { Component } from '@angular/core';
import { GlobalVariable } from 'src/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data: any;
  cartItems: any = [];
  selected_products: any = [];
  cat_id: any;
  subcat_id: any;
  filterTerm: any = '';
  loader: boolean = false;

  purchaseCart: any = [];

  constructor(
    private cartService: CartserviceService,
    public service: ServiceService,
    public globals: GlobalVariable,
    private router: Router
  ) {
    this.cartService.purchase_cartItems$.subscribe((items) => {
      this.purchaseCart = items;
    });
  }

  ionViewDidEnter() {
    console.log('Did Enter');
    this.cartService.setPurchaseCheck(false);
    if (this.purchaseCart.length != 0) {
      this.globals.alert('Purchase Cart').then((res) => {
        console.log('then res', res);

        if (res === 'ok') {
          this.cartService.resetCart();
          this.getProductsList();
        } else {
          this.router.navigateByUrl('/tabs/tabs/tab3');
        }
      });
    } else {
      this.getProductsList();
    }
  }

  addToCart(product: any, quantity: any) {
    if (product.quantity_in_stock < 1) {
      this.globals.presentToast(
        'Product Can not add Out Of Stock Product',
        '',
        'danger'
      );
    } else {
      console.log('product', product, 'quantity--->', quantity);

      this.cartService.addToCart(product, quantity);
    }
  }

  getProductsList() {
    this.globals.p_loader();
    this.service.getProductsList().subscribe(
      (res) => {
        // this.loader = false;
        // console.log(res);
        if (res.status) {
          // this.announcementError = false;
          if (res.data.length != 0) {
            this.globals.dismiss();

            let res_products = [];

            this.globals.global_array = res.data;

            this.data = this.globals.global_array;
            console.log('Global Array -->', this.globals.global_array);

            this.cat_id = this.globals.global_array.product_categories[0].id;
            this.subcat_id =
              this.globals.global_array.product_sub_categories[0].id;

            this.globals.presentToast('Result Fetched', '', 'success');

            this.data.products.forEach((element: any) => {
              let parsedImages = JSON.parse(element.picture);
              element.picture = parsedImages;
            });

            // After images url being parsed
            this.globals.product_list = this.data.products;
            console.log('Global Product list', this.globals.product_list);
          } else {
            // this.globals.presentToast('No data found', '', '');
          }
        }
      },
      (err) => {
        // this.loader = false;

        this.globals.dismiss();

        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
  }
  handleChange(event: any) {
    if (event.detail.value === 'logout') {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  cat_Changed(event: any) {
    console.log('main_cat changed', event.detail.value);
    this.cat_id = event.detail.value;
    this.subcat_id = this.subCategories()[0].id;
    this.displayProduct();
  }

  subCat_Changed(event: any) {
    console.log('subCat changed', event.detail.value);
    this.subcat_id = event.detail.value;

    this.displayProduct();
  }
  filterProduct(event: any) {
    console.log('searchbar value', event.detail.value);
  }
  subCategories() {
    let sub_categories: any = [];
    this.data?.product_sub_categories.forEach((element: any) => {
      if (element.category_id === this.cat_id) {
        sub_categories.push(element);
      }
    });

    return sub_categories;
  }

  displayProduct() {
    let filtered_products: any = [];

    this.globals.product_list.forEach((element: any) => {
      if (
        element.category_id === this.cat_id &&
        element.sub_category_id === this.subcat_id
      ) {
        filtered_products.push(element);
      }
    });

    return filtered_products;
  }
}
