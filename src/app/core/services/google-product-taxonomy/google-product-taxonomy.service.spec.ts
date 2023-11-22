import { TestBed } from '@angular/core/testing';

import { GoogleProductTaxonomyService } from './google-product-taxonomy.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('GoogleProductTaxonomyService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: GoogleProductTaxonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GoogleProductTaxonomyService(httpClientSpy);
    // service = TestBed.inject(GoogleProductTaxonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getGoogleProductTaxonomyData() should return an observable string[]', (done: DoneFn) => {
    const expectedReturnedData: string[] = [
      "Furniture > Baby & Toddler Furniture > Baby & Toddler Furniture Sets",
      "Furniture > Baby & Toddler Furniture > Bassinet & Cradle Accessories"
    ];

    httpClientSpy.get.and.returnValue(of(expectedReturnedData));

    service.getGoogleProductTaxonomyData().subscribe({
      next: (values) => {
        expect(values).withContext('expected values').toEqual(expectedReturnedData);
        done()
      }
    })

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  })

  it('setProductsData(data: Product[]) should set products data', () => {
    const data: string[] = [
      "Furniture > Baby & Toddler Furniture > Baby & Toddler Furniture Sets",
      "Furniture > Baby & Toddler Furniture > Bassinet & Cradle Accessories"
    ];
    service.setProductTaxonomyData(data);
    service.productTaxonomyData$.subscribe((productsValue) => {
      expect(productsValue).toEqual(data);
    });
  });
});
