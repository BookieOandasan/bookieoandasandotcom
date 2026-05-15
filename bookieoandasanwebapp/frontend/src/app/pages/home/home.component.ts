import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `<main class="container-fluid p-4"></main>`,
  styles: [`
    main {
      min-height: 80vh;
    }
  `]
})
export class HomeComponent {}
