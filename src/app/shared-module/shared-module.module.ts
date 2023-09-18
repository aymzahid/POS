
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFilterPipe } from '../custom-filter-pipe.pipe';
import { CartComponent } from '../cart/cart.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomFilterPipe, CartComponent],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [CustomFilterPipe, CartComponent],
})
export class SharedModuleModule {}
