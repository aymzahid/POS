import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {
  data: any;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.data = this.navParams.get('modal_data');

    console.log('data', this.data);
  }

  ngOnInit() {}

  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }
}
