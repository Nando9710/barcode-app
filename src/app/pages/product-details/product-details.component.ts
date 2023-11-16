import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/barcode-products.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  constructor(private activatedRoute: ActivatedRoute) { }

  public productData: WritableSignal<Product | null> = signal(null)
  private getProductData() {
    this.activatedRoute.queryParams.subscribe({
      next: (productData) => {
        console.log(productData);
      }
    })
  }
  ngOnInit(): void {
    this.getProductData()
    console.log('holaaaaaa');
  }
}
