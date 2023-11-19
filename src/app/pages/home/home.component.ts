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
    private toastr: ShowToastrService
  ) { }

  public loading: WritableSignal<boolean> = signal(false);
  public products: WritableSignal<Product[] | null> = signal(null)

  public searchOptions: ProductOptionSearch[] = searchOptions;
  public filterOptions: ProductOptionSearch[] = filterOptions;

  public searchProduct(product: ProductParameterData[]) {
    this.loading.set(true);

    this.barcodeService.getProducts(product).subscribe({
      next: ({ products }) => {
        this.productsService.setProductsData(products)
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.productsService.setProductsData(null)
        this.toastr.showError('Ha ocurrido un error, inténtelo de nuevo', 'Error');
        this.loading.set(false);
      }
    })
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
