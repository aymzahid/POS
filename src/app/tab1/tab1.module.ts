import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CartComponent } from '../cart/cart.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedModuleModule,
  ],
  declarations: [Tab1Page, CartComponent],
})
export class Tab1PageModule {}
