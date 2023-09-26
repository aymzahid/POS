import { GlobalVariable } from 'src/global';
import { ServiceService } from './../../services/service.service';

import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  categoryOptions = {
    header: 'Select Category ',
    translucent: true,
    cssClass: 'ion-select-class',
  };

  data: any = [];
  cat_value: any;
  cat_type: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private globals: GlobalVariable,
    private service: ServiceService
  ) {
    this.cat_type = this.navParams.get('cat_type');
    this.data = this.navParams.get('modal_data');
  }

  ionViewWillEnter() {}

  ngOnInit() {}
  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }

  selectCategory(ev?: any) {
    this.cat_value = ev.target.value;
    console.log('Product Cat value:', this.cat_value);
  }

  onSubmit(form: NgForm) {
    this.globals.loader();

    let data = {};
    let Call_API;
    console.log('form values', form.value);

    if (this.cat_type !== 'Category') {
      data = {
        category: this.cat_value,
        name: form.value.p_name,
      };

      Call_API = this.service.addSubCategory(data);
    } else {
      data = {
        name: form.value.p_name,
        description: form.value.description,
      };

      Call_API = this.service.addCategory(data);
    }

    console.log('Submiting data', data);

    Call_API.subscribe(
      (res) => {
        if (res.status) {
          this.globals.dismiss();
          this.close();
          this.globals.presentToast(
            `${this.cat_type} Added Successfully`,
            '',
            'success'
          );
          this.refreshAPI();
        } else {
          this.globals.presentToast(res.data, '', 'warning');
        }
      },
      (err) => {
        setTimeout(() => {
          this.globals.dismiss();
        }, 2000);
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
  }

  refreshAPI() {
    this.service.getProductsList().subscribe(
      (res: any) => {
        if (res.status) {
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
}
