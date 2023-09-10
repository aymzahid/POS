import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchUserPageRoutingModule } from './search-user-routing.module';

import { SearchUserPage } from './search-user.page';
import { CustomFilterPipe } from 'src/app/custom-filter-pipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchUserPageRoutingModule,
  ],
  declarations: [SearchUserPage, CustomFilterPipe],
})
export class SearchUserPageModule {}
