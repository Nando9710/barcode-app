import { Routes } from '@angular/router';
import { RequestBarcodeApiService } from './core/services/request-barcode-api/request-barcode-api.service';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
    providers: [RequestBarcodeApiService]
  },
  {
    path: 'product-details',
    loadComponent: () => import('./pages/product-details/product-details.component').then(c => c.ProductDetailsComponent),
    providers: [RequestBarcodeApiService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  },

];
