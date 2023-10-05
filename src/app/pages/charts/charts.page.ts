import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ServiceService } from 'src/app/services/service.service';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: any = ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas: any = ElementRef;
  @ViewChild('lineCanvas') lineCanvas: any = ElementRef;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  time: any;

  topfiveSoldProducts_labels: any = [];
  topfiveSoldProducts_data: any = [];
  topfivePurchasedProducts_labels: any = [];
  topfivePurchasedProducts_data: any = [];

  monthlysaleAmount: any = [];
  monthlysaleMonth: any;
  constructor(
    private service: ServiceService,
    private globals: GlobalVariable
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.globals.loader();
    this.getReports();
  }

  ionViewWillEnter() {

  }

  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.topfiveSoldProducts_labels,
        datasets: [
          {
            label: 'No of  Units Sold',
            data: this.topfiveSoldProducts_data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          // yAxes: [
          //   {
          //     ticks: {
          //       beginAtZero: true,
          //     },
          //   },
          // ],
        },
      },
    });
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.topfivePurchasedProducts_labels,

        datasets: [
          {
            label: '# of Votes',
            data: this.topfivePurchasedProducts_data,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
            ],
          },
        ],
      },
    });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'November',
          'December',
        ],
        datasets: [
          {
            label: this.monthlysaleMonth,
            fill: false,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.monthlysaleAmount,
            spanGaps: false,
          },
        ],
      },
    });
  }

  // API Calls
  getReports() {
    this.service.topFiveSaleProduct().subscribe(
      (res) => {
        // console.log('topFiveSaleProduct', res);
        this.topfiveSoldProducts_labels = res.productNames;
        this.topfiveSoldProducts_data = res.totalQuantitySold;

        console.log(
          'Top Five Sold Products',
          this.topfiveSoldProducts_labels,
          this.topfiveSoldProducts_data
        );

        this.barChartMethod();
      },
      (err) => {
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );

    this.service.fetchMonthlySalesTotal().subscribe(
      (res) => {
        this.monthlysaleMonth = res[0].month_year;
        this.monthlysaleAmount = res[0].total_amount;

        console.log(
          'MontlySalesTotal',
          this.monthlysaleMonth,
          this.monthlysaleAmount
        );

        this.lineChartMethod();
      },
      (err) => {
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
    this.service.topFivePurchaseProduct().subscribe(
      (res) => {
        this.topfivePurchasedProducts_labels = res.productNames;
        this.topfivePurchasedProducts_data = res.totalQuantitySold;

        console.log(
          'Top Five Purchased Products',
          this.topfivePurchasedProducts_labels,
          this.topfivePurchasedProducts_data
        );

        this.doughnutChartMethod();
      },
      (err) => {
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );
    this.service.fetchMonthlyPurchaseTotal().subscribe(
      (res) => {
        console.log('fetchMonthlyPurchaseTotal', res);
      },
      (err) => {
        this.globals.presentToast(
          'Something went wrong, try again later',
          '',
          'danger'
        );
      }
    );

    this.globals.dismiss();
  }


}
