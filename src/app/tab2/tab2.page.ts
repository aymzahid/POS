import { CartserviceService } from 'src/app/services/cartservice.service';
import { ServiceService } from './../services/service.service';
import { Component, Pipe } from '@angular/core';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  data: any = [];
  filterTerm: any = '';
  record_type: any = 'Sales';
  purchase_record = false;
  refund_button: boolean = true;

  constructor(
    private globals: GlobalVariable,
    private service: ServiceService,
    private cartService: CartserviceService
  ) {}

  ionViewDidEnter() {
    this.getSales();
  }

  segmentChanged(event: any) {
    this.record_type = event.detail.value;

    if (this.record_type === 'Purchases') {
      this.purchase_record = true;
      this.refund_button = false;
    } else {
      this.purchase_record = false;
      this.refund_button = true;
    }
    this.getSales();
  }
  getSales() {
    let call_API = this.service.getSales();

    if (this.record_type === 'Purchases') {
      call_API = this.service.getPurchases();
    }

    this.globals.loader();
    call_API.subscribe(
      (res) => {
        if (res.status) {
          // this.announcementError = false;
          this.cartService.setPurchaseCheck(this.purchase_record);
          if (res.data.length != 0) {
            this.globals.dismiss();

            this.data = res.data;
            console.log('data', this.data);

            this.globals.presentToast(
              `${this.record_type} Fetched`,
              '',
              'success'
            );
          } else {
            this.globals.presentToast('No data found', '', '');
          }
        }
      },
      (err) => {
        // this.loader = false;

        this.globals.dismiss();

        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
  }

  printInvoice(data: any) {
    console.log('data', data);

    this.globals.invoiceModal(data).then((res) => {
      if (!res) {
      } else {
      }
    });
  }

  refund(data: any) {
    this.cartService.refundCheck = true;
    this.cartService.setRefundData(data);

    this.globals.refundModal(data).then((res) => {
      if (!res) {
        this.cartService.refundCheck = false;
        this.getSales();
      } else {
      }
    });
  }
}
