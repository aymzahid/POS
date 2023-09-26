import { GlobalVariable } from 'src/global';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private globals: GlobalVariable) {}

  ngOnInit() {}

  addCategoryModal(cat_type: any) {
    this.globals
      .addNewCategory(this.globals.global_array, cat_type)
      .then((res) => {
        console.log('Add new product modal', res);
      });
  }
}
