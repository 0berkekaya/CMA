import { Component } from '@angular/core';
import { ModuleProviderHeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, ModuleProviderHeaderComponent],
  template: `
    <div class="container-fluid">
      <div class="row">
        <module-provider-header></module-provider-header>
      </div>
      <div class="row">
        <div class="col-md">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ModuleProviderLayout {}
