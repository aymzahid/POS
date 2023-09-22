import { GlobalVariable } from 'src/global';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {
  data: any;
  purchase_quantity: number = 0;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private globals: GlobalVariable,
    private cartService: CartserviceService
  ) {
    this.data = this.navParams.get('modal_data');

    console.log('data', this.data);
  }

  ngOnInit() {}

  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }

  addToCart(product: any, quantity: any) {
    if (this.purchase_quantity < 1 || null) {
      this.globals.presentToast(
        'Purchasing Quanity can not be zero or null',
        '',
        'danger'
      );
    } else {
      console.log('product', product, 'quantity--->', quantity);

      this.cartService.addPurchaseCart(product, quantity);
      this.close();
    }
  }
}
