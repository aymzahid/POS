import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModalPage } from './product-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductModalPageRoutingModule {}
