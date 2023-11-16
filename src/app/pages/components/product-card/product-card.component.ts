import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Product } from '../../../core/interfaces/barcode-products.interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MinPricePipe } from '../../../core/pipes/min-price.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MinPricePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  public productData: WritableSignal<Product | null> = signal(null)
  @Input({ required: true }) set product(data: Product) {
    if (data) this.productData.set(data)
  }

  public goToAmazon(asin: string | undefined) {
    if (asin) window.open(`https://www.amazon.com/s?k=${asin}`, '_blank');
  }
}
