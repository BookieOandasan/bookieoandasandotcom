import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme$ = new BehaviorSubject<Theme>('light');
  readonly theme$ = this._theme$.asObservable();

  load(): void {
    const saved = sessionStorage.getItem(STORAGE_KEY) as Theme | null;
    this._theme$.next(saved === 'dark' ? 'dark' : 'light');
  }

  toggle(): void {
    const next: Theme = this._theme$.value === 'light' ? 'dark' : 'light';
    sessionStorage.setItem(STORAGE_KEY, next);
    this._theme$.next(next);
  }
}
