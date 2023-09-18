import { ServiceService } from './../services/service.service';
import { Component } from '@angular/core';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  data: any = [];
  filterTerm: any = '';
  constructor(
    private globals: GlobalVariable,
    private service: ServiceService
  ) {}

  ionViewDidEnter() {
    this.getSales();
  }

  getSales() {
    this.globals.loader();
    this.service.getSales().subscribe(
      (res) => {
        // this.loader = false;
        // console.log(res);
        if (res.status) {
          // this.announcementError = false;
          if (res.data.length != 0) {
            setTimeout(() => {
              this.globals.dismiss();
            }, 2000);

            this.data = res.data;
            console.log('data', this.data);

            this.globals.presentToast('Sales Fetched', '', 'success');
          } else {
            this.globals.presentToast('No data found', '', '');
          }
        }
      },
      (err) => {
        // this.loader = false;

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

  printInvoice(data: any) {
    this.globals.invoiceModal(data).then((res) => {
      if (!res) {
      } else {
      }
    });
  }
}
