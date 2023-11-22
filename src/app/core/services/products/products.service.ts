import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/barcode-products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public page: number = 1;

  public setProductsData(data: Product[]) {
    this.products$.next(data);
  }

  public setPageToFirst() {
    this.page = 1;
  }

  public incProductsPage() {
    this.page += 1
  }
}
