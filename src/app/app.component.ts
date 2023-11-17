import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeButtonComponent } from './components/theme-button/theme-button.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
