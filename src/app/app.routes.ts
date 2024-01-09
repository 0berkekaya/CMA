import { Routes } from '@angular/router';
import { ModuleProviderLayout } from './module-provider/base/components/layout.component';

export const routes: Routes = [
  // Modül Sağlayıcısına Gönderim Yapar. Gerekli Componentleri Çağırı.
  {
    path: '',
    component: ModuleProviderLayout,
    loadChildren: () =>
      import('./module-provider/base/module-provider-routing.module').then(
        (m) => m.ModuleProviderRouting
      ),
  },

    // Admin Paneli İçin Gerekli Routing Tanımlaması
    // {
    //   path: 'admin/login',
    //   title: 'Admin Giriş Sayfası',
    //   pathMatch: 'full',
    //   component: AdminLoginComponent,
    // },
    // {
    //   path: 'admin',
    //   component: AdminLayoutComponent,
    //   loadChildren: () =>
    //     import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
    // },
];
