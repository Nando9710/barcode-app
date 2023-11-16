import { Component, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/barcode-products.interface';
import { MinPricePipe } from '../../core/pipes/min-price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MinPricePipe, MatButtonModule, MatChipsModule, MatDividerModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  constructor(private activatedRoute: ActivatedRoute) { }

  public productData: WritableSignal<Product | null> = signal(null)
  private getProductData() {
    this.activatedRoute.queryParams.subscribe({
      next: ({ productData }) => {
        if (productData) {
          this.productData.set(JSON.parse(productData))
          console.log(this.productData());
        }
      }
    })
  }

  public goToAmazon(asin: string | undefined) {
    if (asin) window.open(`https://www.amazon.com/s?k=${asin}`, '_blank');
  }
  ngOnInit(): void {
    this.getProductData()
  }
}
