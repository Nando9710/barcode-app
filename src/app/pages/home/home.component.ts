import { Component, WritableSignal, signal } from '@angular/core';
import { RequestBarcodeApiService } from '../../core/services/request-barcode-api/request-barcode-api.service';
import { ProductOptionSearch, ProductParameterData } from '../../core/interfaces/product.interface';
import { Product } from '../../core/interfaces/barcode-products.interface';
import { ProductsComponent } from './components/products/products.component';
import { SearchFormFilterComponent } from './components/search-form-filter/search-form-filter.component';
import { filterOptions, searchOptions } from './utils/consts/options.const';
import { ShowToastrService } from '../../core/services/show-toastr.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchFormFilterComponent,
    ProductsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private barcodeService: RequestBarcodeApiService,
    private productsService: ProductsService,
    private toastr: ShowToastrService,
  ) { }

  public loading: WritableSignal<boolean> = signal(false);
  public products: WritableSignal<Product[]> = signal([])

  public searchOptions: ProductOptionSearch[] = searchOptions;
  public filterOptions: ProductOptionSearch[] = filterOptions;

  public searchProduct(productQuery: ProductParameterData[], loadingMore = false) {
    if (!loadingMore) {
      this.loading.set(true);
      this.products.set([]);
      this.productsService.setPageToFirst()
    };

    this.barcodeService.getProducts(productQuery, this.productsService.page).subscribe({
      next: ({ products }) => {
        this.productsService.setProductsData([...this.products(), ...products]);
        this.loading.set(false);
      },
      error: (error) => {
        this.productsService.setProductsData([])
        this.toastr.showError('Ha ocurrido un error, inténtelo de nuevo', 'Error');
        this.loading.set(false);
      }
    })
  }

  public chargeMoreProducts() {
    const productQuery: ProductParameterData[] = this.barcodeService.productQueryCached;
    this.productsService.incProductsPage();

    if (this.productsService.page > 1) this.searchProduct(productQuery, true);
  }


  private productsDataObserver() {
    this.productsService.products$.subscribe({
      next: (products) => {
        this.products.set(products)
      }
    })
  }



  ngOnInit(): void {
    this.productsDataObserver();
  }
}
