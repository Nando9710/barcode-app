import { TestBed } from '@angular/core/testing';

import { GoogleProductTaxonomyService } from './google-product-taxonomy.service';

describe('GoogleProductTaxonomyService', () => {
  let service: GoogleProductTaxonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleProductTaxonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
