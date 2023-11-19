import { TestBed } from '@angular/core/testing';

import { RequestBarcodeApiService } from './request-barcode-api.service';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { environment } from '@env';
import { BarcodeProductsData } from '../../interfaces/barcode-products.interface';
import { of, throwError } from 'rxjs';

describe('RequestBarcodeApiService request HTTP', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: RequestBarcodeApiService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new RequestBarcodeApiService(httpClientSpy);
  });

  it('getProducts() request should return observable BarcodeProductsData', (done: DoneFn) => {
    const expectedBarcodeProductsData: BarcodeProductsData = {
      products: [
        {
          barcode_number: "885926323828",
          barcode_formats: "UPC-A 885926323828, EAN-13 0885926323828",
          mpn: "TIIP7-MARB-WT",
          model: "",
          asin: "B079L4WR4T",
          title: "Apple TIIP7-MARB-WT iPhone 8 & 7 Marble IMD Soft TPU Case, White",
          category: "Electronics > Communications > Telephony > Mobile Phone Accessories > Mobile Phone Cases",
          manufacturer: "Samsung",
          brand: "Apple Inc",
          contributors: [],
          age_group: "",
          ingredients: "",
          nutrition_facts: "",
          energy_efficiency_class: "",
          color: "white",
          gender: "",
          material: "",
          pattern: "",
          format: "",
          multipack: "",
          size: "",
          length: "",
          width: "",
          height: "",
          weight: "5.85lb",
          release_date: "",
          description: "iPhone 8 & 7 Marble IMD Soft TPU Case.",
          features: [],
          images: [
            "https://images.barcodelookup.com/2123/21231886-1.jpg"
          ],
          last_update: "2022-01-05 08:52:02",
          stores: [
            {
              name: "LivingSocial",
              country: "US",
              currency: "USD",
              currency_symbol: "$",
              price: "8.99",
              sale_price: "7.88",
              tax: [],
              link: "https://www.livingsocial.com/deals/gg-cm-soft-protective-cover-with-marble-print-for-iphone-and-samsung-models?deal_option=f31dc838-4857-4d80-91a6-d9c9a7ee05fa&z=",
              item_group_id: "",
              availability: "",
              condition: "",
              shipping: [],
              last_update: "2021-06-22 02:47:25"
            },
            {
              name: "Overstock.com",
              country: "US",
              currency: "USD",
              currency_symbol: "$",
              price: "10.98",
              sale_price: "9.99",
              tax: [],
              link: "https://www.overstock.com/14559720/product.html?TRACK=affcjfeed&CID=207442&fp=F",
              item_group_id: "",
              availability: "",
              condition: "",
              shipping: [],
              last_update: "2021-06-22 04:38:41"
            },
            {
              name: "Groupon",
              country: "US",
              currency: "USD",
              currency_symbol: "$",
              price: "9.99",
              sale_price: "",
              tax: [],
              link: "https://rd.bizrate.com/rd?t=https://www.groupon.com/deals/gg-cm-soft-protective-cover-with-marble-print-for-iphone-and-samsung-models?deal_option=f31dc838-4857-4d80-91a6-d9c9a7ee05fa&tsToken%",
              item_group_id: "",
              availability: "in stock",
              condition: "",
              shipping: [],
              last_update: "2021-06-22 05:28:12"
            },
            {
              name: "UnbeatableSale.com",
              country: "US",
              currency: "USD",
              currency_symbol: "$",
              price: "22.25",
              sale_price: "12.25",
              tax: [],
              link: "http://www.technooutlet.com/drmw8344.html",
              item_group_id: "",
              availability: "in stock",
              condition: "new",
              shipping: [
                {
                  country: "US",
                  region: "",
                  service: "",
                  price: "10.94 USD"
                }
              ],
              last_update: "2022-01-05 08:52:02"
            }
          ],
          reviews: []
        },
      ]
    }

    httpClientSpy.get.and.returnValue(of(expectedBarcodeProductsData));

    service.getProducts().subscribe({
      next: (products) => {
        expect(products).withContext('expected products').toEqual(expectedBarcodeProductsData);
        done()
      },
      error: done.fail,
    })

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return an error when the server returns a 403 Forbidden', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '403 Forbidden',
      status: 403,
      statusText: 'Forbidden',
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getProducts().subscribe({
      next: (products) => done.fail('expected an error, not products'),
      error: (error) => {
        expect(error.message).toContain('403 Forbidden');
        done();
      },
    });
  });

  it('should return an error when the server returns a 429 Too Many Requests', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '429 Too Many Requests',
      status: 429,
      statusText: 'Too Many Requests',
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getProducts().subscribe({
      next: (products) => done.fail('expected an error, not products'),
      error: (error) => {
        expect(error.message).toContain('429 Too Many Requests');
        done();
      },
    });
  });

  it('should return an error when the server returns a 404 Not Found', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 Not Found',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getProducts().subscribe({
      next: (products) => done.fail('expected an error, not products'),
      error: (error) => {
        expect(error.message).toContain('404 Not Found');
        done();
      },
    });
  });
});


describe('RequestBarcodeApiService basic tests', () => {
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

  it('variables correctly created', () => {
    expect(service.BARCODE_API_URL).toEqual(environment.barcodeApiUrl)
    expect(service.CORS_ANYWARE_PROXY).toEqual(environment.corsAnyWhere)
    expect(service.BARCODE_PRODUCTS_API_URL).toEqual(`${service.CORS_ANYWARE_PROXY}${service.BARCODE_API_URL}/products`)
  })
});