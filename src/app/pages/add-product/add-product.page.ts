import { ServiceService } from './../../services/service.service';
import { GlobalVariable } from 'src/global';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';

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
  sub_categories_list: any = [];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private globals: GlobalVariable,
    private service: ServiceService
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
    this.sub_categories_list = [];
    let cat_value = ev.target.value;
    console.log('Product Cat value:', cat_value);

    console.log(this.data);
    this.data.product_sub_categories.forEach((element: any) => {
      if (Number(element.category_id) == cat_value) {
        this.sub_categories_list.push(element);
      }
    });
  }
  selectSubCategory(ev?: any) {
    console.log('Sub Cat value:', JSON.stringify(ev.target.value));
  }
  onSubmit(form: NgForm) {
    let data = {};
    console.log('form values', form.value);
    // if (this.user_type === 'vendor') {

    data = {
      name: form.value.p_name,
      subcategory_id: form.value.sub_cat_id,
      manufacturer: form.value.manufacturer,
      p_price: form.value.p_price,
      s_price: form.value.s_price,
      quantity_in_stock: form.value.quantity,
      unit_of_measurement: form.value.unit_of_measurement,
      description: form.value.description,
    };

    console.log('data', data);

    // } else {
    //   data = {
    //     name: form.value.name,
    //     phone: form.value.phone,
    //     user_type: this.user_type,
    //   };
    // }
    this.service.addProduct(data).subscribe(
      (res) => {
        if (res.status) {
          this.close();
          this.globals.presentToast(
            'Product Added Successfully',
            '',
            'success'
          );
          this.refreshAPI();
        } else {
          this.globals.presentToast(res.data, '', 'warning');
        }
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

          // if (this.user_title === 'Customers') {
          //   this.close(this.globals.global_array.customers);
          // } else {
          //   this.close(this.globals.global_array.vendors);
          // }
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
