import { CartserviceService } from 'src/app/services/cartservice.service';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
// import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  data: any = [];
  modalCheck = true;
  purchaseCheck: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private navParams: NavParams,
    private cartService: CartserviceService
  ) {
    this.cartService.getPurchaseCheck().subscribe((items) => {
      this.purchaseCheck = items;
      console.log('Purchase Check Invoice', this.purchaseCheck);
    });

    this.data = this.navParams.get('modal_data');
    // this.data = JSON.parse(localStorage.getItem('bill_data') || '{}');

    console.log('Invoice', this.data);
  }

  ngOnInit() {}

  close(item?: any) {
    this.modalCtrl.dismiss(item);
  }
  print() {
    window.print();

    this.close();

    //
    //
    //lengthprocess but works
    // console.log(this.router.navigateByUrl('/invoice'));
    // this.router.navigateByUrl('/invoice').then((res) => {
    // if (res) {
    // this.close();
    // setTimeout(() => {
    // window.print();
    // this.router.navigateByUrl('/tabs/tabs/tab1');
    // }, 1000);
    // }
    // });
  }

  printContent() {
    // Apply the print-specific CSS
    const printStyles = document.createElement('link');
    printStyles.setAttribute('rel', 'stylesheet');
    printStyles.setAttribute('type', 'text/css');
    printStyles.setAttribute('href', 'path-to-your-print-stylesheet.css');
    printStyles.setAttribute('media', 'print');
    document.head.appendChild(printStyles);

    // Trigger the print function
    window.print();

    // Remove the print-specific CSS after printing
    document.head.removeChild(printStyles);
  }
}
