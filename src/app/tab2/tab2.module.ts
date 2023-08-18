import { Tab3Page } from './../tab3/tab3.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab3PageModule } from '../tab3/tab3.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

    Tab2PageRoutingModule,
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}
