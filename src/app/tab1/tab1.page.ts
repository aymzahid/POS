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
  loader: boolean = false;
  productArray: any = [];

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
    // this.globals.loader();
    this.service.getProductsList().subscribe(
      (res) => {
        // this.globals.dismiss();

        this.loader = false;
        console.log(res);
        if (res.status) {
          // this.announcementError = false;
          if (res.data.length != 0) {
            // this.globals.presentToast('Result Fetched', '', 'success');

            this.productArray = res.data.products;

            this.productArray.forEach((element: any) => {
              let parsedImages = JSON.parse(element.picture);
              element.picture = parsedImages;
            });
            console.log('productArray array', this.productArray);
          } else {
            // this.globals.presentToast('No data found', '', '');
          }
        }
      },
      (err) => {
        this.loader = false;
        // this.globals.dismiss();
        // this.globals.presentToast(
        //   'Something went wrong, try again later',
        //   '',
        //   'danger'
        // );

        // this.announcementError = true;
      }
    );
  }
}
