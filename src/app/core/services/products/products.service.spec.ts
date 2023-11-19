import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Product } from '../../interfaces/barcode-products.interface';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setProductsData(data: Product[]) should set products data', () => {
    const data: Product[] = [
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
    ];
    service.setProductsData(data);
    service.products$.subscribe((productsValue) => {
      expect(productsValue).toEqual(data);
    });
  });
});
