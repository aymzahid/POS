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
  name: any;
  phone: any;
  user_type: any;

  formData = {
    name: '',
    phone: '',
  };
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
    console.log('Create', form.value);
    if (this.user_type === 'Vendor') {
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

    this.service.addSale(data).subscribe(
      (res) => {
        this.close();
        this.globals.presentToast('User Created', '', 'success');
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
}
