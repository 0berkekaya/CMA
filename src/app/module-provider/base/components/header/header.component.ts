import { Component, OnInit } from '@angular/core';
import {
  IsActiveMatchOptions,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'module-provider-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="">Modül Provider Header</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              class="nav-item"
              routerLinkActive="router-link-active"
              [routerLinkActiveOptions]="{ exact: true }"
              [routerLink]="['/']"
            >
              Ana Sayfa
            </li>
            <li
              class="nav-item"
              routerLinkActive="router-link-active"
              [routerLinkActiveOptions]="{ exact: true }"
              [routerLink]="['/acente']"
            >
              Acente
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './header.component.scss',
})
export class ModuleProviderHeaderComponent {}
