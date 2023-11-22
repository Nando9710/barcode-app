import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarcodeProductsData } from '../../interfaces/barcode-products.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductParameterData } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestBarcodeApiService {
  constructor(
    private http: HttpClient,
  ) { }

  public BARCODE_API_URL: string = environment.barcodeApiUrl;
  public CORS_ANYWARE_PROXY = environment.corsAnyWhere;
  private API_KEY: string = environment.apiKey;

  public BARCODE_PRODUCTS_API_URL: string = `${this.CORS_ANYWARE_PROXY}${this.BARCODE_API_URL}/products`;

  public productQueryCached!: ProductParameterData[]

  public getProducts(productQuery?: ProductParameterData[], page: number = 1): Observable<BarcodeProductsData> {
    let params = new HttpParams();

    this.productQueryCached = productQuery || [];

    productQuery?.forEach(productData => {
      if (productData.value) params = params.append(productData.code, productData.value);
    })

    params = params.append('page', page);
    params = params.append('formatted', 'y');
    params = params.append('key', this.API_KEY);

    return this.http.get<BarcodeProductsData>(this.BARCODE_PRODUCTS_API_URL, { params })
  }
}
