import { Component, WritableSignal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../core/services/theme/theme.service';
import { Theme } from '../../core/enums/theme.enum';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss'
})
export class ThemeButtonComponent {
  constructor(private themeService: ThemeService) { }

  public theme: WritableSignal<Theme> = signal(Theme.DARK);
  public Theme: typeof Theme = Theme;

  public setTheme(value: Theme) {
    this.themeService.setTheme(value)
  }

  public themeSubscribe() {
    this.themeService.theme$.subscribe({
      next: (value) => {
        this.theme.set(value);
      }
    })
  }

  ngOnInit(): void {
    this.themeSubscribe()
  }
}
