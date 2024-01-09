
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcenteHomeComponent } from './components/base/home/home.component';

const routes: Routes = [
    {
        path:'',
        component:AcenteHomeComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AcenteRouting {}