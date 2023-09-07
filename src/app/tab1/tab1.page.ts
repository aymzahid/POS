import { ServiceService } from './../services/service.service';
import { CartserviceService } from '../services/cartservice.service';
import { Component } from '@angular/core';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data: any;
  productArray: any = [];
  cat_id: any;
  subcat_id: any;
  filterTerm: any = '';
  loader: boolean = false;

  constructor(
    private cartService: CartserviceService,
    public service: ServiceService,
    public globals: GlobalVariable
  ) {
    this.getProductsList();
  }
  ionViewWillEnter() {}

  addToCart(product: any) {
    console.log('product', product);

    this.cartService.addToCart(product);
  }

  getProductsList() {
    this.globals.loader();
    this.service.getProductsList().subscribe(
      (res) => {
        // this.loader = false;
        console.log(res);
        if (res.status) {
          // this.announcementError = false;
          if (res.data.length != 0) {
            setTimeout(() => {
              this.globals.dismiss();
            }, 2000);

            let res_products = [];

            this.data = res.data;
            console.log('res_data', this.data);
            this.cat_id = this.data.product_categories[0].id;
            this.subcat_id = this.data.product_sub_categories[0].id;

            this.globals.presentToast('Result Fetched', '', 'success');

            res_products = res.data.products;

            res_products.forEach((element: any) => {
              let parsedImages = JSON.parse(element.picture);
              element.picture = parsedImages;
            });

            this.productArray = res_products;
            console.log('productArray array', this.productArray);
          } else {
            // this.globals.presentToast('No data found', '', '');
          }
        }
      },
      (err) => {
        // this.loader = false;

        setTimeout(() => {
          this.globals.dismiss();
        }, 2000);
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );

        // this.announcementError = true;
      }
    );
  }

  cat_Changed(event: any) {
    console.log('main_cat changed', event.detail.value);
    this.cat_id = event.detail.value;
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

    this.productArray.forEach((element: any) => {
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
