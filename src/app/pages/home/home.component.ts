import { Component, WritableSignal, signal } from '@angular/core';
import { RequestBarcodeApiService } from '../../core/services/request-barcode-api/request-barcode-api.service';
import { ProductOptionSearch, ProductParameterData } from '../../core/interfaces/product.interface';
import { Product } from '../../core/interfaces/barcode-products.interface';
import { ProductsComponent } from '../components/products/products.component';
import { OptionCode } from '../../core/enums/option-code.enum';
import { SearchFormFilterComponent } from './components/search-form-filter/search-form-filter.component';

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
    private barcodeService: RequestBarcodeApiService
  ) { }

  public searchOptions: ProductOptionSearch[] = [
    { code: OptionCode.BARCODE, name: 'BARCODE' },
    { code: OptionCode.MPN, name: 'MPN' },
    { code: OptionCode.ASIN, name: 'ASIN' },
    { code: OptionCode.TITLE, name: 'Nombre' },
    { code: OptionCode.CATEGORY, name: 'Categoría' },
    { code: OptionCode.MANUFACTURER, name: 'Fabricante' },
    { code: OptionCode.BRAND, name: 'Marca' },
    { code: OptionCode.GEO, name: 'País' },
  ]

  public filterOptions: ProductOptionSearch[] = [
    { code: OptionCode.MPN, name: 'MPN' },
    { code: OptionCode.CATEGORY, name: 'Categoría' },
    { code: OptionCode.MANUFACTURER, name: 'Fabricante' },
    { code: OptionCode.BRAND, name: 'Marca' },
    { code: OptionCode.GEO, name: 'País' },
  ]

  public loading: WritableSignal<boolean> = signal(false);
  public products: WritableSignal<Product[] | null> = signal(null)

  public searchProduct(product: ProductParameterData[]) {
    this.loading.set(true);

    console.log(product);

    // setTimeout(() => {
    //   this.loading.set(false);
    //   this.products.set(products)
    // }, 5000);
    this.barcodeService.getProducts(product).subscribe({
      next: ({ products }) => {
        this.barcodeService.setProductsData(products)
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.barcodeService.setProductsData(null)
        this.loading.set(false);
      }
    })
  }

  private productsDataObserver() {
    this.barcodeService.products$.subscribe({
      next: (products) => {
        this.products.set(products)
      }
    })
  }

  ngOnInit(): void {
    this.productsDataObserver();
  }
}
