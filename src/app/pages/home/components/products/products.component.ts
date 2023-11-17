import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Product } from '../../../../core/interfaces/barcode-products.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    ProductCardComponent,
    NgTemplateOutlet
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private router: Router) { }

  public productsData: WritableSignal<Product[] | null> = signal(null)
  public loadingProducts: WritableSignal<boolean> = signal(false)

  @Input() set products(productsData: Product[] | null) {
    if (productsData) this.productsData.set(productsData)
  };

  @Input() set loading(value: boolean) {
    this.loadingProducts.set(value);
  };

  public goToProductDetails(product: Product) {
    const productData = JSON.stringify(product);
    this.router.navigate(['/product-details'], {
      queryParams: { productData }
    })
  }

}
