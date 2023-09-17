import { Component, OnInit } from '@angular/core';
// import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  constructor() {}

  ngOnInit() {}

  print() {
    window.print();
    //   let options: PrintOptions = {
    //     name: 'MyDocument',
    //     duplex: true,
    //     orientation: 'landscape',
    //     monochrome: true,
    //   };
    //   this.printer
    //     .print('Hello, this is a test document', options)
    //     .then(() => {
    //       console.log('Print successful');
    //     })
    //     .catch((error) => {
    //       console.error('Print error', error);
    //     });
  }
}
