import { TestBed } from '@angular/core/testing';

import { RequestBarcodeApiService } from './request-barcode-api.service';

describe('RequestBarcodeApiService', () => {
  let service: RequestBarcodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestBarcodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
