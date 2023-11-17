import { Component, ViewChild, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/barcode-products.interface';
import { MinPricePipe } from '../../core/pipes/min-price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, { Lazy, Navigation, SwiperOptions } from 'swiper';
import { MatCardModule } from '@angular/material/card';


SwiperCore.use([Navigation, Lazy]);

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MinPricePipe,
    SwiperModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatCardModule,
    NgOptimizedImage
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  constructor(private activatedRoute: ActivatedRoute) { }

  public productData: WritableSignal<Product | null> = signal(null)
  public config: SwiperOptions = {
    slidesPerView: 1,
    speed: 2000,
    spaceBetween: 0,
    centeredSlides: true,
    navigation: true,
    autoplay: {
      delay: 10000
    },
    pagination: { clickable: true }
  };

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  private getProductData() {
    this.activatedRoute.queryParams.subscribe({
      next: ({ productData }) => {
        if (productData) {
          this.productData.set(JSON.parse(productData))
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
