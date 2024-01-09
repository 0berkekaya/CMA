import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AcenteLeftBarComponent } from './left-bar/left-bar.component';

@Component({
  // selector: 'acente-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AcenteLeftBarComponent],
  template: ` <div class="row border">
    <div class="col-md-3">
      <acente-leftBar-component></acente-leftBar-component>
    </div>
    <div class="col-md-9"><router-outlet></router-outlet></div>
  </div>`,
  styles: '',
})
export class AcenteContent {}
