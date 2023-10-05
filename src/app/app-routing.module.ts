import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'cart',
    component: CartComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'search-user',
    loadChildren: () =>
      import('./pages/search-user/search-user.module').then(
        (m) => m.SearchUserPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },

  {
    path: 'invoice',
    loadChildren: () =>
      import('./pages/invoice/invoice.module').then((m) => m.InvoicePageModule),
  },
  {
    path: 'create-user',
    loadChildren: () =>
      import('./pages/create-user/create-user.module').then(
        (m) => m.CreateUserPageModule
      ),
  },
  {
    path: 'product-modal',
    loadChildren: () =>
      import('./pages/product-modal/product-modal.module').then(
        (m) => m.ProductModalPageModule
      ),
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('./pages/add-product/add-product.module').then(
        (m) => m.AddProductPageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'add-category',
    loadChildren: () =>
      import('./pages/add-category/add-category.module').then(
        (m) => m.AddCategoryPageModule
      ),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./pages/charts/charts.module').then((m) => m.ChartsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
