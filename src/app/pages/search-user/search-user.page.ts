import { GlobalVariable } from 'src/global';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {
  data: any = [
    {
      id: 1,
      name: 'Samara Breitenberg IV',
      phone: '+17036731379',
      created_at: '2023-09-14T06:28:32.000000Z',
      updated_at: '2023-09-14T06:28:32.000000Z',
    },
    {
      id: 2,
      name: 'Guest',
      phone: null,
      created_at: '2023-09-14T15:35:40.000000Z',
      updated_at: '2023-09-14T15:35:40.000000Z',
    },
    {
      id: 3,
      name: 'Guest',
      phone: '-',
      created_at: '2023-09-14T16:23:38.000000Z',
      updated_at: '2023-09-14T16:23:38.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
    {
      id: 4,
      name: 'zahid khan',
      phone: '03432341100',
      created_at: '2023-09-15T06:48:47.000000Z',
      updated_at: '2023-09-15T06:48:47.000000Z',
    },
  ];
  filterTerm: any = '';

  constructor(
    private modalCtrl: ModalController,
    // public navParams: NavParams,
    private globals: GlobalVariable
  ) {
    // this.data = this.navParams.get('modal_data');
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
      }
    });
  }
}
