import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from 'src/global';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  httpOptions: { headers: HttpHeaders };
  constructor(public globals: GlobalVariable, public http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
  }

  // getProjectList(data: any) {
  //   console.log('data get project list', data);
  //   let path;
  //   if (data.business_type === 'developers') {
  //     path = this.globals.baseURL + 'projectsList';
  //   } else {
  //     path = this.globals.baseURL + 'res_projectsList';
  //   }

  //   return this.http.post<any>(path, data);
  // }

  // getLatestResidentialProjects() {
  //   let path;

  //   let business_open = localStorage.getItem('business_open');
  //   if (business_open === 'developers') {
  //     path = this.globals.baseURL + 'latestResidentialProjectList';
  //   } else {
  //     path = this.globals.baseURL + 'res_latestResidentialProjectList';
  //   }

  //   return this.http.get<any>(path);
  // }
  // getLatestCommercialProjects(): Observable<any> {
  //   let path;
  //   let business_open = localStorage.getItem('business_open');
  //   if (business_open === 'developers') {
  //     path = this.globals.baseURL + 'latestCommercialProjectList';
  //   } else {
  //     path = this.globals.baseURL + 'res_latestCommercialProjectList';
  //   }

  //   return this.http.get<any>(path);
  // }

  getProductsList() {
    let path = this.globals.baseURL + 'products-list';

    return this.http.get<any>(path);
  }

  getSales() {
    let path = this.globals.baseURL + 'get-sales';

    return this.http.get<any>(path);
  }

  getPurchases() {
    let path = this.globals.baseURL + 'get-purchases';

    return this.http.get<any>(path);
  }
  //POST

  addSale(data: any) {
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    let path = this.globals.baseURL + 'add-sales';
    // console.log('data', JSON.stringify(data));

    return this.http.post<any>(path, data);
  }
  addPurchase(data: any) {
    let path = this.globals.baseURL + 'add-purchases';

    return this.http.post<any>(path, data);
  }
  addProduct(data: any) {
    let path = this.globals.baseURL + 'add-product';
    return this.http.post<any>(path, data);
  }

  addCategory(data: any) {
    let path = this.globals.baseURL + 'add-category';
    return this.http.post<any>(path, data);
  }
  
  addSubCategory(data: any) {
    let path = this.globals.baseURL + 'add-sub-category';
    return this.http.post<any>(path, data);
  }

  addUser(data: any) {
    let path = this.globals.baseURL + 'add-user';
    return this.http.post<any>(path, data);
  }

  refundSale(data: any) {
    let path = this.globals.baseURL + 'add-return-sales';
    return this.http.post<any>(path, data);
  }

  submitOrder(data: any) {
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    let path = this.globals.baseURL + 'createOrder';

    return this.http.post<any>(path, data);
  }

  contactUs(data: any) {
    let path = this.globals.baseURL + 'contactUs';

    return this.http.post<any>(path, data);
  }
}
