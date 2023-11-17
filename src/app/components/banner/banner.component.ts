import { Component } from '@angular/core';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ThemeButtonComponent, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
