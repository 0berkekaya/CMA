import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleProviderHomeComponent } from './components/home/home.component';
import { AcenteContent } from '../acente/components/base/content.component';

const routes: Routes = [
  // Burada gelen isteklere göre ilgili modüller çağırılıp ekranda gösterilmektedir.
  // Bütün modüller aynı header'da gösterilecektir.

  // Module provider için anasayfa olarak belirlendi.
  {
    path: '',
    component: ModuleProviderHomeComponent,
  },
  {
    path: 'acente',
    component: AcenteContent,
    loadChildren: () =>
      import('../acente/acente-routing.module').then((m) => m.AcenteRouting),
  },
  //Route_Definition_Key
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleProviderRouting {}
