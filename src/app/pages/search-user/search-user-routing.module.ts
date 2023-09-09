import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchUserPage } from './search-user.page';

const routes: Routes = [
  {
    path: '',
    component: SearchUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchUserPageRoutingModule {}
