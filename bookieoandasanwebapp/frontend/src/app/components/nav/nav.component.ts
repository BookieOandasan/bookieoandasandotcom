import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface NavigationItem {
  label: string;
  route: string;
}

const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', route: '/' },

];

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    AsyncPipe,
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="d-flex gap-2">
        @for (item of navItems; track item.route) {
          <a
            mat-button
            [routerLink]="item.route"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: item.route === '/' }"
          >{{ item.label }}</a>
        }
      </span>
      <span class="flex-spacer"></span>
      <mat-icon>{{ (themeService.theme$ | async) === 'dark' ? 'dark_mode' : 'light_mode' }}</mat-icon>
      <mat-slide-toggle
        [checked]="(themeService.theme$ | async) === 'dark'"
        (change)="themeService.toggle()"
        aria-label="Toggle dark mode"
        class="ms-2"
      ></mat-slide-toggle>
    </mat-toolbar>
  `,
  styles: [`
    .flex-spacer { flex: 1 1 auto; }
    .active-link { font-weight: 700; opacity: 1; }
    mat-toolbar a { opacity: 0.85; }
  `]
})
export class NavComponent {
  readonly navItems = NAV_ITEMS;
  constructor(readonly themeService: ThemeService) {}
}
