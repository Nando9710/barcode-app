import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarcodeProductsData, Product } from '../../interfaces/barcode-products.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductParameterData } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestBarcodeApiService {
  constructor(private http: HttpClient) { }

  private BARCODE_API_URL: string = environment.barcodeApiUrl;
  private CORS_ANYWARE_PROXY = environment.corsAnyWhere;
  private API_KEY: string = environment.apiKey;

  private BARCODE_PRODUCTS_API_URL: string = `${this.CORS_ANYWARE_PROXY}${this.BARCODE_API_URL}/products`;

  public products$: BehaviorSubject<Product[] | null> = new BehaviorSubject<Product[] | null>(null);

  public setProductsData(data: Product[] | null) {
    this.products$.next(data);
  }

  public getProducts(productQuery?: ProductParameterData[]): Observable<BarcodeProductsData> {
    let params = new HttpParams();


    productQuery?.forEach(productData => {
      if (productData.value) params = params.append(productData.code, productData.value)
    })

    params = params.append('formatted', 'y')
    params = params.append('key', this.API_KEY)

    return this.http.get<BarcodeProductsData>(this.BARCODE_PRODUCTS_API_URL, { params })
  }
}
