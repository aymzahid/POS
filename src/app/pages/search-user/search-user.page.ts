import { GlobalVariable } from 'src/global';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {
  title: any;
  data: any = [];

  filterTerm: any = '';

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private globals: GlobalVariable
  ) {
    this.data = this.navParams.get('modal_data');
    this.title = this.navParams.get('title');
  }

  ngOnInit() {}

  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }

  createUser(user_type: any) {
    this.globals.createUser(user_type).then((res) => {
      if (!res) {
        console.log('guest');
      } else {
        console.log(res);
        this.data = res;
      }
    });
  }
}
