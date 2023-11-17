import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.DARK);

  public setTheme(value: Theme) {
    this.theme$.next(value)
    if (value === Theme.LIGHT) {
      document.body.classList.remove(Theme.DARK);
      document.body.classList.add(Theme.LIGHT);
    }
    if (value === Theme.DARK) {
      document.body.classList.remove(Theme.LIGHT);
      document.body.classList.add(Theme.DARK);
    }
  }
}
