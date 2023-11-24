import { Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
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
  constructor(
    private router: Router
  ) { }

  public productsData: WritableSignal<Product[] | null> = signal(null)
  public loadingProducts: WritableSignal<boolean> = signal(false)

  numero = 1

  productosDePruebaInfiniteScroll = new Array(100).fill(0).map((value) => {
    this.numero += 1
    return value + this.numero
  })

  @Input() set products(productsData: Product[] | null) {
    if (productsData) this.productsData.set(productsData)
  };

  @Input() set loading(value: boolean) {
    this.loadingProducts.set(value);
  };

  @Output() chargeMoreProduct: EventEmitter<null> = new EventEmitter()

  public goToProductDetails(product: Product) {
    const productData = JSON.stringify(product);
    this.router.navigate(['/product-details'], {
      queryParams: { productData }
    })
  }

  private observeSroll() {
    // observe the bottom to load data and make an infinite scroll
    const intersectionObserver: IntersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      this.chargeMoreProduct.emit(null)
    });

    // start observing
    intersectionObserver.observe(document.querySelector(".more") as Element);
  }


  ngOnInit(): void {
    this.observeSroll()
  }
}
