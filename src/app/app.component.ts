import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HubService } from './services/hub/hub.service';
import { CryptoService } from './services/crypto/crypto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [HubService, CryptoService],
  template: `<router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {
  title = 'CMA';
}
