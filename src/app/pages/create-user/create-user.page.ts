import { ServiceService } from './../../services/service.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalVariable } from 'src/global';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  // name: any;
  // phone: any;
  user_type: any;

  // formData = {
  //   name: '',
  //   phone: '',
  // };
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private service: ServiceService,
    private globals: GlobalVariable
  ) {
    ngform: NgForm;
    this.user_type = this.navParams.get('modal_data');
  }

  ngOnInit() {}

  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }
  onSubmit(form: NgForm) {
    let data = {};
    console.log('form values', form.value);
    if (this.user_type === 'vendor') {
      data = {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        user_type: this.user_type,
      };
    } else {
      data = {
        name: form.value.name,
        phone: form.value.phone,
        user_type: this.user_type,
      };
    }

    this.service.addUser(data).subscribe(
      (res) => {
        if (res.status) {
          this.globals.presentToast('User Created', '', 'success');
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
          this.close(this.globals.global_array.customers);
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
