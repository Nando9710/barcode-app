import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RequestBarcodeApiService } from './core/services/request-barcode-api/request-barcode-api.service';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' })),
    importProvidersFrom(ToastrModule.forRoot({ positionClass: 'toast-bottom-right' })),
    provideAnimations(),
    RequestBarcodeApiService
  ]
};
