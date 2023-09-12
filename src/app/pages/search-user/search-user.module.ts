import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchUserPageRoutingModule } from './search-user-routing.module';

import { SearchUserPage } from './search-user.page';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchUserPageRoutingModule,
    SharedModuleModule,
  ],
  declarations: [SearchUserPage],
})
export class SearchUserPageModule {}
