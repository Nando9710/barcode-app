import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Product } from '../../../core/interfaces/barcode-products.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private router: Router) { }

  public productsData: WritableSignal<Product[] | null> = signal(null)

  @Input() set products(productsData: Product[] | null) {
    if (productsData) this.productsData.set(productsData)
  };

  public goToProductDetails(product: Product) {
    const productData = JSON.stringify(product);
    this.router.navigate(['/product-details'], {
      queryParams: { productData }
    })
  }
}
