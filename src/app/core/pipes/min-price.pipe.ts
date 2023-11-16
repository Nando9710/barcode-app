import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '../interfaces/barcode-products.interface';

@Pipe({
  name: 'minPrice',
  standalone: true
})
export class MinPricePipe implements PipeTransform {

  transform(stores: Store[] | undefined, priceValue: string): string | null {
    if (!stores) return null

    stores.sort((a, b) => Number(a.price) - Number(b.price));

    const minPrice = stores[0]?.price ? `${stores[0]?.price} ${stores[0]?.currency}` : null;
    const minSalePrice = stores[0]?.sale_price ? `${stores[0]?.sale_price} ${stores[0]?.currency}` : null;

    if (priceValue === 'sale_price') return minSalePrice;
    return minPrice;
  }

}
