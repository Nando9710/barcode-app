import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarcodeProductsData } from '../../interfaces/barcode-products.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RequestBarcodeApiService {
  constructor(private http: HttpClient) { }

  private BARCODE_API_URL: string = environment.barcodeApiUrl;
  private CORS_ANYWARE_PROXY = environment.corsAnyWhere;
  private API_KEY: string = environment.apiKey;

  private BARCODE_PRODUCTS_API_URL: string = `${this.CORS_ANYWARE_PROXY}${this.BARCODE_API_URL}/products`;

  public getProducts(query?: string[]): Observable<BarcodeProductsData> {
    let params = new HttpParams();

    console.log(this.BARCODE_PRODUCTS_API_URL);
    params = params.append('barcode', '3614272049529')
    params = params.append('formatted', 'y')
    params = params.append('key', this.API_KEY)

    return this.http.get<BarcodeProductsData>(this.BARCODE_PRODUCTS_API_URL, { params })
  }
}
