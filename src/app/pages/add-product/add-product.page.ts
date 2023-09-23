import { GlobalVariable } from 'src/global';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  categoryOptions = {
    header: 'Select Category ',
    translucent: true,
    cssClass: 'ion-select-class',
  };

  data: any = [];
  foods = [
    {
      id: 1,
      name: 'Apples',
      type: 'fruit',
    },
    {
      id: 2,
      name: 'Carrots',
      type: 'vegetable',
    },
    {
      id: 3,
      name: 'Cupcakes',
      type: 'dessert',
    },
  ];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private globals: GlobalVariable
  ) {
    this.data = this.navParams.get('modal_data');

    console.log('data ', this.data);
  }

  ionViewWillEnter() {
    console.log(this.globals.global_array);
  }

  ngOnInit() {}
  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }

  selectCategory(ev?: any) {
    console.log('Proeduct Cat value:', JSON.stringify(ev.target.value));
  }
  selectSubCategory(ev?: any) {
    console.log('Sub Cat value:', JSON.stringify(ev.target.value));
  }
}
