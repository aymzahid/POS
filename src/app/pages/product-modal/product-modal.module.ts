import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModalPageRoutingModule } from './product-modal-routing.module';

import { ProductModalPage } from './product-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductModalPageRoutingModule
  ],
  declarations: [ProductModalPage]
})
export class ProductModalPageModule {}
