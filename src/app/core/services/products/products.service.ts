import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/barcode-products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products$: BehaviorSubject<Product[] | null> = new BehaviorSubject<Product[] | null>(null);

  public setProductsData(data: Product[] | null) {
    this.products$.next(data);
  }
}
