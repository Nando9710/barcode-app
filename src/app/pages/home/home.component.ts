import { Component, ViewChild, WritableSignal, signal } from '@angular/core';
import { RequestBarcodeApiService } from '../../core/services/request-barcode-api/request-barcode-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { NgFor, UpperCasePipe } from '@angular/common';
import { ProductOptionSearch, ProductParameterData } from '../../core/interfaces/product.interface';
import { Product } from '../../core/interfaces/barcode-products.interface';
import { products } from '../../core/const/products';
import { ProductsComponent } from '../components/products/products.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    UpperCasePipe,
    ProductsComponent
  ],
  providers: [RequestBarcodeApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private barcodeService: RequestBarcodeApiService,
    private fb: FormBuilder,
  ) { }


  public searchOptions: ProductOptionSearch[] = [
    { code: 'barcode', name: 'BARCODE' },
    { code: 'mpn', name: 'MPN' },
    { code: 'asin', name: 'ASIN' },
    { code: 'title', name: 'Nombre' },
    { code: 'category', name: 'Categoría' },
    { code: 'manufacturer', name: 'Fabricante' },
    { code: 'brand', name: 'Marca' },
    { code: 'geo', name: 'País' },
  ]

  public filterOptions: ProductOptionSearch[] = [
    { code: 'mpn', name: 'MPN' },
    { code: 'category', name: 'Categoría' },
    { code: 'manufacturer', name: 'Fabricante' },
    { code: 'brand', name: 'Marca' },
    { code: 'geo', name: 'País' },
  ]

  public loading: WritableSignal<boolean> = signal(false);
  public products: WritableSignal<Product[] | null> = signal(null)
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  productForm: FormGroup = this.fb.group({
    code: ['title'],
    value: ['iphone'],
    filters: this.fb.array([])
  })


  public getProductFiltersArray(): FormArray {
    return this.productForm.controls['filters'] as FormArray
  }
  private subscribeToTitleChange() {
    this.productForm.controls['value'].valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {
        this.searchProduct()
      }
    })

    this.productForm.controls['filters'].valueChanges.pipe(debounceTime(500)).subscribe({
      next: () => {
        this.searchProduct()
      }
    })
  }

  public addFilterForm() {
    const productFilters = this.getProductFiltersArray();
    productFilters.push(
      this.fb.group({
        code: ['brand'],
        value: ['']
      })
    )
  }

  public deleteFilterForm(i: number) {
    const productFilters = this.getProductFiltersArray();
    productFilters.removeAt(i)
  }

  private searchProduct() {
    this.loading.set(true);
    const product: ProductParameterData[] = [
      {
        code: this.productForm.controls['code'].value,
        value: this.productForm.controls['value'].value,
      },
      ...this.productForm.controls['filters'].value
    ]

    setTimeout(() => {
      this.loading.set(false);
      this.products.set(products)
    }, 5000);
    // this.barcodeService.getProducts(product).subscribe(({ products }) => {
    //   console.log(products);
    //   this.loaging.set(true);
    // })
  }

  public closeMenu() {
    this.menuTrigger.closeMenu()
  }

  ngOnInit(): void {
    this.subscribeToTitleChange();
    this.addFilterForm();
  }
}
