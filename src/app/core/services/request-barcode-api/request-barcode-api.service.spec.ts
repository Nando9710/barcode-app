import { TestBed } from '@angular/core/testing';

import { RequestBarcodeApiService } from './request-barcode-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RequestBarcodeApiService', () => {
  let service: RequestBarcodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RequestBarcodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
