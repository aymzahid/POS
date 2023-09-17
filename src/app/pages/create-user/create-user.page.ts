import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private navParams: NavParams
  ) {
    ngform: NgForm;
    this.user_type = this.navParams.get('modal_data');
  }

  ngOnInit() {}

  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }
  onSubmit(form: NgForm) {
    console.log('Create', form.value);
  }
}
